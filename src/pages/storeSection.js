import React, { Component, useState, useEffect } from "react";
import Navbar from "./Navbar.js";
import { MapContainer, Marker, Popup, TileLayer, Polygon } from "react-leaflet";
import { useNavigate } from "react-router-dom";
// import { MapContainer, Marker, Popup, TileLayer, Polygon } from "react-leaflet";
import Stores from "./stores.js";
import Footer from "./Footer.js";

function Storesmap() {
  const [flag, setFlag] = useState(3);
  const [profile, setProfile] = useState(0);
  console.log(flag);
  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap"
        rel="stylesheet"
      ></link>
      <Navbar profile={profile} setProfile={setProfile} show={1} />
      <div style={{marginLeft:"50px"}}>
      <button className="but"
      style={{backgroundColor:"#0F6292",marginTop:"50px",marginBottom:"50px"}}
        onClick={() => {
          setFlag(0);
        }}
      >
        Click Here to see All Farmer Markets nearby
      </button>
      <button className="but"
      style={{backgroundColor:"#0F6292",marginTop:"50px",marginBottom:"50px"}}
        onClick={() => {
          setFlag(1);
        }}
      >
        Click Here to see Stores for Agricultural Supplies
      </button>
      <Stores flag={flag} />
      </div>
      <br/><br/><br/>
      <Footer/>
    </div>
  );
}

export default Storesmap;
