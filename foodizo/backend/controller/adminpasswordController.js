import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer";
import randomstring from "randomstring";

const otpCache={};

const generateOTP = () =>{
    return randomstring.generate({length:6,charset:"numeric"})
}

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



const emailOtp = async(req,res)=>{
    const {email} = req.body;
    const admin = await adminModel.findOne({email});
    if(!admin){
        return res.json({success:false,message:"Please Register first"})
    }
    const otp = generateOTP();
    otpCache[email] = otp;
    sendOTPToEmail(email,otp);
    res.status(200).json({success:true,message:"OTP sent successfully"})

}

const verifyEmail = async(req,res)=>{
    const {email,otp} = req.body;

    //check if email exists in the cache
    if(!otpCache.hasOwnProperty(email)){
        return res.status(400).json({success:false,message:"Email not found"});
    }

    //check if otp matches the one stored in cache
    if(otpCache[email]===otp.trim()){
        //Remoce otp from cache aftersuccessful verification
        delete otpCache[email];
        return res.status(200).json({success:true,message:"OTP verified successfully"});
    }else{
        return res.status(400).json({success:false,message:"Invalid OTP"});
    }

}

const setpassword = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const new_hash_password = await bcrypt.hash(password,10);
        await adminModel.updateOne({email:email},{$set:{password:new_hash_password}});
        res.status(200).json({success:true,message:"Password Reset successfully"});
    } catch (error) {
        console.log(error);
    }

}

export {emailOtp,verifyEmail,setpassword}