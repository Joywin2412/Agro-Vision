// This will be the actual login/signup page required for authorization and security;
import React, { Component, useState, useEffect } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Navbar from "./Navbar.js";
import Form from "./Form.js";
import { Route } from "react-router-dom";
// import Home from "./pages/Home.js";
import Signup from "./Signup.js";
import Login from "./Login.js";
import "./Home.css";
import { useGlobalContext } from "./context.js";
const Home = () => {
  const [signup, setSignup] = useState(1);
  const { name, email, setName, setEmail } = useGlobalContext();
  useEffect(() => {
    // only name and email
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser);
      setName(foundUser.name);
      setEmail(foundUser.email);
    }
  }, []);
  return (
    <div className="home-container">
      <div className="home-form-container">
        <h1>Welcome</h1>
        {signup === 1 ? (
          <Signup signup={signup} setSignup={setSignup} />
        ) : (
          <Login signup={signup} setSignup={setSignup} />
        )}
      </div>
    </div>
  );
};

export default Home;

// Issue : The issue is the inputs are overlapping and not remaining in their own state. A workaround is making
// them as a children
