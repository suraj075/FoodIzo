import React, { useContext, useState ,useEffect} from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';


const Navbar = ({setShowLogin,searchquery,setSearchquery,setRecent1,recent1,recent2,setRecent2}) => {


  const[menu,setMenu] = useState("menu");
  const [showsearch,setShowsearch] = useState(false);
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext);
  const navigate = useNavigate();

  

  const logout =() =>{
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  }

 

  

  return (
      <div className='navbar'>
        <Link to='/' ><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className="navbar-menu">
          {/* convert li to Link */}
            <Link to='/' onClick={()=>{setMenu("home")}} className={menu=="home"?"active":""}>home</Link>
            <a href='#explore-menu' onClick={()=>{setMenu("menu")}} className={menu=="menu"?"active":""}>menu</a>
            <a href='#app-download' onClick={()=>{setMenu("mobile-app")}} className={menu=="mobile-app"?"active":""}>mobile app</a>
            <a href='#footer' onClick={()=>{setMenu("contact-us")}} className={menu=="contact-us"?"active":""}>contact us</a>
        </ul>
        <div className="navbar-right">
          <input type="text" name="Search" placeholder='Search Food' id="searcn-bar" value={searchquery} onChange={(e)=>{setSearchquery(e.target.value);
            setRecent1(true);
            setRecent2(false);
          }} onKeyDown={(e) => {
   
  }} className={showsearch?"show":"hide"} ></input>
            <img src={assets.search_icon}  alt="" onClick={()=>{setShowsearch(!showsearch)}} className="search-icon"/>
            <div className="navbar-search_icon">
                <Link to='/cart' ><img src={assets.basket_icon}  alt="" /></Link>         
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>:
            <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className='nav-profile-dropdown'>
                <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={logout} ><img src={assets.logout_icon} alt="" />Logout</li>
    
              </ul>

              </div>}
            
        </div>
      </div>
  )
}

export default Navbar
