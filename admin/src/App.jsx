import React from "react";
import './App.css'; // Make sure to import the CSS
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Order from "./pages/Order/Order";
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div>
      <ToastContainer/>     
      <Navbar></Navbar>
      <hr />
      <div className="app-content">
        <Sidebar></Sidebar>
        <Routes>
          <Route path="/add" element={<Add></Add>}></Route>
          <Route path="/list" element={<List></List>}></Route>
          <Route path="/order" element={<Order></Order>}></Route>
        </Routes>
      </div>
      
    </div>
  );
};

export default App;
