import React, { Component, useState, useEffect } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Navbar from "./Navbar.js";
import Form from "./Form.js";
import { Route, Link } from "react-router-dom";
// import Home from "./pages/Home.js";
import axios from "axios";
import { useGlobalContext } from "./context.js";
import Loading from "./Loading.js";
import Footer from "./Footer.js";
import "./weather.css";

const Home = () => {
  const [profile, setProfile] = useState(1);
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState(0);
  const [icon, setIcon] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(1);
  const { lat, lon, setLat, setLon } = useGlobalContext();
  useEffect(() => {
    setLoading(1);
    const loggedInUser = localStorage.getItem("user");
    let name2;
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      // console.log(foundUser);
      setName(foundUser.name);
      name2 = foundUser.name;
      setEmail(foundUser.email);
    }

    let lat_now, lon_now;
    lat_now = lat;
    lon_now = lon;
    const location = localStorage.getItem("latitudes");
    // console.log(location);
    if (location) {
      const foundLocation = JSON.parse(location);
      // console.log(foundLocation);
      lat_now = foundLocation.lat;
      lon_now = foundLocation.lon;
      console.log(lat_now, lon_now);
    }
    axios
      .get(
        `https://api.agromonitoring.com/agro/1.0/weather?lat=${lat_now}&lon=${lon_now}&appid=863907a813986c6e76027bccf3b148e3`
      )
      .then((res) => {
        setTemp((res.data.main.temp - 273).toFixed(2));
        setHumidity(res.data.main.humidity);
        setDesc(res.data.weather[0].description);
        setIcon(res.data.weather[0].icon);
        setLoading(0);
      });

    // setLoading(0);
  }, []);
  let t1, t2;
  const { name, email, name2, email2, setName, setEmail } = useGlobalContext();
  console.log(name, name2, lat, lon);

  if (name) {
    t1 = name;
    t2 = email;
  }
  if (loading) return <Loading />;
  else {
    if (profile) {
          return (
        <div>
          <Navbar profile={profile} setProfile={setProfile} show={1} />
          <div className="weather-container">
            <div className="weather-icon-container">
              <img
                className="weather-icon"
                src={`https://openweathermap.org/img/w/${icon}.png`}
                alt="Weather Icon"
              />
            </div>
            <div className="weather-info-container">
              <p className="temperature-info">{temp}°C</p>
              <p className="weather-description">{desc}</p>
              <p className="humidity-info">
                Humidity: {humidity}%
              </p>
            </div>
          </div>
          <Footer/>
        </div>
      );
    } else {
      return (
        <div>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap"
            rel="stylesheet"
          ></link>
          <Navbar profile={profile} setProfile={setProfile} show={1} />
        </div>
      );
    }
  }
};

export default Home;