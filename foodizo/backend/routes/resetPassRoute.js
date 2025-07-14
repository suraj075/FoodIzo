import express from "express";
import { requestPasswordReset,resetPassword } from "../controller/passwordControlller.js";

const resetRouter = express.Router();

resetRouter.post('/requestPasswordReset',requestPasswordReset)
resetRouter.post('/resetPassword',resetPassword)


export default resetRouter;

