import React from "react";
import Navbar from "../components/Navbar";
import UserList from "../components/UserList";

const Users = ({open, setOpen}) => {
  return (
    <div>
      <Navbar name={"user list"} open={open} setOpen={setOpen}/>
      <UserList />
    </div>
  );
};

export default Users;
