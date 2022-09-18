import React, { useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Moment from "react-moment";

const UserSingleInner = () => {
  const users = useSelector((state) => state.userList.userList);
  const location = useLocation();
  const [user, setuser] = useState();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    // eslint-disable-next-line
    users?.find((item) => {
      if (id === item._id) {
        setuser(item);
      }
    });
    // eslint-disable-next-line
  }, [id]);
  return (
    <div>
      <div className="container">
        <div className="user-inner">
          <div className="user-inner-details">
            <div className="user-top">
              <img
                src={
                  user?.img ||
                  "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Image.png"
                }
                alt="#"
                className="user-top-img"
              />
              <div className="user-top-writeups">
                <span className="use-top-name">{user?.name}</span>
                <span className="use-top-date">
                  <Moment date={user?.createdAt} format="DD-MM-YYYY" />
                </span>
              </div>
            </div>
            <div className="user-bottom">
              <div className="user-bottom-title">
                <span>accound details</span>
              </div>
              <div className="user-bottom-box">
                <EmailIcon className="user-bottom-icon" />
                <span>{user?.email}</span>
              </div>
              <div className="user-bottom-box">
                <LocalPhoneIcon className="user-bottom-icon" />
                <span>{user?.phone}</span>
              </div>
              <div className="user-bottom-box">
                <SupervisedUserCircleIcon className="user-bottom-icon" />
                <span>admin: {user?.isAdmin ? "Yes" : "No"}</span>
              </div>
              <div className="user-bottom-box">
                <InventoryIcon className="user-bottom-icon" />
                <span>
                  {user?.product[0].bought.length +
                    user?.product[0].rent.length}
                </span>
              </div>
            </div>
          </div>
          <div className="user-inner-update">
            <span className="update-title">edit</span>
            <form className="updateForm">
              <div className="updateForm-left">
                <div className="userUpdateBox">
                  <label>fullname</label>
                  <input type="text" placeholder="Fullname" />
                </div>
                <div className="userUpdateBox">
                  <label>email</label>
                  <input type="email" placeholder="Fullname" />
                </div>
                <div className="userUpdateBox">
                  <label>phone</label>
                  <input type="number" placeholder="Number" />
                </div>
                <div className="userUpdateBox">
                  <label>isAdmin</label>
                  <select>
                    <option value="no">no</option>
                    <option value="yes">yes</option>
                  </select>
                </div>
              </div>
              <div className="updateForm-right">
                <div className="user-pic-update">
                  <img
                    src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock--480x320.jpg"
                    alt="#"
                    className="user-pic-img-update"
                  />
                  <label htmlFor="file">
                    <UpgradeIcon className="updateIconPic" />
                  </label>
                  <input type="file" id="file" />
                </div>
                <button className="userUpadtebtn">update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSingleInner;
