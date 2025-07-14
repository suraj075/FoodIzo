import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({token}) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className='navbar'>
      <img  src={assets.logo} alt="" className="logo" />
      <div className="nav-right">
        <img src={assets.profile_image} alt="" className="profile" />
        {!token ? <button  onClick={() => navigate('/')} className="login-btn">Login</button>:<button onClick={handleLogout} className="logout-btn">Logout</button>}
        
      </div>
    </div>
  )
}

export default Navbar