import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const List = ({url,token}) => {
  const [list, setList] = useState([]);
 

  const fetchList = async () => {
    try { 
      
      const response = await axios.post(`${url}/api/food/list`,{token:token});
      
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Error fetching food list");
    } 
  };

  const RemoveListItem = async (id)=> {
    try{
      
      const response =await axios.post(`${url}/api/food/remove`,{id});
      if(response.data.success){
        toast.success("Food Item Removed");
        fetchList();
      }else{
        toast.error("Failed to remove food item");
      }
    }catch(error){
      console.error("Error removing food item:",error);
      
    }
  }


useEffect(()=>{
  fetchList();
},[]);
    


  
  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
          <b></b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className="list-table-format">
              <img src={item.image} alt="ttt" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p onClick={()=>{RemoveListItem(item._id)}} className='remove-table-item' >x</p>
            </div>
          )
        })}
      </div>

    </div>
  );
};

export default List;