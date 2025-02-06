import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/images/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (Props) => {
  const url = "http://localhost:4000";
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");

  const addToCart = async (itemId) => {
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
    if (!cartItems[itemId]) {
      setCartItems((Prev) => ({ ...Prev, [itemId]: 1 }));
    } else {
      setCartItems((Prev) => ({ ...Prev, [itemId]: Prev[itemId] + 1 }));
    }
   
  };
  const removeFromCart = async (itemId) => {
    setCartItems((Prev) => ({ ...Prev, [itemId]: Prev[itemId] - 1 }));

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };
  const removeAllFromCart = async (itemId) => {
    setCartItems((Prev) => ({
      ...Prev,
      [itemId]: Prev[itemId] - Prev[itemId],
    }));
    
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
 


  console.log(getTotalCartAmount()); // Should output the correct total amount
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };
  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }),
    [];

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    removeAllFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {Props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
