import userModel from "../models/userModels.js";

// import userModel from "../models/userModels.js";


//add item to cart
const addToCart = async (req, res) => {
    try{
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }else{
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Item added to cart"})
    }catch(error){
        
        res.json({success:false,message:"Error"});
    }
};

//remove item from cart

const removeFromCart = async (req, res) => {
    try{
        const userData = await userModel.findById(req.body.userId);
        const cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            return res.json({success:false,message:"Item not found"});
        }else{
             cartData[req.body.itemId] -=1;

             if(cartData[req.body.itemId]===0){
                delete cartData[req.body.itemId];
             }
             await userModel.findByIdAndUpdate(req.body.userId,{$set :{cartData: cartData}});
             res.json({success:true,message:"Item remove from cart"});
        }
        
    }catch(error){
       
        res.json({success:false,message:"Error"});
    }
};

//fetch user cart  data
const getCart = async (req, res) => {
    try{
        const userData = await userModel.findById(req.body.userId);
        const cartData = userData.cartData;
        res.json({succcess:true,cartData});
    }catch(error){
        
        res.json({success:false,message:"Error"});
    }

};

export{addToCart,removeFromCart,getCart};

