import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductInfoInner = () => {
  const { products } = useSelector((state) => state.product);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [sect, setSect] = useState();
  useEffect(() => {
    // eslint-disable-next-line
    products?.find((item) => {
      if (id === item._id) {
        setSect(item);
      }
    });
    // eslint-disable-next-line
  }, [id]);
  return (
    <div>
      <div className="showcase-area">
        <img src={sect?.img} alt="#" />
        <h4>{sect?.name}</h4>
        <p>
          <LocationOnIcon />
          {sect?.fullAddress}
        </p>
      </div>
      <div className="product-info-extra">
        <div className="container">
          <div className="product-info-inner">
            <div className="price-bath">
              <div className="price">
                <p>NGN {sect?.amount}/yr</p>
              </div>
              <div className="bath">
                <div className="bath-box">
                  <BedIcon /> {sect?.type[0].bedroom}
                </div>
                <div className="bath-box">
                  <BathtubIcon /> {sect?.type[0].toilet}
                </div>
              </div>
            </div>
            <div className="product-descrption">
              <h3>description</h3>
              <p>{sect?.description}</p>
            </div>
            <div className="inner-images">
              {sect?.interior?.map((item) => (
                <img key={item} src={item} alt="#" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoInner;
