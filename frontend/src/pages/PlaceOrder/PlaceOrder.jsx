import React from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext';
import { useContext } from 'react';

const PlaceOrder = () => {
  const {  getTotalCartAmount } = useContext(StoreContext);
  return (
    <div>
      <form action="" className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input type="text" placeholder='First name'/>
            <input type="text" placeholder='Last name'/>
          </div>
          <div>
            <input type="text" placeholder='Email Adress'/>
            <input type="text" placeholder='Street'/>
          </div>
          <div className="multi-fields">
            <input type="text" placeholder='City'/>
            <input type="text" placeholder='State'/>
          </div>
          <div className="multi-fields">
            <input type="text" placeholder='Zip Code'/>
            <input type="text" placeholder='Country'/>
          </div>
          <input type="text" placeholder='Phone'/>

        </div>
        <div className="place-order-right">
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
          <button>PROCEED TO PAYMENT</button>
        </div>

        </div>

      </form>
      
    </div>
  )
}

export default PlaceOrder
