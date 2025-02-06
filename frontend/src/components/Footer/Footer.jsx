import React from "react";
import "./Footer.css";
import { assets } from "../../assets/images/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint quae
            nostrum blanditiis similique assumenda aliquam, nesciunt ex?
            Delectus, rem quaerat, magnam accusamus obcaecati sapiente iure
            commodi quia distinctio possimus blanditiis?
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+25475641405</li>
            <li>contact@tomatoapp.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">copyright @ tomato.com - All rights reserved</p>
    </div>
  );
};

export default Footer;
