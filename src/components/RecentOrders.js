import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userRequest } from "../requestMethods";
import Moment from "react-moment";

const RecentOrders = () => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    const getNewOrders = async () => {
      try {
        const res = await userRequest.get("/order/?new=true");
        setOrders(res.data.order);
      } catch (error) {
        console.log(error);
      }
    };
    getNewOrders();
  }, []);
  return (
    <div className="recent-orders">
      <div className="container">
        <h5> recent orders</h5>
        <div className="recent-order-list">
          {orders?.map((order) => (
            <Link to="/order" className="recent-order-list-box" key={order._id}>
              <img src={order.img} alt="#" />
              <div className="property-writeups">
                <div className="recent-order-text">
                  <h6>property service</h6>
                  <p>property {order.bought === false ? "rent" : "bought"}</p>
                </div>
                <div className="recent-order-text">
                  <h6>{order.name}</h6>
                  <p>property owner</p>
                </div>
                <div className="recent-order-text">
                  <h6>
                    <Moment date={order.createdAt} format="dddd MM YYYY" />
                  </h6>
                  <p>date paid</p>
                </div>
                <div className="recent-order-text">
                  <h6>NGN {order.amountPaid}</h6>
                  <p>amount paid</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
