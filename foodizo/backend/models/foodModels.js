import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    // If you want to add image handling, uncomment this line
    image: { type: String, required: true }
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema, "foods");

export default foodModel;
