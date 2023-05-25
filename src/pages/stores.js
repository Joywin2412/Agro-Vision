import React, { Component, useState, useEffect } from "react";
// import "./App.css";
import { Route, Link, NavLink, Await } from "react-router-dom";
import { useGlobalContext } from "./context.js";
import axios from "axios";
import data from "./datacrops.js";
import Loading from "./Loading.js";
import {
  // icon,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polygon,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";

function Stores({ flag }) {
  const [lat1, setLat1] = useState([]);
  const [lon1, setLon1] = useState([]);
  const [loading, setLoading] = useState(1);
  const { lat, lon, setLat, setLon } = useGlobalContext();
  const [name, setName] = useState([]);
  const [address, setAddress] = useState([""]);
  console.log(flag);
  useEffect(() => {
    setLoading(1);
    const location = localStorage.getItem("latitudes");
    let lat_now, lon_now;
    if (location) {
      const foundLocation = JSON.parse(location);
      // console.log(foundLocation);
      lat_now = foundLocation.lat;
      setLat(foundLocation.lat);
      lon_now = foundLocation.lon;
      setLon(foundLocation.lon);
    }
    if (flag === 0) {
      let lat2 = [];
      let lon2 = [];
      let na = [];
      let add = [];
      setLoading(1);
      axios
        .get(
          `https://api.tomtom.com/search/2/poiSearch/farmers%20%market.json?key=UiYgyrE8umErv77zmFuNaEDQRWejRbiz&lat=${lat_now}&lon=${lon_now}&countrySet=IN`
        )
        .then((res) => {
          if (res) {
            res.data.results.map((curr_val, curr_idx) => {
              lat2.push(curr_val.position.lat);
              lon2.push(curr_val.position.lon);
              na.push(curr_val.poi.name);
              add.push(curr_val.address.freeformAddress);
            });
          }
          setName(na);
          setLat1(lat2);
          setLon1(lon2);
          setAddress(add);
          setLoading(0);
        });
    } else if (flag === 1) {
      let lat2 = [];
      let lon2 = [];
      let na = [];
      let add = [];
      setLoading(1);
      axios
        .get(
          `https://api.tomtom.com/search/2/poiSearch/Agricultural%20%supplies.json?key=UiYgyrE8umErv77zmFuNaEDQRWejRbiz&lat=${lat}&lon=${lon}&countrySet=IN`
        )
        .then((res) => {
          console.log(res);
          res.data.results.map((curr_val, curr_idx) => {
            lat2.push(curr_val.position.lat);
            lon2.push(curr_val.position.lon);
            na.push(curr_val.poi.name);
            add.push(curr_val.address.freeformAddress);
          });
          setName(na);
          setLat1(lat2);
          setLon1(lon2);
          setAddress(add);
          setLoading(0);
        });
    } else {
      setLoading(0);
    }
  }, [flag]);

  if (loading) return <Loading />;
  else if (flag === 1 || flag === 0) {
    return (
      <div>
        <ul>
          {name.map((curr_val, curr_idx) => {
            console.log(curr_val);
            console.log(lat1[curr_idx]);
            return (
              <li style={{ listStyleType: "Bullet" }}>
                <span style={{ color: "#f0bb62" }}>{curr_val} </span>
                <pre> </pre> the latitude is {lat1[curr_idx]} and longitude{" "}
                {lon1[curr_idx]} Address is <pre> </pre>{" "}
                <span style={{ color: "green" }}> {address[curr_idx]}</span>
              </li>
            );
          })}
        </ul>
        {console.log("this", lat, lon)}
        <MapContainer style={{ margin: "100px" }} center={[lat, lon]} zoom={12}>
          <Marker position={[lat, lon]}>
            <Popup>You</Popup>
          </Marker>
          {name.map((curr_val, curr_idx, arr) => {
            let f1 = parseFloat(lat1[curr_idx]);
            let f2 = parseFloat(lon1[curr_idx]);
            return (
              <Marker position={[f1, f2]}>
                {console.log(f1, f2, curr_val)}
                <Popup>
                  <p>
                    {curr_val} {address[curr_idx]}
                  </p>
                </Popup>
              </Marker>
            );
          })}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    );
  } else return <div></div>;
}

export default Stores;

// Local storage added
