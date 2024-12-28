import express from 'express';
import { 
    addMenu, 
    addMenuItem, 
    updateMenuItem, 
    deleteMenuItem, 
    fetchMenuItems, 
    placeOrder, 
    updateOrderStatus, 
    cancelOrder, 
    fetchOrders 
} from '../controllers/foodOrderController.js'; // Adjust the path as necessary
import { authenticate } from '../middleware/authMiddleware.js';
import Menuimages from '../middleware/menuImages.js';

const router = express.Router();

/** MENU ROUTES **/

// Add a new menu for an accommodation (only managers of the accommodation)
router.post('/menu', authenticate,  addMenu);

// Add a new menu item to a specific category in a menu (only managers of the accommodation)
router.post('/menu/:menuId/category/:categoryId/item', authenticate, Menuimages, addMenuItem);

// Update a specific menu item in a category (only managers of the accommodation)
router.put('/menu/:menuId/category/:categoryId/item/:itemId', authenticate, Menuimages, updateMenuItem);

// Delete a specific menu item from a category (only managers of the accommodation)
router.delete('/menu/:menuId/category/:categoryId/item/:itemId', authenticate,  deleteMenuItem);

// Fetch all menu items for a specific accommodation (accessible to authenticated users)
router.get('/menu/accommodation/:accommodationId', fetchMenuItems);

/** ORDER ROUTES **/

// Place an order for an accommodation and room (accessible to authenticated users)
router.post('/order/accommodation/:accommodationId/room/:roomId', authenticate, placeOrder);

// Update the status of an order (only managers can update status like Preparing/Delivered)
router.put('/order/:orderId/status', authenticate,  updateOrderStatus);

// Cancel an order (can be canceled by either customer or manager)
router.put('/order/:orderId/cancel', cancelOrder);

// Fetch all orders for a specific accommodation (only managers of the accommodation)
router.get('/order/accommodation/:accommodationId', authenticate,  fetchOrders);

export default router;
