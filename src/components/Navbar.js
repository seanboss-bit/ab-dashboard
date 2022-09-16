import React from "react";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ name, open, setOpen }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="nav">
      <div className="container">
        <div className="nav-inner">
          <div className="open">
            <MenuIcon
              onClick={() => {
                setOpen(!open);
              }}
            />
          </div>
          <div className="name-page">{name}</div>
          <div className="current-user-details">
            <div className="write-ups">
              <p>{currentUser?.name}</p>
              <p>{currentUser?.email}</p>
            </div>
            <div className="writeimg">
              <img src={currentUser?.img} alt="#" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
