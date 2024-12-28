import Accommodation from '../models/Accommodation.js';
import { uploadImage } from '../utils/cloudinary.js';

export const addAccommodation = async (req, res) => {
  const { type, name, location, description, amenities, manager } = req.body;

  try {
    const files = req.files; // Access all uploaded files
    let imageUrl = null; // For the main image
    let photoUrls = []; // For additional photos

    // Handle the main image (if provided)
    if (files.image && files.image[0]) {
      imageUrl = await uploadImage(files.image[0]); // Upload the main image
    }

    // Handle additional photos (if provided)
    if (files.photos) {
      photoUrls = await Promise.all(
        files.photos.map((file) => uploadImage(file)) // Upload all additional photos
      );
    }

    // Create a new accommodation document
    const accommodation = new Accommodation({
      type,
      name,
      location,
      description,
      amenities,
      image: imageUrl, // Main image URL
      photos: photoUrls, // Array of additional photo URLs
      manager,
    });

    // Save to database
    await accommodation.save();
    res.status(201).json({ message: 'Accommodation added successfully', accommodation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllAccommodations = async (req, res) => {
    const { type } = req.query; // Optional filter: type = 'Hotel' or 'Resort'
  
    try {
      const accommodations = await Accommodation.find(type ? { type } : {}).populate('rooms');
      res.status(200).json(accommodations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  export const getAccommodationDetails = async (req, res) => {
    const { id } = req.params;
  
    try {
      const accommodation = await Accommodation.findById(id).populate('rooms');
      if (!accommodation) {
        return res.status(404).json({ error: 'Accommodation not found' });
      }
      res.status(200).json(accommodation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  export const updateAccommodation = async (req, res) => {
    const { id } = req.params; // ID of the accommodation to update
    const updates = req.body; // Other fields to update
  
    try {
      // Find the accommodation by ID
      const accommodation = await Accommodation.findById(id);
      if (!accommodation) {
        return res.status(404).json({ error: 'Accommodation not found' });
      }
  
      const files = req.files; // Access all uploaded files
  
      // Handle the main image (if provided)
      if (files.image && files.image[0]) {
        const imageUrl = await uploadImage(files.image[0]); // Upload the new main image
        updates.image = imageUrl; // Update the main image field
      }
  
      // Handle additional photos (if provided)
      if (files.photos) {
        const photoUrls = await Promise.all(
          files.photos.map((file) => uploadImage(file)) // Upload all additional photos
        );
        updates.photos = photoUrls; // Replace the `photos` field with new photo URLs
      }
  
      // Update the accommodation with new data
      const updatedAccommodation = await Accommodation.findByIdAndUpdate(id, updates, { new: true });
  
      res.status(200).json({
        message: 'Accommodation updated successfully',
        accommodation: updatedAccommodation,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  export const deleteAccommodation = async (req, res) => {
    const { id } = req.params;
  
    try {
      const accommodation = await Accommodation.findByIdAndDelete(id);
      if (!accommodation) {
        return res.status(404).json({ error: 'Accommodation not found' });
      }
      res.status(200).json({ message: 'Accommodation deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
        
  export const getUserAccommodations = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find accommodations where the manager matches the given userId
      const accommodations = await Accommodation.find({ manager: userId })
        .populate('rooms', 'roomNumber type price') // Optionally populate room details
        .lean(); // Convert Mongoose documents to plain JavaScript objects for easier processing
  
      if (!accommodations || accommodations.length === 0) {
        return res.status(404).json({ message: 'No accommodations found for this user.' });
      }
  
      res.status(200).json(accommodations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
