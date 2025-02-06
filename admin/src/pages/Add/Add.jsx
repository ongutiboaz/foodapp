import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/admin_assets/assets";
import axios from "axios"
import { toast } from "react-toastify";
const Add = () => {
  const url= "http://localhost:4000";
  const [image, setImage] = useState(false);
  const onChangeImageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
  const onChangeDataHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(() => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData)
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false)
      toast.success(response.data.message)
      
    } else {
      console.error("Error adding product:", response.data.message);
      toast.error(response.data.message)
      
    }
   
  };
  
  // useEffect(() => {
  //   console.log(data,image)
  // }),[data,image];

  return (
    <div className="add">
      <form action="" onSubmit={onSubmitHandler} className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={onChangeImageHandler}
            type="file"
            id="image"
            hidden
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeDataHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type name here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeDataHandler}
            value={data.description}
            name="description"
            id="description"
            rows="6"
            placeholder="Write product description  here"
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeDataHandler} name="category" id="">
              <option value="Salad">Salad</option>
              <option value="RollsDesert">RollsDesert</option>
              <option value="Desert">Desert</option>
              <option value="Sandwitch">Sandwitch</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeDataHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
