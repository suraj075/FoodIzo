import userModel from "../models/userModels.js"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"

const requestPasswordReset = async(req,res)=>{
    const { email } = req.body;

    try {
      const user = await userModel.findOne({ email });
      if (!user) return res.json({ success: false, message: 'User not found' });
  
      const secret = process.env.JWT_SECRET ;
      
      const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '1h' });
  
       const resetURL = `https://${process.env.RESET_URL}/resetpassword/${token}`;
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MY_GMAIL,
          pass: process.env.MY_PASSWORD,
        },
      });
  
      const receiver = {
        to: user.email,
        from: process.env.MY_GMAIL,
        subject: 'Password Reset Request',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetURL}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };
  
      await transporter.sendMail(receiver);
  
      res.status(200).json({ success: true, message: 'Password reset link sent to your email' });
    } catch (error) {
        console.log(error);
      res.status(500).json({ success: false, message: 'Something went wrong' });
    }
}

const resetPassword = async (req,res)=>{
    const {token,password} = req.body;
  
    try {
        if(!password){
            return res.status(400).json({success:false,message:"password is required"});
        }
        const decode =  jwt.verify(token,process.env.JWT_SECRET);
        
        const new_hash_password = await bcrypt.hash(password,10);
        await userModel.updateOne({email:decode.email},
            {$set:{password:new_hash_password}}
        )
        res.status(200).json({success:true,message:"password reset successfully"});

    } catch (error) {
        console.log(error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }
        
        res.status(500).json({ message: "Something went wrong" });
        
    }
}

export{requestPasswordReset,resetPassword}