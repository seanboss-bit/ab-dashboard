import React from "react";
import { motion } from "framer-motion";
const ThreeBox = () => {
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
  const item = {
    hidden: {
      scale: 2,
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
          className="three-box-inner"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div className="three-box-box" variants={item}>
            <img src="images/undraw_at_home_re_1m0v.svg" alt="" />
            <div className="three-box-write">
              <h5>total properties</h5>
              <p>{numberWithCommas(400000)}</p>
            </div>
          </motion.div>
          <motion.div className="three-box-box"  variants={item}>
            <img src="images/undraw_for_sale_re_egkk.svg" alt="" />
            <div className="three-box-write">
              <h5>properties bought</h5>
              <p>{numberWithCommas(100000)}</p>
            </div>
          </motion.div>
          <motion.div className="three-box-box"  variants={item}>
            <img src="images/undraw_select_house_re_s1j9.svg" alt="" />
            <div className="three-box-write">
              <h5>properties rent</h5>
              <p>{numberWithCommas(300000)}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThreeBox;
