import React, { Component, useState, useEffect, useId } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Navbar from "./Navbar.js";
import Form from "./Form.js";
import { Route, Link } from "react-router-dom";
// import Home from "./pages/Home.js";
import { useGlobalContext } from "./context.js";
import axios from "axios";
import Loading from "./Loading.js";
import "./FarmSection.css";
// import videos from "./videos/video-3.mp4";
import Card from "./Card";
import Footer from "./Footer.js";
import "./form.css";
import Develop from "./develop.js";
const Home = () => {
  const [toggle, setToggle] = useState(0);
  // const [toggle2, setToggle2] = useState(0);
  const [form, setForm] = useState(0);
  const [profile, setProfile] = useState(1);
  const { lon, setLon } = useGlobalContext();
  const { lat, setLat } = useGlobalContext();
  let t1, t2;
  const { name, email, name2, email2, setName, setEmail } = useGlobalContext();
  const [rem, setRem] = useState(0);
  const { polygon_id, setId } = useGlobalContext();
  const [loading, setLoading] = useState(1);
  const [found, setFound] = useState(0);
  const [done, setDone] = useState(0);
  const [lat1, setLat1] = useState(0);
  const [lat2, setLat2] = useState(0);
  const [lat3, setLat3] = useState(0);
  const [lat4, setLat4] = useState(0);
  const [lon1, setLon1] = useState(0);
  const [lon2, setLon2] = useState(0);
  const [lon3, setLon3] = useState(0);
  const [lon4, setLon4] = useState(0);
  const [button, setButton] = useState(0);
  let id = useId();
  // let found = false;
  const fetchLocation = async () => {
    let lat_now, lon_now, name, email, accesstoken;

    let lat11, lat12, lat13, lat14, lon11, lon12, lon13, lon14;
    const loggedInUser = localStorage.getItem("user");
    // var accesstoken;
    // let name,email;
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      accesstoken = foundUser.token;
      name = foundUser.name;
      email = foundUser.email;
    }
    if (!email) {
      // if ("geolocation" in navigator) {
      //   navigator.geolocation.getCurrentPosition(
      //     function success(position) {
      //       setLat(position.coords.latitude);
      //       setLon(position.coords.longitude);
      //       localStorage.setItem(
      //         "latitudes",
      //         JSON.stringify({
      //           lat: position.coords.latitude,
      //           lon: position.coords.longitude,
      //         })
      //       );
      //       setRem(1);
      //     },

      //     function error(error_message) {
      //       console.error(
      //         "An error has occured while retrieving location",
      //         error_message
      //       );
      //     }
      //   );
      // } else {
      //   console.log("geolocation is not enabled on this browser");
      // }
      setLat(25.5908);
      setLon(85.1348);
      localStorage.setItem(
        "latitudes",
        JSON.stringify({
          lat: 25.5908,
          lon: 85.1348,
        })
      );
    } else {
      const loggedInUser = localStorage.getItem("user");
      // var accesstoken;
      // let name,email;
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        accesstoken = foundUser.token;
        name = foundUser.name;
        email = foundUser.email;
      }
      try {
        let s2 = `${process.env.REACT_APP_BACKEND}/user/address`;
        const requestOptions = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accesstoken}`,
          },
        };
        const d_now = await axios.post(s2, { email }, requestOptions);
        // console.log(d_now);

        try {
          let s1 = `${process.env.REACT_APP_API}/${d_now.data.address}.json?key=${process.env.REACT_APP_WEATHER_API_KEY}`;

          const requestOptions = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const d = await axios.get(s1, requestOptions);
          console.log(d);
          lat_now = d.data.results[0].position.lat;
          lon_now = d.data.results[0].position.lon;
          localStorage.setItem(
            "latitudes",
            JSON.stringify({
              lat: lat_now,
              lon: lon_now,
            })
          );
          setLat(d.data.results[0].position.lat);
          setLon(d.data.results[0].position.lon);
          // call an api to update the lat and lon of the user
          try {
            const requestOptions = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accesstoken}`,
              },
            };
            let s2 = `${process.env.REACT_APP_BACKEND}/user/location`;
            console.log(s2, lat_now, lon_now);
            const d2 = await axios.post(
              s2,
              { email, lat_now, lon_now },
              requestOptions
            );
          } catch (err) {
            console.log(err);
          }
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        console.log(err);
      }
    }
    // console.log(lat, lon);
    if (true) {
      let a = Math.sqrt((1500 * 4) / Math.sqrt(3));
      console.log(a);
      let b = (Math.sqrt(3) / 2) * a;
      b /= 1000;
      // console.log(b);

      setLat1(lat_now - b * Math.cos(45));
      lat11 = lat_now - b * Math.cos(45);
      lon11 = lon_now - b * Math.sin(45);

      setLon1(lon_now - b * Math.sin(45));
      // console.log(lon_now, lat_now);

      setLat2(lat_now + b * Math.cos(45));
      lat12 = lat_now + b * Math.cos(45);
      setLon2(lon_now - b * Math.sin(45));
      lon12 = lon_now - b * Math.sin(45);

      setLat3(lat_now + b * Math.cos(45));
      lat13 = lat_now + b * Math.cos(45);
      setLon3(lon_now + b * Math.sin(45));
      lon13 = lon_now + b * Math.sin(45);

      setLat4(lat_now - b * Math.cos(45));
      lat14 = lat_now - b * Math.cos(45);
      setLon4(lon_now + b * Math.sin(45));
      lon14 = lon_now + b * Math.sin(45);
      setDone(1);
      console.log(done);
    }
    // second api call
    console.log("I'm searching for a polygon");
    let s1 = `${process.env.REACT_APP_BACKEND}/user/polygon`;
    let requestOptions = {
      method: "post",
      url: s1,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    console.log(name, email, lat, lon);
    let val = JSON.stringify({
      name: name,
      email: email,
      lat: lat_now,
      lon: lon_now,
    });
    console.log(val);
    let p = 0;
    try {
      const d = await axios.post(s1, val, requestOptions);
      console.log(d);
      if (d.data.length === 4) {
        setId(d.data.Polygon_id);
        localStorage.setItem(
          "polygon",
          JSON.stringify({ polygon_id: d.data.Polygon_id })
        );
        console.log(polygon_id);
        setLoading(false);
      } else if (d.data === "Failed") {
        console.log("The data failed and it is a new polygon");
        p = 1;
      } else {
        console.log(d.data.Polygon_id);
        setId(d.data.Polygon_id);
        localStorage.setItem(
          "polygon",
          JSON.stringify({ polygon_id: d.data.Polygon_id })
        );
        console.log(polygon_id);
        // call an api here inorder to show friends
        // console.log(d.data.Polygon_id);
        // console.log("I found the polygon_id and it is inside the polygon");
      }
    } catch (err) {
      console.log(err);
    }
    if (p) {
      let s2 = `${process.env.REACT_APP_BACKEND}/user/polygonData`;

      console.log(id);
      id += email;
      setId(id);
      const val2 = JSON.stringify({
        name: name,
        email: email,
        polygon_id: id,
        lat1: lat11,
        lat2: lat12,
        lat3: lat13,
        lat4: lat14,
        lon1: lon11,
        lon2: lon12,
        lon3: lon13,
        lon4: lon14,
      });
      console.log("polydon data ", val2);
      try {
        const d2 = await axios.post(s2, val2, requestOptions);
        localStorage.setItem(
          "polygon",
          JSON.stringify({ polygon_id: d2.data.Polygon_id })
        );
      } catch (err) {}
    }
    setLoading(false);
  };

  // const polygonFinder = async () => {};

  useEffect(() => {
    setLoading(1);
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser);
      setName(foundUser.name);
      setEmail(foundUser.email);
    }
    fetchLocation();
  }, []);

  if (name) {
    t1 = name;
    t2 = email;
  } else if (name2) {
    t1 = name2;
    t2 = email2;
  }
  if (loading) return <Loading />;
  if (!loading) {
    if (profile) {
      return (
        <div>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap"
            rel="stylesheet"
          ></link>
          <Navbar profile={profile} setProfile={setProfile} show={1} />
          {/* <p> This is a farmer app</p> */}
          <div className="farm-container">
            <h1>AGRO VISION</h1>
            <p className="agro-para">
              Work smarter and not harder with our real time dashboard
            </p>
          </div>
          <div className="form-div">
            {/* <p> This is a farmer app</p> */}
            <div className="btns">
              <button
                style={{ width: "250px" }}
                onClick={() => {
                  setToggle(1);
                }}
                className="btn-1 but"
              >
                Get Started
              </button>
              <button
                style={{ width: "250px" }}
                className="btn-2 but"
                onClick={() => {
                  setToggle(2);
                }}
              >
                {" "}
                Livestock{" "}
              </button>
            </div>

            {toggle === 1 ? <Form form={form} setForm={setForm} /> : null}
            {toggle === 2 ? <Develop></Develop> : ""}
          </div>
          <div className="first">
            <Card />
            <Footer />
          </div>
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
  } else {
    return <Loading />;
  }
};

export default Home;

// function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
// var R = 6378.137; // Radius of earth in KM
// var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
// var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
// var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
// Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
// Math.sin(dLon/2) * Math.sin(dLon/2);
// var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
// var d = R * c;
// return d * 1000; // meters
// }

//  //Position, decimal degrees
//  lat = 51.0
//  lon = 0.0

//  //Earth’s radius, sphere
//  R=6378137

//  //offsets in meters
//  dn = 100
//  de = 100

//  //Coordinate offsets in radians
//  dLat = dn/R
//  dLon = de/(R*Cos(Pi*lat/180))

//  //OffsetPosition, decimal degrees
//  latO = lat + dLat * 180/Pi
//  lonO = lon + dLon * 180/Pi
