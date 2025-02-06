import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { food_list, cartItems, removeAllFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate =useNavigate();


  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p >Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        <div className="cart-items-list">
          {food_list.map((item, index)=>{
            if (cartItems[item._id]>0) 
              {
                return(
                  <div>
                    <div className="cart-items-title cart-items">
                    <img key={index} src={url+"/images/"+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${cartItems[item._id]*item.price}</p>
                    <p onClick={()=>removeAllFromCart(item._id)} className="cart-items-delete">Delete</p>
                  </div>
                  <hr/>
                  </div>
                )

              
            }
          }
          )
          }

        </div>
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr/>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount()===0?0:3}</p>
          </div>
          <hr/>
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+3}</b>
          </div>
          <button onClick={()=>navigate("/order")}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>
              If you have a promo code, Enter it here
            </p>
            <div className="cart-promocode-input">
              <input type="text"placeholder="Promo code" />
              <button>Submit</button>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
  
};

export default Cart;
