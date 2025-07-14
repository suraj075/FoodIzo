import React, {useContext, useState,useEffect} from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Cart = () => {

  const {url} =useContext(StoreContext);

  //promocode
  const promo = "ALOKFOOD";

  
  const [discount, setDiscount] = useState("");
  const{cartItems,food_list,removeFromCart,getTotalCartAmount,applypromo,setApplyPromo,discountAmt,setDiscountAmt,totalamt} = useContext(StoreContext);
  // const [discountedTotal, setDiscountedTotal] = useState(getTotalCartAmount());
  // const [applypromo,setApplyPromo] = useState(false);
  // const [discountAmt,setDiscountAmt] = useState(0);

  

  useEffect(() => {
    // Step 1: Recalculate the cart total

    if(getTotalCartAmount()===0){
      setApplyPromo(false);
    }

      const newdiscountAmt = Math.ceil(getTotalCartAmount() * 0.1); //10% discount

      setDiscountAmt(newdiscountAmt);
  
    // Step 2: Update the totalCartAmt state with the new total
    
   
  }, [cartItems, applypromo]);
  
  

  const PromoHandler = () =>{
    if(discount === promo){
      setApplyPromo(true);
      toast.success("Coupon code applied successfully!")
    }else{
      toast.error("Invalid Coupon code")
    }
  }

  const RemovePromoHandler = () =>{
    setDiscountAmt(0);
    setApplyPromo(false);
    setDiscount("");
    toast.success("Coupon removed successfully!")
    
  }

  const navigate = useNavigate();


  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0){
            return(
              <div>
                <div className='cart-items-title cart-items-item'>
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>₹{item.price} </p>
                <p>{cartItems[item._id]} </p> 
                <p>₹{item.price*cartItems[item._id]} </p>
                <p onClick={()=>{removeFromCart(item._id);
                  toast.success(`Successfully ${item.name} of ₹${item.price} remove from your cart`)
                }} className='cross'>x</p>
              </div>
              <hr />
              </div>
            )
          }

        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{totalamt}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0?0:2}</p>
            </div>
            {/* discount */}
            
            {applypromo ? <div className="cart-total-details">
              <p>Discount</p>
              <p>-₹{discountAmt}</p>
            </div> : <></>}

            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount()=== 0?0:getTotalCartAmount()+2}</b>
              {/* <b>{getTotalCartAmount()+2}</b> */}
            </div>
            <button onClick={() => navigate("/order") }>PROCEED TO CHECKOUT</button>
          </div>          
        </div>
        <div className="cart-promocode">
          <div>
          <p>Use coupon <strong>"ALOKFOOD"</strong> to get an extra 10% discount! 
          <span class="coupon-reminder">(Don't forget to re-enter this coupon during payment)</span></p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder ='Coupon code' onChange={(e)=>{setDiscount(e.target.value)}} vlaue={discount}/>
              {applypromo?<button onClick={RemovePromoHandler}>Remove coupon</button>: <button onClick={PromoHandler} >Apply coupon</button>}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Cart



