import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ProductFailure,
  ProductStart,
  ProductSuccess,
} from "../features/product/productRedux";
import { userRequest } from "../requestMethods";
const ProductList = () => {
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
  return (
    <div>
      <div className="container">
        <div className="product-list-slide">
          {products.map((item) => (
            <Link
              to={`/product/${item._id}`}
              className="product-list-box"
              key={item._id}
            >
              <img src={item.img} alt="#" />

              <h4>{item.name}</h4>
              <p>{item.location}</p>
              <span>{item.amount}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
