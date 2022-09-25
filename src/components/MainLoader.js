import React from "react";
import { motion } from "framer-motion";

const MainLoader = ({ setLoading }) => {
  const container = {
    show: {
      transition: {
        staggerChildren: 0.35,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.35,
      },
    },
  };
  const item = {
    hidden: {
      y: 400,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: { ease: [0.6, 0.01, -0.05, 0.95], duration: 2 },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.8,
      },
    },
  };
  return (
    <div>
      <motion.div
        className="main-loader"
        variants={container}
        initial="hidden"
        animate="show"
        exit="exit"
        onAnimationComplete={() => setLoading(false)}
      >
        <motion.img
          variants={item}
          src="https://cdn.punchng.com/wp-content/uploads/2016/05/09035340/High-rise-building.jpg"
          alt="#"
          className="img-one"
        />
        <motion.img
          variants={item}
          src="https://s3.amazonaws.com/images.skyscrapercenter.com/thumbs/79972_500x650.jpg"
          alt="#"
          className="img-two"
        />
        <motion.img
          variants={item}
          src="https://www.insurancejournal.com/app/uploads/2011/12/high-rise-buildings.jpg"
          alt="#"
          className="img-three"
        />
        <motion.img
          variants={item}
          src="https://www.shapesbyhydro.com/globalassets/shapes/expert-thoughts/materials-for-supertall-buildings01.jpg?quality=85&width=1036&height=440&mode=crop&center=0.5,0.5"
          alt="#"
          className="img-four"
        />
        <motion.img
          variants={item}
          src="https://www.geoplastglobal.com/wp-content/uploads/2019/04/4-LakePark-residencies-2.jpg"
          alt="#"
          className="img-five"
        />
      </motion.div>
    </div>
  );
};

export default MainLoader;
