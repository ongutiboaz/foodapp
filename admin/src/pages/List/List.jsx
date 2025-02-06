import React, { useEffect, useState } from 'react'
import "./List.css"
import axios from "axios"
import { toast } from 'react-toastify';

const List = () => {  
  const url= "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList =async()=>{
    const response =await axios.get(`${url}/api/food/list`)
    console.log(response.data)
    if (response.data.data) {
      setList(response.data.data)
    }
    else{
      toast.error("Error")
    }
   
  }
  const removeFood = async (foodId) => {
    try {
      await axios.post(`${url}/api/food/remove`, { id: foodId });
      setList(prevList => prevList.filter(item => item._id !== foodId));
      toast.success('Food item removed successfully');
    } catch (error) {
      console.error('Error removing food item:', error);
      toast.error('Error removing food item');
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list flex-col'>
      
      <div className="list-table">
        <p>All Foods</p>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Description</b>
          <b>Action</b>
          </div>
          {list.map((item,index)=>{
            return(
              <div key={index} className="list-table-format">
                <img src={`${url}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p>{item.description}</p>
                <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
              </div>
            )


          })}
      </div>

     
      
    </div>
  )
}

export default List
