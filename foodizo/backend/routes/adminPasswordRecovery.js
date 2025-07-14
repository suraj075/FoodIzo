import express from "express";
import { emailOtp,verifyEmail,setpassword } from "../controller/adminpasswordController.js";


const resetPasswordRouter = express.Router();

resetPasswordRouter.post('/emailotp',emailOtp);
resetPasswordRouter.post('/verifyemail',verifyEmail);
resetPasswordRouter.post('/setpassword',setpassword);

export default resetPasswordRouter;

