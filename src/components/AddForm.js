import React from "react";

const AddForm = () => {
  return (
    <div>
      <div className="container">
        <div className="add-form">
          <form className="inner-add">
            <div className="inner-add-box">
              <p>main image</p>
              <input type="file" />
            </div>
            <div className="inner-add-box">
              <p>name</p>
              <input type="input" placeholder="Enter Product Name" />
            </div>
            <div className="inner-add-box">
              <p>location</p>
              <input type="input" placeholder="Enter Location" />
            </div>
            <div className="inner-add-box">
              <p>full address</p>
              <input type="input" placeholder="Enter Full Address" />
            </div>
            <div className="inner-add-box">
              <p>bedroom available</p>
              <input type="input" placeholder="Enter Number Of Bedrooms" />
            </div>
            <div className="inner-add-box">
              <p>toilet available</p>
              <input type="input" placeholder="Enter Number Of Toilets" />
            </div>
            <div className="inner-add-box">
              <p>amount</p>
              <input type="number" placeholder="Enter Product Amount" />
            </div>
            <div className="inner-add-box">
              <p>description</p>
              <textarea placeholder="Enter Product Description"></textarea>
            </div>
            <div className="inner-add-box">
              <p>size</p>
              <input type="input" placeholder="Enter Product size" />
            </div>
            <div className="inner-add-box">
              <p>inner pictures</p>
              <input type="file" multiple placeholder="Enter Product size" />
            </div>
            <input type="submit" value="add Product"/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
