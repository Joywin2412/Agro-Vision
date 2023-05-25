// This will be the actual login/signup page required for authorization and security;
import React, { Component, useState, useEffect } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Navbar from "./Navbar.js";
import Form from "./Form.js";
import { Route } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./context.js";
import Loading from "./Loading.js";

const Sign = (props) => {
  let signup = props.signup;
  let setSignup = props.setSignup;
  const { name, email, setName, setEmail } = useGlobalContext();
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(0);
  const [show2, setShow2] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [rem, setRem] = useState(0);
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState("");
  const fetchLocation = async () => {};

  const submitHandler = async () => {
    console.log("What");
    setLoading(true);
    if (!name || !email || !password || !confirmPassword || !phone) {
      console.log("Error");
      return;
    }
    if (password !== confirmPassword) {
      console.log("Write the right passwords");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND}/user`,
        { name, email, password, phone, lat, lon, address },
        config
      );
      console.log("Registration successful");
      localStorage.setItem("user", JSON.stringify(data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLocation();
  }, [rem]);
  if (loading) {
    return <Loading />;
  } else {
    console.log(process.env.REACT_APP_BACKEND);
    return (
      <div className="frst-div">
        <button
          className="but "
          onClick={() => {
            let s = 1;
            setSignup(s);
          }}
        >
          {" "}
          Signup
        </button>
        <button
          className="but "
          onClick={() => {
            let s = 0;
            setSignup(s);
          }}
        >
          {" "}
          Login
        </button>
        <br />
        <br />

        <input
          type="text"
          placeholder=" Enter your name "
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>

        <input
          type="text"
          placeholder=" Enter your email "
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>

        <input
          placeholder="  Enter your password  "
          type={show ? "text" : "password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button
          className="but"
          onClick={() => {
            setShow(!show);
          }}
        >
          {" "}
          {show ? "Hide" : "Show"}
        </button>

        <br />
        <br />

        <input
          placeholder="  Confirm your password  "
          type={show2 ? "text" : "password"}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        ></input>
        <button
          className="but"
          onClick={() => {
            setShow2(!show2);
          }}
        >
          {" "}
          {show2 ? "Hide" : "Show"}
        </button>
        <input
          placeholder="Enter your Complete Address"
          type="text"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        ></input>
        <br />
        <br />

        <input
          placeholder="Enter your phone"
          type="text"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        ></input>

        <br />
        <br />
        <input type="submit" onClick={submitHandler}></input>
      </div>
    );
  }
};

export default Sign;

// Issue : The issue is the inputs are overlapping and not remaining in their own state. A workaround is making
// them as a children. Issue is solved overall however we need to store the data it has already writtend
