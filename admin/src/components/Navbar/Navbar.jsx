import React from 'react'
import { assets } from "../../assets/admin_assets/assets";
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className="navbar-logo" src={assets.logo} alt="" />
      <div className="navbar-profile">
      <img src={assets.profile_image} alt="" />
      <p>Boaz Mogambi</p>
      </div>
      
    </div>
  )
}

export default Navbar
