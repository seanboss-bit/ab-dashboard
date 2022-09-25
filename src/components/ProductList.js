import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ProductFailure,
  ProductStart,
  ProductSuccess,
} from "../features/product/productRedux";
import { userRequest } from "../requestMethods";
import { motion } from "framer-motion";
const ProductList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  useEffect(() => {
    const getProduct = async () => {
      dispatch(ProductStart());
      try {
        const res = await userRequest.get("/products");
        dispatch(ProductSuccess(res.data.product));
      } catch (error) {
        dispatch(ProductFailure());
      }
    };
    getProduct();
    // eslint-disable-next-line
  }, []);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const container = {
    show: {
      transition: {
        staggerChildren: 0.35,
      },
    },
  };
  const items = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 1 },
    },
  };

  return (
    <div>
      <div className="container">
        <motion.div
          className="product-list-slide"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {products.map((item) => (
            <motion.div
            onClick={() => navigate(`/product/${item._id}`)}
              variants={items}
              className="product-list-box"
              key={item._id}
            >
              <img src={item.img} alt="#" />

              <h4>{item.name}</h4>
              <p>{item.location}</p>
              <span>{numberWithCommas(item.amount)}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductList;
