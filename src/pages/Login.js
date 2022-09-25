import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { publicRequest } from "../requestMethods";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../features/user/userRedux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginAdmin = async () => {
    if (email === "" || password === "") {
      toast.error("Fill in all Fields");
    } else {
      dispatch(loginStart());
      try {
        const res = await publicRequest.post("/users/login/admin", {
          email,
          password,
        });
        dispatch(loginSuccess(res.data));
        if (res.data.isAdmin) {
          navigate("/dashboard");
        } else {
          toast.error("You Are Not An Admin");
        }
      } catch (error) {
        toast.error(error.response.data.error);
        dispatch(loginFailure());
      }
    }
  };
  return (
    <div>
      <div className="container">
        <motion.div
          className="login-inner"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6 }}
        >
          <div className="form-box">
            <div className="logo">
              <h2>AB Homes</h2>
            </div>
            <div className="form">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  loginAdmin();
                }}
              >
                <div className="login-box">
                  <p>email</p>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="login-box">
                  <p>password</p>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <input type="submit" value="Login" />
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
