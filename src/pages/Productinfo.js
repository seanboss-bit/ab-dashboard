import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CloseIcon from "@mui/icons-material/Close";
import ProductInfoInner from "../components/ProductInfoInner";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import {
  DeleteFailure,
  DeleteStart,
  DeleteSuccess,
  UpadateStart,
  UpdateFailure,
  UpdateSuccess,
} from "../features/product/productRedux";
import { userRequest } from "../requestMethods";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { toast } from "react-toastify";

const Productinfo = ({ open, setOpen }) => {
  const [img, setImg] = useState([]);
  const [input, setInput] = useState({});
  const [bed, setBed] = useState("");
  const [toilet, setToilet] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location.pathname.split("/")[2];
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState(null);
  const handleImg = (e) => {
    const selectImg = e.target.files;
    const selectedImg = Array.from(selectImg);
    const ImgArr = selectedImg.map((image) => {
      return URL.createObjectURL(image);
    });
    setImg(ImgArr);
  };
  const deleteProduct = async () => {
    dispatch(DeleteStart());
    try {
      const res = await userRequest.delete("/products/" + id);
      if (res.data) {
        navigate("/product");
      }
      dispatch(DeleteSuccess(res.data));
    } catch (error) {
      dispatch(DeleteFailure);
      console.log(error);
    }
  };
  const handleInput = (e) => {
    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
        type: [
          {
            bedroom: bed,
            toilet: toilet,
          },
        ],
      };
    });
  };
  const addProduct = async () => {
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
            dispatch(UpadateStart());
            try {
              const res = await userRequest.put(`/products/${id}`, {
                ...input,
                img: downloadURL,
              });
              dispatch(UpdateSuccess(res.data.updatedProduct));
              toast.success(res.data.message);
              if (res.data.message) {
                setEdit(false);
                navigate("/product");
              }
            } catch (error) {
              dispatch(UpdateFailure());
            }
          });
        }
      );
    } else {
      try {
        const res = await userRequest.put(`/products/${id}`, {
          ...input,
        });
        dispatch(UpdateSuccess(res.data.updatedProduct));
        toast.success(res.data.message);
        if (res.data.message) {
          setEdit(false);
          navigate("/product");
        }
      } catch (error) {
        dispatch(UpdateFailure());
      }
    }
  };
  console.log(input);
  return (
    <div>
      <Navbar name="prdouct info" open={open} setOpen={setOpen} />
      <div className="container">
        <div className="addProduct">
          {/* eslint-disable-next-line */}
          <button
            className="delete"
            onClick={(e) => {
              e.preventDefault();
              deleteProduct();
            }}
          >
            delete
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setEdit(!edit);
            }}
          >
            edit
          </button>
        </div>
      </div>
      <ProductInfoInner />
      {edit ? (
        <div className="edit-product-bg">
          <div className="container">
            <div className="edit-product-close">
              <CloseIcon
                onClick={(e) => {
                  e.preventDefault();
                  setEdit(!edit);
                }}
              />
            </div>
            <div className="edit-product-body">
              <form className="updateForm">
                <div className="updateForm-left">
                  <div className="userUpdateBox">
                    <label>product name</label>
                    <input
                      type="text"
                      placeholder="Product Name"
                      name="name"
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="userUpdateBox">
                    <label>amount</label>
                    <input
                      type="Number"
                      placeholder="Amount"
                      name="amount"
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="userUpdateBox">
                    <label>location</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="Location"
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="userUpdateBox">
                    <label>full address</label>
                    <input
                      type="text"
                      name="fullAddress"
                      placeholder="Full Address"
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="userUpdateBox">
                    <label>size</label>
                    <input
                      type="text"
                      name="size"
                      placeholder="Size"
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="userUpdateBox">
                    <label>description</label>
                    <input
                      type="text"
                      name="description"
                      placeholder="Description"
                      onChange={(e) => handleInput(e)}
                    />
                  </div>
                  <div className="userUpdateBox">
                    <label>bedroom</label>
                    <input
                      type="text"
                      name="bedroom"
                      placeholder="Bedroom Available"
                      onChange={(e) => {
                        handleInput(e);
                        setBed(e.target.value);
                      }}
                    />
                  </div>
                  <div className="userUpdateBox">
                    <label>toilets</label>
                    <input
                      type="text"
                      name="toilet"
                      placeholder="Toilets Available"
                      onChange={(e) => {
                        handleInput(e);
                        setToilet(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="updateForm-right">
                  <div className="user-pic-update">
                    {img.map((item) => (
                      <img
                        key={item}
                        src={item}
                        alt="#"
                        className="user-pic-img-update"
                      />
                    ))}

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
                      addProduct();
                    }}
                  >
                    update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Productinfo;
