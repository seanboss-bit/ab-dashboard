import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductInfoInner from "../components/ProductInfoInner";
import {
  DeleteFailure,
  DeleteStart,
  DeleteSuccess,
} from "../features/product/productRedux";
import { userRequest } from "../requestMethods";

const Productinfo = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const deleteProduct = async () => {
    dispatch(DeleteStart());
    try {
      const res = await userRequest.delete(
        "/products/" + location.pathname.split("/")[2]
      );
      if (res.data) {
        navigate("/product");
      }
      dispatch(DeleteSuccess(res.data));
    } catch (error) {
      dispatch(DeleteFailure);
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar name="prdouct info" open={open} setOpen={setOpen} />
      <div className="container">
        <div className="addProduct">
          {/* eslint-disable-next-line */}
          <button
            className="delete"
            onClick={(e) => {
              e.preventDefault();
              deleteProduct();
            }}
          >
            delete
          </button>
          <button>edit</button>
        </div>
      </div>
      <ProductInfoInner />
    </div>
  );
};

export default Productinfo;
