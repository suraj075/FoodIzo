import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import  { Toaster } from 'react-hot-toast';

const FoodDisplay = ({ category, searchquery ,recent1 }) => {


  const { food_list } = useContext(StoreContext);

  // Filter food items based on category and search query
  const filteredFoodList2 = food_list
    .filter((item) => {
      // Filter by category
      if (category === "All" || category === item.category) {
        return true;
      }
      return false;
    })

    

  const filteredFoodList1 = food_list.filter((item) => {
    // Filter by search query
    if (searchquery) {
      return item.name.toLowerCase().includes(searchquery.toLowerCase());
    }
    return true;
  });



  const FodlistToRender = recent1 ? filteredFoodList1 : filteredFoodList2;
  


  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName="alert-container"
        containerStyle={{ marginTop: '2rem' }}
        toastOptions={{
          className: 'alert-container',
          duration: 2500,
          style: {
            background: '#000000',
            color: '#ffffff',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
            fontSize: '16px',
            transition: 'all 0.5s ease-in-out',
          },
          success: {
            duration: 1500,
            style: {
              background: '#000000',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
              fontSize: '16px',
              transition: 'all 0.5s ease-in-out',
            },
          },
          error: {
            duration: 3500,
            style: {
              background: '#000000',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
              fontSize: '16px',
              transition: 'all 0.5s ease-in-out',
            },
          },
        }}
      />

      <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
         
          {FodlistToRender.map((item, index) => (
            <FoodItem
              key={item._id} 
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FoodDisplay;