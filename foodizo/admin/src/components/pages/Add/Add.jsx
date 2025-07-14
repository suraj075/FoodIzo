import React,{useEffect, useState} from 'react'
import './Add.css'
import { assets } from '../../../assets/assets'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = ({url,token}) => {

  
  const[image,setImage] = useState(false);
  const[data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  })

  const onChangeHandler =(event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }


  // 1st API call to send data 

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData,
      {headers: {
      token:token,
    },
  });
    
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success("Product added successfully");
      
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className='add'>
      <form action="" className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
          {/* The URL.createObjectURL(image) is used to display the selected image preview. */}
          <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea  onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write Content here' required></textarea>
        </div>
        <div className="add-category-price" >
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category" onChange={onChangeHandler} value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input  onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='₹0'/>
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
      
      
    </div>
  )
}

export default Add



