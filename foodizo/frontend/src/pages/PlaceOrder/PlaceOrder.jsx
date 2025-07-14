import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const PlaceOrder = ({ setShowLogin}) => {
  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({...data, [name]: value}));
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    
    try {
      let orderItems = [];
      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      });

      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount()
      }

      let response = await axios.post(`${url}/api/order/place`, orderData, {headers: {token: token}});
      
      if (response.data.success) {
        const {url} = response.data;
        console.log(url);
        window.location.replace(url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      
      alert("Failed to place order. Please try again.");
    }
  }

  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/cart');
      setShowLogin(true);
    }
    else if(getTotalCartAmount() === 0){
      navigate('/cart');
    }

  })

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' type="text" onChange={onChangeHandler} value={data.firstName} placeholder='First name' />
          <input required name='lastName' type="text" onChange={onChangeHandler} value={data.lastName} placeholder='Last name' />
        </div>
        <input required name='email' type="email" onChange={onChangeHandler} value={data.email} placeholder='Email address'/>
        <input required name='street' type="text" onChange={onChangeHandler} value={data.street} placeholder='Street'/>
        <div className="multi-fields">
          <input required name='city' type="text" onChange={onChangeHandler} value={data.city} placeholder='City' />
          <input required name='state' type="text" onChange={onChangeHandler} value={data.state} placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' type="text" onChange={onChangeHandler} value={data.zipcode} placeholder='Zip Code' />
          <input required name='country' type="text" onChange={onChangeHandler} value={data.country} placeholder='Country' />
        </div>
        <input required name='phone' type="text" onChange={onChangeHandler} value={data.phone} placeholder='Phone' />
      </div>
      <div className='place-order-right'>
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
            <button type='submit'>PROCEED TO PAYMENT</button>
          </div>          
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder