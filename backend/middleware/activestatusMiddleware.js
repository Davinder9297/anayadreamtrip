import Accommodation from "../models/Accommodation.js";

const checkActiveAccommodation = async (req, res, next) => {
    try {
      const { accommodationId } = req.body; // Assumes `accommodationId` is part of the route parameters
      
      // Fetch the accommodation
      const accommodation = await Accommodation.findById(accommodationId);
      
      if (!accommodation) {
        return res.status(404).json({ message: 'Accommodation not found' });
      }
  
      if (!accommodation.isActive) {
        return res.status(403).json({ message: 'This accommodation is not currently active' });
      }
  
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };
  export default checkActiveAccommodation