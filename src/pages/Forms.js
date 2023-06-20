import React, { Component, useState, useEffect } from "react";
// import logo from "./logo.svg";
import Data from "./Data.js";
import Data2 from "./datacrops.js";
import { useGlobalContext } from "./context.js";
import Loading from "./Loading.js";
import axios from "axios";
import "./form.css";

// import './App.css';

function Forms({
  form,
  setForm,
  Submit,
  options,
  setOptions,
  showOptions,
  setShowOptions,
}) {
  const [value, setValue] = useState(null);
  const { req, setReq } = useGlobalContext();
  const { polygon_id } = useGlobalContext();
  const { goptions, setOptions2 } = useGlobalContext();
  const [loading, setLoading] = useState(0);
  const { name, email } = useGlobalContext();

  const fetchData = async () => {
    setLoading(1);
    let s1 = `${process.env.REACT_APP_BACKEND}/user/crops`;
    const loggedInUser = localStorage.getItem("user");
    var accesstoken;
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      accesstoken = foundUser.token;
    }
    const requestOptions = {
      method: "post",
      url: s1,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    console.log(options);
    const val = JSON.stringify({
      name: name,
      email: email,
      crops: options,
    });
    // console.log(val);
    setShowOptions(options);
    try {
      const d = await axios.post(s1, val, requestOptions);
      // console.log(d);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(Submit);
    if (Submit === 0) {
    } else setLoading(0);
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (form == 0) {
    return (
      <div className="temp">
        <form>
          <label htmlFor="h1"> What type of crop do you wish to grow? </label>
          {/* <input type="text" id="h1" /> */}
          <select
            onChange={(e) => {
              let value = e.target.value;
              e.target.value = "";
              if (value === null) return;
              console.log("Changed");
              let h = options.find((val) => {
                if (val === value) {
                  return val;
                }
              });
              console.log(h);
              if (h) {
                return;
              } else {
                setOptions([...options, value]);
              }
            }}
          >
            <option hidden disable selected value></option>
            {Data2.map((curr_val, curr_idx, arr) => {
              let h = options.find((curr_val2, curr_idx, arr) => {
                return curr_val2 === curr_val.name;
              });
              // console.log(h);
              return (
                <option disabled={h ? 1 : 0}>
                  {" "}
                  {curr_val.name} {h ? "✔" : " "}{" "}
                </option>
              );
            })}
          </select>
          <br></br>
        </form>

        <div className="selected">
          {options.map((curr_val, curr_idx, arr) => {
            return (
              <div className="spacing">
                <div className="new">{curr_val} </div>
                <button
                  className="del "
                  onClick={() => {
                    console.log(curr_idx);
                    let h = options.filter((curr_val, curr_idx2, arr) => {
                      return curr_idx2 != curr_idx;
                    });
                    console.log(h);
                    setOptions(h);
                  }}
                >
                  {" "}
                  Delete{" "}
                </button>
              </div>
            );
          })}
        </div>

        <div>
          <input
            type="submit"
            onClick={(e) => {
              if (Submit) {
                e.preventDefault();
                setForm(2);
                // setReq(1);
                console.log(polygon_id);
              } else {
                // calling an api here in order to create a cropUser tuples
                fetchData();
              }
            }}
          />
        </div>

        {Submit
          ? ""
          : typeof showOptions === "object"
          ? showOptions.map((curr_val, curr_idx, arr) => {
              return <p style={{ color: "orange" }}> {curr_val}</p>;
            })
          : ""}
      </div>
    );
  }
}

export default Forms;

// “Fifty degrees is a good benchmark for cool-season crops,” Weston said. “And the soil should be 60 degrees or more for warm-weather plants like tomatoes, peppers and basil. In fact, for tomatoes it should ideally be 65 to 70.”
// https://eos.com/blog/soil-temperature/ What crop is optimal. And recommend changes to change the temperature of soil.
// I have to declare a global variable type context now;
// Next thing I wish to do is if submit is 0 then show all the options the person selected and keep modifiying it. So i will globally declare
// it 🏁
// I want to do the update operation of the crops schema later1
