import React from "react";

const ThreeBox = () => {
  return (
    <div>
      <div className="container">
        <div className="three-box-inner">
          <div className="three-box-box">
            <img src="images/undraw_at_home_re_1m0v.svg" alt="" />
            <div className="three-box-write">
              <h5>total properties</h5>
              <p>40,000</p>
            </div>
          </div>
          <div className="three-box-box">
            <img src="images/undraw_for_sale_re_egkk.svg" alt="" />
            <div className="three-box-write">
              <h5>properties bought</h5>
              <p>10,000</p>
            </div>
          </div>
          <div className="three-box-box">
            <img src="images/undraw_select_house_re_s1j9.svg" alt="" />
            <div className="three-box-write">
              <h5>properties rent</h5>
              <p>30,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeBox;
