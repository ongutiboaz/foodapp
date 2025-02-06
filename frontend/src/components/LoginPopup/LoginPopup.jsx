import React, { useContext, useState, useEffect } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/images/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    try {
      const res = await axios.post(newUrl, data);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setShowLogin(false);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="login-popup">
        <form onSubmit={onLogin} className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <div className="login-popup-inputs">
            {currState === "Create Account" && (
              <>
                <div className="input-name">
                  <input
                    type="text"
                    name="name"
                    onChange={onChangeHandler}
                    value={data.name}
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    name="secondName"
                    placeholder="Second Name"
                  />
                </div>

                <div className="input-location">
                  <input
                    type="text"
                    name="town"
                    placeholder="Town"
                    onChange={onChangeHandler}
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    onChange={onChangeHandler}
                  />
                </div>
              </>
            )}

            <div className="input-contact">
              <input
                type="email"
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                placeholder="Email"
              />
              {currState === "Create Account" && (
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={onChangeHandler}
                />
              )}
            </div>
            <input
              type="password"
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              placeholder="Password"
            />
            {currState === "Create Account" && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={onChangeHandler}
              />
            )}
          </div>
          <button type="submit">
            {currState === "Create Account" ? "Create Account" : "Login"}
          </button>

          <div className="login-popup-condition">
            <input type="checkbox" required />
            <label>
              By continuing, I agree to the use & privacy policy.
            </label>
          </div>
          <div>
            {currState === "Create Account" ? (
              <p>
                Already have an account?{" "}
                <span onClick={() => setCurrState("Login")}>Login</span>
              </p>
            ) : (
              <p>
                Create an account?{" "}
                <span onClick={() => setCurrState("Create Account")}>
                  Click here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
