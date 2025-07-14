import express from "express";
import { addFood, listFood, removeFood, allFoodItem } from "../controller/foodController.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const foodRouter = express.Router();

// Cloudinary Configuration
cloudinary.config({
  cloud_name:"dxy1fsagl",
  api_key:"125761546174819",
  api_secret:"vlSk90Zp2bmIA5KxFSzI-oczHJQ"
});

// Cloudinary Storage Engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "foodUploads", // Optional: name of the folder in your Cloudinary account
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
  }
});

const upload = multer({ storage: storage });

// Frontend sends form data with an image file using FormData.
// Multer (with CloudinaryStorage) intercepts and uploads the image to Cloudinary.
// Multer puts the image info on req.file (especially the Cloudinary URL: req.file.path).
// The addFood controller saves the form data + image URL to the MongoDB foodModel.

// Routes
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.post("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.get("/all", allFoodItem);

export default foodRouter;
