import express from "express";
import { adminLogin,adminRegister,sendOTP,verifyOTP } from "../controller/adminController.js";

const adminRouter = express.Router();

adminRouter.post('/register',adminRegister);
adminRouter.post('/login',adminLogin);
adminRouter.post('/sendotp',sendOTP);
adminRouter.post('/verifyotp',verifyOTP);


export default adminRouter;