import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "./context";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";
import "./navbar.css";
import alisha from "./images/alisha2.0.jpg";
// import { FaCalendar } from 'react-icons/fa'
function Component({ profile, setProfile, ...props }) {
  var t1, t2;
  const { name, email, name2, email2, setName, setEmail } = useGlobalContext();
  const [loading, setLoading] = useState(0);
  const { setUserData } = useGlobalContext();
  const navigate = useNavigate();
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const clickHandler = async () => {
    // console.log(accesstoken);
    if (props.show) {
      var accesstoken;
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        accesstoken = foundUser.token;
        setName(foundUser.name);
        setEmail(foundUser.email);
        t1 = foundUser.name;
        t2 = foundUser.email;
      }

      setProfile(0);

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accesstoken}`,
          },
        };

        navigate(`/profile`);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    setLoading(1);
    var accesstoken;
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      accesstoken = foundUser.token;
      setName(foundUser.name);
      setEmail(foundUser.email);
      t1 = foundUser.name;
      t2 = foundUser.email;
    }
    setLoading(0);
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <header>
        <nav ref={navRef}>
          <a href="/">
            <img src={alisha} className="logo" alt="logo"></img>
          </a>

          <a href="/">Home</a>
          <a href="/#CARD">services</a>
          <a href="/about">About Us</a>
          {email ? (
            <button
              className="logout-btn"
              onClick={() => {
                setName("");
                setEmail("");
                localStorage.clear();
                navigate("/");
              }}
            >
              Logout
            </button>
          ) : (
            ""
          )}

          <span
            style={{ color: "red", fontSize: "10px" }}
            onClick={clickHandler}
          >
            {" "}
            {name} {email}
          </span>
          <span style={{ color: "red", fontSize: "10px" }}>
            {" "}
            {email === "" ? <Link to="/login">Login</Link> : ""}
          </span>

          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>
    </div>
  );
}

export default Component;
