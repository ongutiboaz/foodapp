import { resolve6 } from "dns";
import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added",food});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
// all foods list

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, message: "Foods retrieved successfully", data: foods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving foods" });
  }
};

//remove food item

const removeFood =async(req,res)=>{
  // const FoodId = req.params.id
  const FoodId = req.body.id
  try {
    const food = await foodModel.findByIdAndDelete(FoodId)
    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }
    fs.unlink(`upload/${food.image}`, (err) => {
      if (err) {
        console.error(`Failed to delete image file: ${err.message}`);
      }
      // else{
      //   // console.error(`Failed to delete image file: ${err.message}`)
      //   res.json({ success: true, message: "image item removed" });
      // }
    })
    
    
    res.json({ success: true, message: "Food item removed" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error removing food item" });
  
    
  }
}



export { addFood, listFood,removeFood };
