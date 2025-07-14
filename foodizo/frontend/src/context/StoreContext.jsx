import { createContext, useEffect, useState } from "react";
//creating a context
export const StoreContext = createContext(null)
import axios from 'axios'

const StoreContextProvider = (props) =>{

    const [applypromo,setApplyPromo] = useState(false);
    const [discountAmt,setDiscountAmt] = useState(0);
    const[totalamt,setTotalAmt] = useState(0);

    const [cartItems,setCartItems] = useState({});
    const [token,setToken] = useState(localStorage.getItem("token") || "");
    const[food_list,setFoodList] = useState([]);

    const url = "https://foodizo-backend-eq3w.onrender.com";
    

    const addToCart = async (itemId) => {
        // !cartitem[itemId] => if cartItem[itemId]is not avaliable then this statement is true
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
            
        }
        else {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        
        if(token){
            const response = await axios.post(url+"/api/cart/add",{itemId},{headers:{token:token}}) ;
            
        }

    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))

        if(token){
            const response = await axios.post(url+"/api/cart/remove",{itemId},{headers:{token:token}}) ;
           
         }
    }

    const loadCartData = async()=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token:token}});
        setCartItems(response.data.cartData);
    }

    


    const getTotalCartAmount = () =>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
            let itemInfo = food_list.find((product)=>product._id===item);
            totalAmount+=itemInfo.price*cartItems[item];
            setTotalAmt(totalAmount);

            }
            

        }
        if(applypromo){
            totalAmount = totalAmount - discountAmt;
        }

        return totalAmount;
    }

    const fetchfood_list = async () =>{
        const foodData = await axios.get(`${url}/api/food/all`);
        console.log(foodData);
        setFoodList(foodData.data.data);
    }

    useEffect(()=>{
        async function loadData (){
            await fetchfood_list();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
          
        }
        loadData();
        
    },[]);


    


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        applypromo,
        setApplyPromo,
        discountAmt,
        setDiscountAmt,
        totalamt,
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
