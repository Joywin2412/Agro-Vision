import React, { Component, useState } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Navbar from "./Navbar.js";
import Forms from "./Forms.js";
import Data from "./Data.js";
import Soilcrop from "./soilcrop.js";
import { Optimal } from "./soilcrop.js";
import "./form.css"
function Form(props) {
  console.log(props);
  const [data, setData] = useState([]);
  const elements = ["Yield", "Cost", "Soil Health"];
  const [Submit, setSubmit] = useState(1);
  const [options, setOptions] = useState([]);
  console.log(props);
  const handleClick = (e) => {
    console.log(e.target.id);
    const newData = elements.filter((item, index) => {
      return e.target.id - 1 != index;
    });
    setData(newData);
    console.log(newData);
  };
  const Opt = () => {
    return <Optimal />;
  };
  if (props.form == 0) {
    return (
      <div className="form">
        <button className="but"
        style={{display: "block",margin: "0 auto",width:"350px",marginTop:"50px", backgroundColor:"#5F7464" }}
          onClick={() => {
            props.setForm(1);
          }}
        >
          Check Best Crops for Your region
        </button>
        <Forms
          form={props.form}
          setForm={props.setForm}
          Submit={1}
          options={options}
          setOptions={setOptions}
        >
          {" "}
        </Forms>
      </div>
    );
  } else {
    if (props.form == 1) return <Optimal />;
    else return <Soilcrop options={options} />;
  }
}
// Updates : Background image to be added
// States must be 0,0 : 0,1 : 1,0
// Input types is being done checkbox so that other input gets disappeared when clicking on the current input and others coming down
// Advanced : useRef hook for storing
// https://home.agromonitoring.com/auth/sign-up/
export default Form;
