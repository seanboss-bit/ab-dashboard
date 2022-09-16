import React from "react";
import { useDispatch } from "react-redux";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HouseIcon from "@mui/icons-material/House";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../features/user/userRedux";
import CloseIcon from "@mui/icons-material/Close";

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  return (
    <div className={open ? "side-nav active" : "side-nav"}>
      <div className="container">
        <div className="close">
          <CloseIcon
            onClick={() => {
              setOpen(!open);
            }}
          />
        </div>
        <div className="side-bar-inner">
          <div className="logo">
            <h2>AB Homes</h2>
          </div>
          <div className="side-links">
            <Link to="/dashboard" className="rounded" onClick={() => {setOpen(false)}}>
              <div
                className={
                  location.pathname === "/dashboard"
                    ? "icon-space active"
                    : "icon-space"
                }
              >
                <DashboardIcon />
              </div>
              <p>dashboard</p>
            </Link>
            <Link to="/product" className="rounded" onClick={() => {setOpen(false)}}>
              <div
                className={
                  location.pathname === "/product"
                    ? "icon-space active"
                    : "icon-space"
                }
              >
                <HouseIcon />
              </div>
              <p>properties</p>
            </Link>
            <Link to="/order" className="rounded" onClick={() => {setOpen(false)}}>
              <div
                className={
                  location.pathname === "/order"
                    ? "icon-space active"
                    : "icon-space"
                }
              >
                <i className="fa-solid fa-box"></i>
              </div>
              <p>orders</p>
            </Link>
            <Link to="/messages" className="rounded" onClick={() => {setOpen(false)}}>
              <div
                className={
                  location.pathname === "/messages"
                    ? "icon-space active"
                    : "icon-space"
                }
              >
                <EmailIcon />
              </div>
              <p>messages</p>
            </Link>
            <Link to="/users" className="rounded" onClick={() => {setOpen(false)}}>
              <div
                className={
                  location.pathname === "/users"
                    ? "icon-space active"
                    : "icon-space"
                }
              >
                <PersonIcon />
              </div>
              <p>users</p>
            </Link>
            <Link
              to="/"
              className="rounded"
              onClick={() => {
                dispatch(logout());
              }}
            >
              <div className="icon-space">
                <LogoutIcon />
              </div>
              <p>logout</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
