import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { UserRows } from "../testData";

const UserList = () => {
  const [data, setData] = useState(UserRows);
  const [filter, setFilter] = useState("");
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "user",
      headerName: "Users",
      width: 290,
      renderCell: (params) => {
        return (
          <div className="userList">
            <img src={params.row.avatar} alt="#" className="userListImg" />
            {params.row.fullName}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 290 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Edit / Delete",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userEdit">edit</button>
            </Link>
            <DeleteOutlineIcon
              className="userDelete"
              onClick={() => handleDelete(params.row.id)}
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
            rows={data.filter((item) => {
              if (filter === "") {
                return item;
              } else if (
                item.fullName
                  .toLocaleLowerCase()
                  .includes(filter.toLocaleLowerCase())
              ) {
                return item;
              }
            })}
            columns={columns}
            pageSize={9}
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
