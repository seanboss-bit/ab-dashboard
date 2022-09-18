import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import {
  userListFail,
  userListStart,
  userListSuccess,
  DeleteUserStart,
  DeleteUserSuccess,
  DeleteUserFailure
} from "../features/List/listRedux";
import { toast } from "react-toastify";

const UserList = () => {
  const users = useSelector((state) => state.userList.userList);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  useEffect(() => {
    dispatch(userListStart());
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/users");
        dispatch(userListSuccess(res.data.users));
      } catch (error) {
        dispatch(userListFail(error));
        console.log(error);
      }
    };
    getUsers();
    // eslint-disable-next-line
  }, [users]);
  const deleteMessage = async (id) => {
    dispatch(DeleteUserStart());
    try {
      const res = await userRequest.delete(`/users/${id}`);
      dispatch(DeleteUserSuccess(res.data));
      toast.success(res.data.message)
    } catch (error) {
      console.log(error);
      dispatch(DeleteUserFailure());
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "user",
      headerName: "Users",
      width: 190,
      renderCell: (params) => {
        return (
          <div className="userList">
            <img
              src={
                params.row.img ||
                "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Free-Image.png"
              }
              alt="#"
              className="userListImg"
            />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 190 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Edit / Delete",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userEdit">edit</button>
            </Link>
            <DeleteOutlineIcon
              className="userDelete"
              onClick={() => deleteMessage(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <div className="container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Users"
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="user-data">
          <DataGrid
            // eslint-disable-next-line
            rows={users?.filter((item) => {
              if (filter === "") {
                return item;
              } else if (
                item.name
                  .toLocaleLowerCase()
                  .includes(filter.toLocaleLowerCase())
              ) {
                return item;
              }
            })}
            columns={columns}
            pageSize={9}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[9]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
};

export default UserList;
