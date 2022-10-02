import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { userRequest } from "../requestMethods";
import { toast } from "react-toastify";

const OrderInner = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const deleteOrder = async (id) => {
    try {
      // eslint-disable-next-line
      const res = await userRequest.delete("/order/" + id);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const res = await userRequest.get("/order");
        setOrders(res.data.order);
      } catch (error) {
        console.log(error);
      }
    };
    getAllOrders();
    // eslint-disable-next-line
  }, [orders]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div>
      <div className="container">
        <div className="order-inner">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Orders"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* eslint-disable-next-line */}
          {orders
            .filter((item) => {
              if (search === "") {
                return item;
              } else if (
                item.name?.toLowerCase()?.includes(search?.toLowerCase())
              ) {
                return item;
              }
            })
            ?.map((order) => (
              <div className="order-inner-box" key={order._id}>
                <div className="top-sect">
                  <div className="top-sect-left">
                    <p>
                      <span>name:</span> {order.name}
                    </p>
                    <p>
                      <span>order ID:</span>{" "}
                      <span className="too-long">{order._id}</span>
                    </p>
                    <p>
                      <span>amount:</span> {numberWithCommas(order.amount)}
                    </p>
                    <p>
                      <span>amount paid:</span>{" "}
                      {order.amountPaid > order.amount
                        ? numberWithCommas(order.amountPaid * 4)
                        : numberWithCommas(order.amountPaid)}
                    </p>
                    <p>
                      <span>service:</span> {order.bought ? "bought" : "rent"}
                    </p>
                  </div>
                  <div className="top-sect-right">
                    <img
                      src={
                        order.userImg ||
                        "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock--480x320.jpg"
                      }
                      alt="#"
                    />
                    <img src={order.img} alt="#" />
                  </div>
                </div>
                <div className="bottom-sect">
                  <p>
                    {order.name} successfully{" "}
                    {order.bought ? "bought" : "rented"} a{" "}
                    {order.nameOfProductBought} for{" "}
                    {numberWithCommas(order.amount)} and paid{" "}
                    {numberWithCommas(order.amountPaid)}{" "}
                    {order.amountPaid > order.amount
                      ? `to occupy here for a period off ${
                          order.amountPaid / order.amount
                        } years`
                      : null}
                  </p>
                </div>
                <div className="delet-section">
                  <button onClick={() => deleteOrder(order._id)}>
                    Delete <DeleteOutlineIcon />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrderInner;
