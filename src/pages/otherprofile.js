import React, { Component, useEffect, useState } from "react";
import { useGlobalContext } from "./context";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";

// Implementing a new feature where if userData is not there if someone tries to navigate on someone else's profile show it
function Profile() {
  const { name2 } = useParams();
  const [loading, setLoading] = useState(1);
  const [lc_data, setData] = useState({});
  const { name, email, setName, setEmail } = useGlobalContext();
  const [profile, setProfile] = useState(1);
  const [friends, setFriends] = useState([]);
  const fetchData = async () => {
    const loggedInUser = localStorage.getItem("user");
    var accesstoken;
    let myEmail;
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      accesstoken = foundUser.token;
      myEmail = foundUser.email;
    }
    console.log("I got clicked");
    setLoading(true);
    // console.log(glob_name);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      };
      // console.log(name2);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}/user/profile/${name2}`,
        config
      );

      // setLoading(false);
      setData(data);
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }

    let acceptLink = `${process.env.REACT_APP_BACKEND}/user/acceptList`;
    // console.log(polygon_id);
    let requestOptions = {
      method: "post",
      url: acceptLink,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    // console.log(myEmail);
    let val = JSON.stringify({
      email1: myEmail,
    });
    try {
      const d = await axios.post(acceptLink, val, requestOptions);
      console.log("Friends", d);
      const arr = d.data;
      const arr2 = arr.map((curr_val, curr_idx, arr) => {
        return curr_val.Email;
      });
      // console.log("This is friends", arr);

      console.log(arr2);
      // setFriends(arr2);
      const notif2 = {};
      arr2.forEach((curr_val) => (notif2[curr_val] = 1));
      setFriends(notif2);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(1);
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <Navbar profile={profile} setProfile={setProfile} show={1} />
        <p className="others">
          <p>
            {" "}
            <span className="">Name :</span> {lc_data.name}{" "}
          </p>
          <p>
            {" "}
            <span className="">Email :</span>
            {lc_data.email}{" "}
          </p>
          {friends[lc_data.email] ? (
            <p>
              {" "}
              <span className="">Phone:</span> {lc_data.phone}{" "}
            </p>
          ) : (
            ""
          )}
        </p>
      </div>
    );
  }
}

export default Profile;

// Onclick come here and just pass the parameter
