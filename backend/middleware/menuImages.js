import multer from 'multer';

// Set storage options for multer
const storage = multer.memoryStorage();

// Create upload middleware for handling multiple files (main image, additional photos, PAN image, and Aadhar image)
const Menuimages = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit the size to 10MB (adjust as needed)
}).fields([
  { name: 'image', maxCount: 10 },  // Main image (only one)
  
]);

export default Menuimages;
