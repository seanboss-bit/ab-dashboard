import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { userRequest } from "../requestMethods";
import { toast } from "react-toastify";

const AddForm = () => {
  const [input, setInput] = useState({});
  const [bed, setBed] = useState("");
  const [toilet, setToilet] = useState("");
  const [file, setFile] = useState(null);
  const [interior, setInterior] = useState([]);
  const [urls, setUrls] = useState([]);
  const FrontImg = Array.from(interior);
  const [mainImg, setMainImg] = useState("");
  const handleChange = (e) => {
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
  const addProduct = () => {
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setMainImg(downloadURL);
        });
      }
    );
  };
  const uploadMultiple = () => {
    // eslint-disable-next-line
    FrontImg.map((image) => {
      const nameUpdate = new Date().getTime() + image?.name;
      const storage = getStorage(app);
      const StorageRef = ref(storage, nameUpdate);
      const uploadTask = uploadBytesResumable(StorageRef, image);

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
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrls((prev) => [...prev, downloadURL]);
          });
        }
      );
    });
  };

  const addNewProduct = async () => {
    addProduct();
    uploadMultiple();
    try {
      const res = await userRequest.post("/products", {
        img: mainImg,
        ...input,
        interior: urls,
      });
      toast.success(res.data.message);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container">
        <div className="add-form">
          <form
            className="inner-add"
            onSubmit={(e) => {
              e.preventDefault();
              addNewProduct();
            }}
          >
            <div className="inner-add-box">
              <p>main image</p>
              <input
                type="file"
                name="img"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>
            <div className="inner-add-box">
              <p>name</p>
              <input
                type="input"
                name="name"
                placeholder="Enter Product Name"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="inner-add-box">
              <p>location</p>
              <input
                type="input"
                name="location"
                placeholder="Enter Location"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="inner-add-box">
              <p>full address</p>
              <input
                type="input"
                name="fullAddress"
                placeholder="Enter Full Address"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="inner-add-box">
              <p>bedroom available</p>
              <input
                type="input"
                placeholder="Enter Number Of Bedrooms"
                onChange={(e) => setBed(e.target.value)}
              />
            </div>
            <div className="inner-add-box">
              <p>toilet available</p>
              <input
                type="input"
                placeholder="Enter Number Of Toilets"
                onChange={(e) => setToilet(e.target.value)}
              />
            </div>
            <div className="inner-add-box">
              <p>amount</p>
              <input
                type="number"
                name="amount"
                placeholder="Enter Product Amount"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="inner-add-box">
              <p>description</p>
              <textarea
                name="description"
                placeholder="Enter Product Description"
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
            <div className="inner-add-box">
              <p>size</p>
              <input
                name="size"
                type="number"
                placeholder="Enter Product size"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="inner-add-box">
              <p>interior images</p>
              <input
                multiple
                type="file"
                onChange={(e) => {
                  setInterior(e.target.files);
                }}
              />
            </div>
            <input type="submit" value="add Product" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
