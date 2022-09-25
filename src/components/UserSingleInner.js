import React, { useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { userRequest } from "../requestMethods";
import app from "../firebase";
import { toast } from "react-toastify";

const UserSingleInner = () => {
  const users = useSelector((state) => state.userList.userList);
  const [input, setInput] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setuser] = useState();
  const [presentPic, setPresentPic] = useState(
    "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock--480x320.jpg"
  );
  const [file, setFile] = useState(null);
  const handleImg = (e) => {
    const selectImg = e.target.files;
    const selectedImg = Array.from(selectImg);
    const ImgArr = selectedImg.map((image) => {
      return URL.createObjectURL(image);
    });
    setPresentPic(ImgArr);
  };
  const handleInput = (e) => {
    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
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

  const updateUser = async () => {
    if (file?.name) {
      const singleFileName = new Date().getTime() + file?.name;
      const storage = getStorage(app);
      const StorageRef = ref(storage, singleFileName);
      const uploadTask = uploadBytesResumable(StorageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              const res = await userRequest.put(`/users/${id}`, {
                ...input,
                img: downloadURL,
              });
              toast.success(res.data.message);
              if (res.data.message) {
                navigate("/users");
              }
            } catch (error) {
              console.log(error);
            }
          });
        }
      );
    } else {
      try {
        const res = await userRequest.put(`/users/${id}`, {
          ...input,
        });
        toast.success(res.data.message);
        navigate("/users");
      } catch (error) {
        console.log(error);
      }
    }
  };
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
                  <input
                    type="text"
                    placeholder="Fullname"
                    name="name"
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div className="userUpdateBox">
                  <label>email</label>
                  <input
                    type="email"
                    placeholder="Fullname"
                    name="email"
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div className="userUpdateBox">
                  <label>phone</label>
                  <input
                    type="number"
                    placeholder="Number"
                    name="phone"
                    onChange={(e) => handleInput(e)}
                  />
                </div>
                <div className="userUpdateBox">
                  <label>isAdmin</label>
                  <select name="isAdmin" onChange={(e) => handleInput(e)}>
                    <option value={false}>no</option>
                    <option value={true}>yes</option>
                  </select>
                </div>
              </div>
              <div className="updateForm-right">
                <div className="user-pic-update">
                  <img
                    src={presentPic}
                    alt="#"
                    className="user-pic-img-update"
                  />
                  <label htmlFor="file">
                    <UpgradeIcon className="updateIconPic" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => {
                      handleImg(e);
                      setFile(e.target.files[0]);
                    }}
                  />
                </div>
                <button
                  className="userUpadtebtn"
                  onClick={(e) => {
                    e.preventDefault();
                    updateUser();
                  }}
                >
                  update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSingleInner;
