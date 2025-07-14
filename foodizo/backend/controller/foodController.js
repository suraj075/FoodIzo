import foodModel from "../models/foodModels.js";
import fs from'fs'
import jwt from 'jsonwebtoken'
import adminModel from "../models/adminModel.js";

//add food item

const addFood = async (req, res) => {

  const { token } = req.headers;

  if(!token){
    return res.json({success:false,message:"Please Login First"})
  }

  try {
    // Verify token
    const decode = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
    const user = await adminModel.findById(decode.id);

    // Check if admin exists
    if (!user) {
      return res.status(401).json({ success: false, message: "Admin not found" });
    }

  

    const imageUrl = req.file.path; // Assuming Cloudinary/Multer gives full path

    // Create food document
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: imageUrl,
    });

    await food.save();

    return res.json({ success: true, message: "Food Added" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error while adding food" });
  }
};


const listFood = async (req, res) => {
  const { token } = req.body;

  if(!token){
    return res.json({success:false,message:"Please login First"})
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
    const user = await adminModel.findById(decoded.id);

    if (user) {
      const foods = await foodModel.find({});
      res.json({ success: true, data: foods });
    } else {
       return res.json({ success: false, message: "Admin not found" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Invalid token or error occurred" });
  }
};

const allFoodItem = async (req,res) =>{
  try{
    const foods = await foodModel.find({});
    res.json({success:true,data:foods})
  }catch(error){
    res.json({success:false,message:error})
  }
}


 

//remove food item

const removeFood = async (req,res) =>{
    try{
        const food = await foodModel.findById(req.body.id)// using this we can find data from database using id
        fs.unlink(`uploads/${food.image}`,()=>{}) // to delete this image u have mention path name in this function

        await foodModel.findByIdAndDelete(req.body.id); // from this we can delete data from database
        res.json({success:true,message:"Food Removed"})
    }catch(error){
       
        res.json({success:false,message:"Error"})
    }
}

export {addFood,listFood,removeFood,allFoodItem}