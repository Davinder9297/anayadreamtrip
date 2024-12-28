import Accommodation from "../models/Accommodation.js";
import Menu from "../models/Menu.js";
import Menuitem from "../models/Menuitem.js";
import Order from "../models/Order.js";
import { uploadImage } from "../utils/cloudinary.js";

export const addMenu = async (req, res) => {
    try {
        const { accommodationId, categories, orderTimings } = req.body;

        // Validate order timings
        if (!orderTimings?.startTime || !orderTimings?.endTime) {
            return res.status(400).json({ message: 'Order timings (startTime and endTime) are required.' });
        }

        // Validate categories
        if (!Array.isArray(categories) || categories.length === 0) {
            return res.status(400).json({ message: 'At least one category is required.' });
        }
        categories.forEach(category => {
            if (!category.categoryName) {
                throw new Error('Each category must have a "categoryName".');
            }
        });

        // Check if the user is authorized to manage this accommodation
        const accommodation = await Accommodation.findById(accommodationId);
        if (!accommodation) {
            return res.status(404).json({ message: 'Accommodation not found.' });
        }
        if (accommodation.manager.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to add a menu for this accommodation.' });
        }

        // Check if a menu already exists for the accommodation
        const existingMenu = await Menu.findOne({ accommodation: accommodationId });
        if (existingMenu) {
            return res.status(400).json({ message: 'A menu already exists for this accommodation.' });
        }

        // Create and save the menu
        const menu = new Menu({
            accommodation: accommodationId,
            categories,
            orderTimings,
        });

        await menu.save();

        res.status(201).json({ message: 'Menu created successfully.', menu });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Add Menu Item
export const addMenuItem = async (req, res) => {
    try {
        const { menuId, categoryId } = req.params;
        const { name, description, price, isAvailable } = req.body;

        // Validate images
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: 'Menu images are required.' });
        }

        // Upload images to Cloudinary
        const imageUploadPromises = req.files.image.map((file) => uploadImage(file));
        const uploadedImages = await Promise.all(imageUploadPromises);

        // Create a new menu item
        const menuItem = new Menuitem({
            name,
            description,
            price,
            images: uploadedImages,
            isAvailable,
        });

        await menuItem.save();

        // Associate the menu item with the category
        const menu = await Menu.findById(menuId);
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found.' });
        }

        const category = menu.categories.id(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        category.items.push(menuItem._id);
        await menu.save();

        res.status(201).json({ message: 'Menu item added successfully.', menuItem });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


// Update Menu Item
export const updateMenuItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { name, description, price, isAvailable } = req.body;

        const menuItem = await Menuitem.findById(itemId);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found.' });
        }

        // Update fields
        if (name) menuItem.name = name;
        if (description) menuItem.description = description;
        if (price) menuItem.price = price;
        if (typeof isAvailable !== 'undefined') menuItem.isAvailable = isAvailable;

        // Update images if provided
        if (req.files && req.files.image) {
            const imageUploadPromises = req.files.image.map((file) => uploadImage(file));
            const uploadedImages = await Promise.all(imageUploadPromises);
            menuItem.images = [...menuItem.images, ...uploadedImages];
        }

        await menuItem.save();

        res.status(200).json({ message: 'Menu item updated successfully.', menuItem });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};
  

// Delete Menu Item
export const deleteMenuItem = async (req, res) => {
    try {
        const { menuId, categoryId, itemId } = req.params;

        // Find and delete the menu item
        const menuItem = await Menuitem.findByIdAndDelete(itemId);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found.' });
        }

        // Remove the reference from the menu category
        const menu = await Menu.findById(menuId);
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found.' });
        }

        const category = menu.categories.id(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        category.items = category.items.filter((id) => id.toString() !== itemId);
        await menu.save();

        res.status(200).json({ message: 'Menu item deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


export const fetchMenuItems = async (req, res) => {
    try {
        const { accommodationId } = req.params;

        const menu = await Menu.findOne({ accommodation: accommodationId })
            .populate({
                path: 'categories.items',
                model: 'MenuItem',
            });

        if (!menu) {
            return res.status(404).json({ message: 'Menu not found for this accommodation.' });
        }

        res.status(200).json(menu.categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

export const placeOrder = async (req, res) => {
    try {
        const { accommodationId, roomId } = req.params;
        const { items } = req.body; // Items array with `menuItemId` and `quantity`

        if (!items || !items.length) {
            return res.status(400).json({ message: 'No items in the order.' });
        }

        // Verify the accommodation exists
        const accommodation = await Accommodation.findById(accommodationId);
        if (!accommodation) {
            return res.status(404).json({ message: 'Accommodation not found.' });
        }

        let totalPrice = 0;
        const orderItems = []; // To store validated order items

        for (const item of items) {
            const { menuItemId, quantity } = item;

            // Validate quantity
            if (!quantity || quantity <= 0) {
                return res.status(400).json({ message: `Invalid quantity for item ${menuItemId}.` });
            }

            // Fetch the menu item from the MenuItem collection
            const menuItem = await Menuitem.findById(menuItemId);
            
            if (!menuItem) {
                return res.status(404).json({ message: `Menu item with ID ${menuItemId} not found.` });
            }

            totalPrice += menuItem.price * quantity;

            // Prepare order item details
            orderItems.push({
                menuItem: menuItemId,
                quantity,
            });
        }

        // Create and save the order
        const order = new Order({
            user: req.user.id,
            accommodation: accommodationId,
            room: roomId,
            items: orderItems,
            totalPrice,
        });

        await order.save();

        res.status(201).json({ message: 'Order placed successfully.', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const validStatuses = ['Pending', 'Preparing', 'Delivered', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value.' });
        }

        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found.' });

        if (status === 'Cancelled' && !req.body.cancelledBy) {
            return res.status(400).json({ message: 'CancelledBy field is required for cancellation.' });
        }

        order.status = status;

        if (status === 'Cancelled') {
            order.cancelledBy = req.body.cancelledBy; // Manager or Customer
        }

        await order.save();

        res.status(200).json({ message: 'Order status updated successfully.', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


export const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { cancelledBy } = req.body; // Either 'Customer' or 'Manager'

        if (!['Customer', 'Manager'].includes(cancelledBy)) {
            return res.status(400).json({ message: 'Invalid cancelledBy value.' });
        }

        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found.' });

        if (order.status === 'Cancelled') {
            return res.status(400).json({ message: 'Order is already cancelled.' });
        }

        order.status = 'Cancelled';
        order.cancelledBy = cancelledBy;

        await order.save();

        res.status(200).json({ message: 'Order cancelled successfully.', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};
export const fetchOrders = async (req, res) => {
    try {
        const { accommodationId } = req.params;

        // Verify that the user is the manager of the specified accommodation
        const accommodation = await Accommodation.findById(accommodationId);
        if (!accommodation) {
            return res.status(404).json({ message: 'Accommodation not found.' });
        }

        if (accommodation.manager.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized to view orders for this accommodation.' });
        }

        // Fetch orders for the specified accommodation
        const orders = await Order.find({ accommodation: accommodationId })
            .populate('user', 'name email')
            .populate('room', 'roomNumber type')
            .populate('items.menuItem', 'name price');

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};
