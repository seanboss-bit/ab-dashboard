import React from "react";
import MessageList from "../components/MessageList";
import Navbar from "../components/Navbar";
const Messages = ({open, setOpen}) => {
  return (
    <div>
      <Navbar name={"messages"} open={open} setOpen={setOpen}/>
      <MessageList />
    </div>
  );
};

export default Messages;
