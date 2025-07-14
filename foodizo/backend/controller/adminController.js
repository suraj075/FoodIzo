import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import randomstring from "randomstring";
import jwt from "jsonwebtoken";
import validator from "validator";
import { format } from "path";

//Store generated otp to corresponding email
const otpCache = {};

const generateOTP = () =>{
    return randomstring.generate({length:6,charset:"numeric"});
};

// send otp via mail
const sendOTPToEmail = async (email,otp) =>{
    const mailOptions ={
        form: process.env.MY_GMAIL,
        to: email,
        subject:'OTP verification',
        text:`Your OTP for verification is ${otp}`

    }

    let transpoter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.MY_GMAIL,
            pass: process.env.MY_PASSWORD
        },
        tls:{
            rejectUnauthorized:false
        }
    })

    transpoter.sendMail(mailOptions, (err,info) =>{
        if(err){
            console.log('Error occured', err);
        }else{
            console.log( 'OTP sent to an email successfully'  ,info);
        }
});

}





//generating token

const createToken = (id ) =>{
    return jwt.sign({id},process.env.JWT_ADMIN_SECRET)
 }

const adminLogin = async (req,res) =>{
    const {email,password} = req.body;
    try {
        const admin = await adminModel.findOne({email});
        if(!admin){
            return res.json({success:false,message:"Invalid credentials"});
        }

        if(!admin.isVerified){
            await adminModel.findByIdAndDelete(admin._id)
            return res.json({success:false,message:"Invalid email"});
        }

        if(await bcrypt.compare(password,admin.password)){
            const token = createToken(admin._id);
            res.json({success:true,token:token})
        }else{
            res.json({success:false,message:"Invalid password"})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
};

const adminRegister = async (req,res) =>{
    const {name,email,password} = req.body;
    try {

        const exists = await adminModel.findOne({email});

        if(exists){
            return res.json({success:false,message:"Admin already exists"});
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid email"});
        }
        
        if(password.length < 8){
            return res.json({success:false,message:"Password is not strong"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);

        const newAdmin = new adminModel({
            name:name,
            email:email,
            password:hashedpassword
        })
        
        const admin = await newAdmin.save();

        const token = createToken(admin._id);
        res.json({success:true,token:token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
};


const sendOTP = async(req,res)=>{
    const {email} = req.body;
    const otp = generateOTP();
    otpCache[email] = otp; //store otp in cache

    //Send OTP via eamil
    sendOTPToEmail(email,otp);
    res.status(200).json({success:true,message:"OTP sent successfully"})

}


const verifyOTP = async (req,res) =>{
    const {email,otp} = req.body;

    //check if email exists in the cache
    if(!otpCache.hasOwnProperty(email)){
        return res.status(400).json({success:false,message:"Email not found"});
    }

    //check if otp matches the one stored in cache
    if(otpCache[email]===otp.trim()){
        await adminModel.findOneAndUpdate({email:email},{$set:{isVerified:true}});
        //Remoce otp from cache aftersuccessful verification
        delete otpCache[email];
        return res.status(200).json({success:true,message:"OTP verified successfully"});
    }else{
        await adminModel.findOneAndDelete({email:null});
        return res.status(400).json({success:false,message:"Invalid OTP"});
    }
};


export {adminLogin,adminRegister,sendOTP,verifyOTP};