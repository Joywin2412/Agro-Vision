import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";
// import logo from "./logo.svg";
// import './App.css';
// API FETCHING AND BACKEND WORK
function Forms(props) {
  // const [data, setData] = useState({});
  const { data, setData } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const { req, setReq } = useGlobalContext();
  const { polygon_id } = useGlobalContext();
  console.log(props);
  const fetchData = async () => {
    // const data = await axios.get("${process.env.REACT_APP_BACKEND}");
    // // running two server simulatenously and getting data
    // console.log(data);

    // const d = await axios.get(
    //   `http://api.agromonitoring.com/agro/1.0/soil?polyid=${polygon_id}&appid=863907a813986c6e76027bccf3b148e3`
    // );
    console.log(polygon_id);
    // console.log(d.data);
    // setData(d.data);
    setReq(0);
    setLoading(false);
  };

  useEffect(() => {
    if (req == 1) fetchData();
  }, []);
  if (loading && req != 0) {
    return <h1> Loading... </h1>;
  } else {
    return (
      <div>
        <p>
          The soil temperature is as follows {data.t0 - 273} and at depth ten is{" "}
          {data.t10 - 273}
        </p>
        <button
          onClick={() => {
            console.log("Pressed");
            props.setForm(0);
          }}
        >
          Go Back
        </button>
      </div>
    );
  }
}

export default Forms;
