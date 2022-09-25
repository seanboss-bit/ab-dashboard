import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userRequest } from "../requestMethods";
import Moment from "react-moment";

const RecentUser = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await userRequest.get("/users/?new=true");
        setUsers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    getNewUsers();
  }, []);
  return (
    <div>
      <div className="container">
        <div className="recent-user-inner">
          {users?.map((user) => (
            <Link
              to={`/user/${user._id}`}
              className="user-recent"
              key={user._id}
            >
              <img
                src={
                  user.img ||
                  "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Image.png"
                }
                alt="#"
              />
              <div className="user-recent-write">
                <h6>{user.name}</h6>
                <p><Moment date={user.createdAt} format="dddd MM YYYY" /></p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentUser;
