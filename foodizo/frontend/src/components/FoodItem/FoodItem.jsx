import React , {useContext} from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import toast, { Toaster } from 'react-hot-toast';

const FoodItem = ({id,name,price,description,image}) => {

  const {cartItems,addToCart,removeFromCart} = useContext(StoreContext);

  const {url} = useContext(StoreContext);


  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={`${image}`} alt="" />
            {/* !item count =>if item count not equal to 0 or you can write itemCount==0 */}
            {!cartItems[id]
             ?<img className='add' onClick={()=>{addToCart(id);
              toast.success('Item added successfully ')
             }} src={assets.add_icon_white} alt="" />
             :<div className='food-item-counter'>
                 <img onClick={()=>{removeFromCart(id)}} src={assets.remove_icon_red} alt="" />
                 <p>{cartItems[id]}</p>
                 <img onClick={()=>{addToCart(id);
                  toast.success('Item added successfully')
                 }} src={assets.add_icon_green} alt="" />
 
              </div>

            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="foood-item-desc">{description}</p>
            <p className="food-item-price">₹{price}</p>
        </div>
      
    </div>
  )
}

export default FoodItem
