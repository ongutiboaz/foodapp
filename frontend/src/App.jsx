import React, { useState } from "react";
import Navigationbar from "./components/Navbar/Navigationbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";


const App = () => {
  
 
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin? <LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <Navigationbar setShowLogin={setShowLogin}></Navigationbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer></Footer>
    </>
  );
};

export default App;
