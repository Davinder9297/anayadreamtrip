import mongoose from "mongoose";

const MenuCategorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true }, // E.g., Snacks, Dinner, Lunch, Special
    items: [{type: mongoose.Schema.Types.ObjectId, 
      ref: 'MenuItem'} ], // Array of menu items under this category
  });
  
  const MenuSchema = new mongoose.Schema({
    accommodation: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Accommodation', 
      required: true 
    },
    categories: [MenuCategorySchema], // Array of categories
    orderTimings: {
      startTime: { type: String, required: true }, // E.g., '10:00 AM'
      endTime: { type: String, required: true }, // E.g., '10:00 PM'
    },
  });

export default mongoose.model('Menu', MenuSchema);
