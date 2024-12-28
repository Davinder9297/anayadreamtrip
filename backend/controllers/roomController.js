import Room from '../models/Room.js';
import Accommodation from '../models/Accommodation.js'; // Unified for hotels and resorts
import { uploadRoomImage } from '../utils/cloudinary.js'; // Separate utility for image uploads

// Create a new room
export const createRoom = async (req, res) => {
  try {
    const { accommodationId, roomNumber, type, price, capacity, description, features } = req.body;
    const mainImageFile = req.files?.mainImage ? req.files.mainImage[0] : null;
    const photosFiles = req.files?.photos || []; // An array of additional photo files

    // Check if accommodation exists
    const accommodation = await Accommodation.findById(accommodationId);
    if (!accommodation) return res.status(404).json({ message: 'Accommodation not found' });

    // Upload the main image
    const mainImageUrl = mainImageFile ? await uploadRoomImage(mainImageFile) : null;

    // Upload additional photos
    const photoUrls = [];
    for (let photoFile of photosFiles) {
      const photoUrl = await uploadRoomImage(photoFile);
      photoUrls.push(photoUrl);
    }

    // Create room
    const newRoom = new Room({
      accommodationId: accommodationId,
      roomNumber,
      type, // directly using 'type' as per your schema
      price,
      capacity,
      description,
      features, // Features as array of strings
      mainImage: mainImageUrl,
      photos: photoUrls,
    });

    await newRoom.save();
    res.status(201).json({ message: 'Room created successfully', room: newRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get rooms by accommodation
export const getAllRoomsByAccommodation = async (req, res) => {
  try {
    const { accommodationId } = req.params;

    // Find rooms by accommodationId
    const rooms = await Room.find({ accommodationId });

    if (!rooms || rooms.length === 0) {
      return res.status(404).json({ message: 'No rooms found for this accommodation' });
    }

    res.status(200).json({ message: 'Rooms retrieved successfully', rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get room details by ID
export const getRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;

    // Fetch room
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update room
export const updateRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { roomNumber, type, price, capacity, description, features } = req.body;
    const mainImageFile = req.files?.mainImage ? req.files.mainImage[0] : null;
    const photosFiles = req.files?.photos || []; // An array of additional photo files

    // Fetch room
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    // Upload the new main image if provided
    const newMainImageUrl = mainImageFile ? await uploadRoomImage(mainImageFile) : null;

    // Upload new additional photos
    const newPhotoUrls = [];
    for (let photoFile of photosFiles) {
      const photoUrl = await uploadRoomImage(photoFile);
      newPhotoUrls.push(photoUrl);
    }

    // Update room fields
    if (roomNumber) room.roomNumber = roomNumber;
    if (type) room.type = type;
    if (price) room.price = price;
    if (capacity) room.capacity = capacity;
    if (description) room.description = description;
    if (features) room.features = features; // Update features

    // Only update images if new ones are provided
    if (newMainImageUrl) room.mainImage = newMainImageUrl; // Replace main image
    if (newPhotoUrls.length > 0) room.photos = [...room.photos, ...newPhotoUrls]; // Append new photos

    await room.save();
    res.status(200).json({ message: 'Room updated successfully', room });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
// Delete room
export const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    // Find and delete the room by roomId
    const deletedRoom = await Room.findByIdAndDelete(roomId);

    if (!deletedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
