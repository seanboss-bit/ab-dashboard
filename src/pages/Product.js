import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";

const Product = ({open, setOpen}) => {
  return (
    <div>
      <Navbar name="product" open={open} setOpen={setOpen}/>
      <div className="container">
        <div className="addProduct">
          <Link to="/addnew">Add New</Link>
        </div>
      </div>
      <ProductList />
    </div>
  );
};

export default Product;
