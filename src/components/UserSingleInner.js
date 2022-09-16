import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import UpgradeIcon from '@mui/icons-material/Upgrade';

const UserSingleInner = () => {
  return (
    <div>
      <div className="container">
        <div className="user-inner">
          <div className="user-inner-details">
            <div className="user-top">
              <img
                src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock--480x320.jpg"
                alt="#"
                className="user-top-img"
              />
              <div className="user-top-writeups">
                <span className="use-top-name">dwayne the rock johnson</span>
                <span className="use-top-date">21-03-2022</span>
              </div>
            </div>
            <div className="user-bottom">
              <div className="user-bottom-title">
                <span>accound details</span>
              </div>
              <div className="user-bottom-box">
                <EmailIcon className="user-bottom-icon" />
                <span>email@email.com</span>
              </div>
              <div className="user-bottom-box">
                <LocalPhoneIcon className="user-bottom-icon" />
                <span>09057588210</span>
              </div>
              <div className="user-bottom-box">
                <SupervisedUserCircleIcon className="user-bottom-icon" />
                <span>admin: false</span>
              </div>
              <div className="user-bottom-box">
                <InventoryIcon className="user-bottom-icon" />
                <span>30</span>
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
                    <option value="yes">yes</option>
                    <option value="no">no</option>
                  </select>
                </div>
              </div>
              <div className="updateForm-right">
                <div className="user-pic-update">
                  <img
                    src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock--480x320.jpg"
                    alt="#" className="user-pic-img-update"
                  />
                  <label htmlFor="file"><UpgradeIcon className="updateIconPic"/></label>
                  <input type="file" id="file"/>
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
