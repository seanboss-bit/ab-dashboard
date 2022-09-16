import React from "react";
import Navbar from "../components/Navbar";
import OrderInner from "../components/OrderInner";

const Order = ({open, setOpen}) => {
  return (
    <div>
      <Navbar name={'orders'} open={open} setOpen={setOpen}/>
      <OrderInner />
    </div>
  );
};

export default Order;
