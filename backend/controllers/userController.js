import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Doesn't Exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid user Email or ID please check and try again",
      });
    }
    const token = createToken(user._id);
    return res.json({ success: true, message: "Login Succesfull", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};
//create token
const createToken = (id) => {
  // return jwt.sign({ id }, process.env.JWT_SECRET);
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "0.03h" });

};

//register user controller
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //checking if the user exist
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "user already exists proceed to login",
      });
    }
    //validating email format & a strong password

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    //password strength validator
    const isStrongPassword = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
    if (!isStrongPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter strong password" });
    }
    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    //token
    const token = createToken(user._id);
    res
      .status(201)
      .json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
// export { loginUser, registerUser };

export { loginUser, registerUser };

// { expiresIn: '1h' }
