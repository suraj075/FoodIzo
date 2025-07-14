import React, { useEffect ,useContext} from 'react'
import './verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
   
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

      

    

    const verifyPayment = async () => {
        try {
          const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
          console.log(response.data);
          if (response.data.success) {
            navigate("/order");
          } else {
            navigate("/");
          }
        } catch (error) {
          console.error("Verification failed:", error);
          navigate("/"); // fallback if request fails
        }
      }
      

    useEffect(()=>{
        console.log("Verify page loaded 🚀", { success, orderId });
        verifyPayment();
    },[]);


  return (
    <div className='verify'>
        <div className="spinner"></div>
        <p>Verifying payment...</p>
    </div>
  )
}

export default Verify
