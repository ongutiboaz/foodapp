import React, { useState } from "react";
import "./navbarstyle.css";
import { assets } from "../../assets/images/assets";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";

const Navigationbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  return (
    <div>
      <div className="navbar">
        <Link to="/" rel="stylesheet" href="">
          <img src={assets.logo} alt="" className="logo" />
        </Link>
        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="#app-download"
            onClick={() => setMenu("mobile-app")}
            className={menu === "mobile-app" ? "active" : ""}
          >
            Mobile-app
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            Contact-us
          </a>
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} alt="" />
          <div className="navbar-search-icon">
            <Link to="/Cart">
              <img src={assets.basket_icon} alt="" />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {!token ? (
            <button onClick={() => setShowLogin(true)}>Sign in</button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li>
                  <img src={assets.bag_icon} alt="" />
                  <p>orders</p>
                </li>
                <hr />
                <li onClick={logOut}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigationbar;
