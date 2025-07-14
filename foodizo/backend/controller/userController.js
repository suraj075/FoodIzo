import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken"; //using that we can create authenticaton
import bcrypt from "bcrypt"
import validator from "validator";

//Login user

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.json({success:false,message:"Invalid credentials"});
    }
    //await bcrypt.compare(password,user.password) => in this we comparing user password with hashed password
    if(await bcrypt.compare(password,user.password)){
        const token =createToken(user._id);
        res.json({success:true,token})
    }else{
        res.json({success:false,message:"Invalid password"})
    }

};

//Generating token
 const createToken = (id ) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
 }

//Register User

const registerUser = async (req,res) =>{
    const{name,email,password} = req.body;
    try{
        //checking is user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({ success:false,message:"User already exists"});
        }
        // validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({ success:false,message:"Please enter a valid email"});
        }

        if(password.length < 8){
            return res.json({ success:false,message:"Password must be at least 8 characters"});
        }

        //hasing userpassword => we can do it by bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //creating newuser
        const newuser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newuser.save();
        //creating token
        const token = createToken(user._id);
        res.json({ success:true,token});
    }catch(error){
        
        res.json({success:false,message:"Error"})
    }
};

export {loginUser,registerUser};

//Note:
//(!validator.isEmail(email) =>
//It checks whether an email address is valid using a validation library (likely validator.js)