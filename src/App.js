import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MainLoader from "./components/MainLoader";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import Product from "./pages/Product";
import Productinfo from "./pages/Productinfo";
import AddNewProduct from "./pages/AddNewProduct";
import Users from "./pages/Users";
import UserSingle from "./pages/UserSingle";
import Messages from "./pages/Messages";
import Order from "./pages/Order";

function App() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const admin = currentUser?.isAdmin;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <ToastContainer />
      {loading ? (
        <MainLoader />
      ) : (
        <Router>
          <div className={admin ? "main-divide" : null}>
            {admin ? (
              <div className="side-bar">
                <Sidebar open={open} setOpen={setOpen} />
              </div>
            ) : null}
            <Routes>
              <Route
                path="/"
                element={admin ? <Navigate to="/dashboard" /> : <Login />}
              />
              {admin && (
                <>
                  <Route path="/dashboard" element={<Dashboard open={open} setOpen={setOpen}/>} />
                  <Route path="/users" element={<Users open={open} setOpen={setOpen}/>} />
                  <Route path="/user/:id" element={<UserSingle open={open} setOpen={setOpen}/>} />
                  <Route path="/order" element={<Order open={open} setOpen={setOpen}/>} />
                  <Route path="/messages" element={<Messages open={open} setOpen={setOpen}/>} />
                  <Route path="/addnew" element={<AddNewProduct open={open} setOpen={setOpen}/>} />
                  <Route path="/product" element={<Product open={open} setOpen={setOpen}/>} />
                  <Route path="/product/:id" element={<Productinfo open={open} setOpen={setOpen}/>} />
                </>
              )}
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;
