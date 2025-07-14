import dotenv from 'dotenv';
dotenv.config();
import adminModel from "../models/adminModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModels.js";
import Stripe from "stripe"
import jwt from "jsonwebtoken"

const stripe =new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order for frontend

const placeOrder = async (req,res) =>{

    const frontend_url = "https://foodizo-frontend.onrender.com"

    try{
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

       

        const line_items = req.body.items.map((item)=>({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100
            },
            quantity:1

        })

       

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            allow_promotion_codes: true,
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })


        res.json({success:true,url:session.url})

    }catch(error){
        
        res.json({success:false,message:"Error"})
    }
}


const verifyOrder = async (req,res)=>{
    const {orderId,success} = req.body;
    try{
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Payment Failed"})
        }
    }catch(error){
        
        res.json({success:false,message:"Error"})
    }
}

// user Order for frontend

const userOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        
        res.json({success:false,message:"Error"})
    }
}

// fetch all user order

const allOrders = async(req,res) =>{
    const {token} = req.body;
    if(!token){
        return res.json({success:false,message:"Please Login First"})
      }

    try {
        const decode =  jwt.verify(token,process.env.JWT_ADMIN_SECRET)
        const user = await adminModel.findById(decode.id);

        if(!user){
            return res.json({success:false,message:"Admin not found"});
        }
        const orders = await orderModel.find({});
        res.json({success:true,data:orders});
    } catch (error) {
        res.json({success:false,message:"Error"});
    }

}

// order status update

const statusUpdate = async(req,res)=>{
    try {
         await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
         res.json({success:true,message:"Status Updated"});
    } catch (error) {
        
        res.json({success:false,message:"Error"});
        
    }
}



export{placeOrder,verifyOrder,userOrders,allOrders,statusUpdate}