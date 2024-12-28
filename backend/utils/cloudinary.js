import cloudinary from 'cloudinary';

// Configure Cloudinary with your credentials (make sure to add these to .env)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload image to Cloudinary

export const uploadImage = async (file) => {
  // console.log(file);
  
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) reject(error);
        // console.log(result);
        
        resolve(result.secure_url);
      }
    );

    // Use the buffer data from the uploaded file
    if (!file || !file.buffer) {
      return reject(new Error('File buffer is missing'));
    }

    stream.end(file.buffer); // Push the buffer into the Cloudinary stream
  });
};

export const uploadRoomImage = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream({ 
      resource_type: 'auto', 
      folder: 'room-images',
    }, (error, result) => {
      if (error) return reject(error);
      resolve(result.secure_url); // Return the URL of the uploaded image
    }).end(file.buffer); // Upload the image from the buffer
  });
};