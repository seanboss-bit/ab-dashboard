import React from "react";
import Navbar from "../components/Navbar";
import UserSingleInner from "../components/UserSingleInner";

const UserSingle = ({open, setOpen}) => {
  return (
    <div>
      <Navbar name={`user fullname`} open={open} setOpen={setOpen}/>
      <UserSingleInner />
    </div>
  );
};

export default UserSingle;
