import mongoose from "mongoose";
export const connectDB = async ()=>{
  await mongoose.connect('mongodb+srv://ongutiboaz:d2er-GJe7KQA!@cluster0.sh4oehc.mongodb.net/food-del').then(()=>console.log("DB Connected"))
} 
// export {connectDB}