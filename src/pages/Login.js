import React, { Component, useState } from "react";
import Navbar from "./Navbar.js";
import Form from "./Form.js";
import { Route } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading.js";
import { useGlobalContext } from "./context.js";

const Login = (props) => {
  let signup = props.signup;
  let setSignup = props.setSignup;
  const [show, setShow] = useState(0);
  const [show2, setShow2] = useState(0);
  const [password, setPassword] = useState("");
  const { email, setEmail } = useGlobalContext();
  const { name, setName } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      console.log("Error");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND}/user/login`,
        { email, password },
        config
      );
      console.log(data);
      setEmail(data.email);
      setName(data.name);
      console.log("Login Successful");
      localStorage.setItem("user", JSON.stringify(data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Wrong Password");
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="frst-div">
      <button
        className="but"
        onClick={() => {
          let s = 1;
          setSignup(1);
        }}
      >
        Signup
      </button>
      <button
        className="but"
        onClick={() => {
          let s = 0;
          setSignup(s);
        }}
      >
        Login
      </button>
      <input
        placeholder="Enter your email"
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <input
        placeholder="Enter your password"
        type={show2 ? "text" : "password"}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></input>
      <button
        className="but"
        onClick={() => {
          setShow2(!show2);
        }}
      >
        {show2 ? "Hide" : "Show"}
      </button>
      <input type="submit" onClick={submitHandler}></input>
    </div>
  );
};

export default Login;