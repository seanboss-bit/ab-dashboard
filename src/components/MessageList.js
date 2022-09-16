import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteFailure,
  DeleteStart,
  DeleteSuccess,
  MessageFailure,
  MessageStart,
  MessageSuccess,
} from "../features/message/messageRedux";
import { userRequest } from "../requestMethods";

const MessageList = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const [show, setShow] = useState(false);
  const [same, setSame] = useState();
  const { message } = useSelector((state) => state.message);
  // eslint-disable-next-line
  let match = message?.find((item) => {
    if (same === item._id) {
      return item;
    }
  });
  const updateRead = async (id) => {
    try {
      // eslint-disable-next-line
      const res = await userRequest.put("/messages/" + id, {
        read: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMessage = async (id) => {
    dispatch(DeleteStart());
    try {
      const res = await userRequest.delete(`/messages/${id}`);
      dispatch(DeleteSuccess(res.data));
    } catch (error) {
      console.log(error);
      dispatch(DeleteFailure());
    }
  };
  useEffect(() => {
    const getMessage = async () => {
      dispatch(MessageStart());
      try {
        const res = await userRequest.get("/messages");
        dispatch(MessageSuccess(res.data.sentMessage));
      } catch (error) {
        dispatch(MessageFailure());
      }
    };
    getMessage();
    // eslint-disable-next-line
  }, [message]);

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "firstName",
      headerName: "First Name",
      width: 170,
      renderCell: (params) => {
        return <span className="msgname">{params.row.firstName}</span>;
      },
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 190,
      renderCell: (params) => {
        return <span className="msgname">{params.row.lastName}</span>;
      },
    },
    { field: "email", headerName: "Email", width: 130 },
    {
      field: "read",
      headerName: "Read",
      width: 100,
      renderCell: (params) => {
        if (params.row.read) {
          return <span className="readTrue"></span>;
        } else {
          return <span className="readfalse"></span>;
        }
      },
    },
    {
      field: "actions",
      headerName: "Edit / Delete",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button
              className="userEdit"
              onClick={() => {
                setShow(true);
                setSame(params.row._id);
                updateRead(params.row._id);
              }}
            >
              view
            </button>

            <DeleteOutlineIcon
              className="userDelete"
              onClick={() => {
                deleteMessage(params.row._id);
              }}
            />
          </>
        );
      },
    },
  ];
  return (
    <div>
      <div>
        <div className="container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Messages"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className={show ? "user-data readMode" : "user-data"}>
            <DataGrid
              // eslint-disable-next-line
              rows={message?.filter((item) => {
                if (filter === "") {
                  return item;
                } else if (
                  item.firstName
                    .toLocaleLowerCase()
                    .includes(filter.toLocaleLowerCase()) ||
                  item.email
                    .toLocaleLowerCase()
                    .includes(filter.toLocaleLowerCase())
                ) {
                  return item;
                }
              })}
              columns={columns}
              getRowId={(row) => row._id}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
              disableSelectionOnClick
            />
            {show ? (
              <div className="message-content">
                <div className="msgcnt-top">
                  <CloseIcon onClick={() => setShow(false)} />
                </div>
                <div className="logo">
                  <h2>AB Homes</h2>
                </div>
                <div className="msgbody">
                  <p className="msgbodyname">
                    from: {match?.firstName} {match?.lastName}
                  </p>
                  <p className="msgbodyname">
                    <span>to:</span> admin
                  </p>
                  <p className="msgbodyname">
                    <span>phone:</span> {match?.phone}
                  </p>
                  <p className="just">
                    <span className="msgbodyname">message:</span>{" "}
                    {match?.message}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageList;
