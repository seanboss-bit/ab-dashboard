import React from "react";
import AddForm from "../components/AddForm";
import Navbar from '../components/Navbar'

const AddNewProduct = ({open, setOpen}) => {
  return (
    <div>
      <Navbar name={'add product'} open={open} setOpen={setOpen}/>
      <AddForm />
    </div>
  );
};

export default AddNewProduct;
