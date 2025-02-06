import express, { request } from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import mpesaRouter from "./routes/mpesaRoute.js";
import bodyParser from 'body-parser';






// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



//app config
const app = express();
// const request = require("request")
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


// db connection
connectDB();

// api endpoint
// --food api
app.use("/images", express.static("upload"));
app.use("/api/list", foodRouter);
app.use("/api/food", foodRouter);
app.use("/api/remove", foodRouter);
// --login/signup api
app.use("/api/user", userRouter);
// --cart api--
app.use("/api/cart", cartRouter);
// --mpesa api
app.use('/api/mpesa', mpesaRouter);

app.get("/", (req, res) => {
  res.send("Api working");
});
app.listen(port, () => {
  console.log(`server started on http://Localhost:${port}`);
});
// mongodb+srv://ongutiboaz:d2er-GJe7KQA!@cluster0.sh4oehc.mongodb.net/?
