import React, { Component, useEffect, useState } from "react";
import { useGlobalContext } from "./context";
import Navbar from "./Navbar";
import axios from "axios";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";
import Forms from "./Forms";
import "./profile.css";

// Implementing a new feature where if userData is not there if someone tries to navigate on someone else's profile show it
function Profile() {
  // const { polygon_id, name } = useGlobalContext();
  const { userData } = useGlobalContext();
  const [profile, setProfile] = useState(1);
  const { name, email, setName, setEmail, polygon_id } = useGlobalContext();
  const [loading, setLoading] = useState(1);
  const { obj, setObj } = useGlobalContext();
  const [form, setForm] = useState(0);
  const [phone, setPhone] = useState("");
  const [Submit, setSubmit] = useState(0);
  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState([]);
  const [pending, setPending] = useState([]);
  const [notif, setNotif] = useState([]);
  const [hashNotif, setHashNotif] = useState([]);
  const [friends, setFriends] = useState([]);
  const [hashFriends, setHashFriends] = useState([]);
  const [acc, setAcc] = useState(1);
  const navigate = useNavigate();
  const deleteHandler = async () => {
    // name,email
    let s1 = `${process.env.REACT_APP_BACKEND}/user/delete`;
    // console.log(polygon_id);
    setLoading(1);
    let requestOptions = {
      method: "post",
      url: s1,
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accesstoken}`,
      },
    };
    let val = JSON.stringify({
      email: email,
    });
    console.log(val);
    try {
      const d = await axios.post(s1, val, requestOptions);
      // setAcc(!acc);
      setLoading(0);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(0);
    }
  };
  const acceptHandler = async (friend_email) => {
    // update to show accepted
    console.log("accepted");
    const loggedInUser = localStorage.getItem("user");
    let myEmail;
    let accesstoken;
    // let id_now;
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      accesstoken = foundUser.token;
      myEmail = foundUser.email;
    }
    // console.log()
    let s1 = `${process.env.REACT_APP_BACKEND}/user/accept`;
    console.log(polygon_id);
    let requestOptions = {
      method: "post",
      url: s1,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    let val = JSON.stringify({
      email1: friend_email,
      email2: myEmail,
    });
    console.log(val);
    try {
      const d = await axios.post(s1, val, requestOptions);
      setAcc(!acc);
    } catch (err) {
      console.log(err);
    }
  };
  const denyHandler = async (friend_email) => {
    const loggedInUser = localStorage.getItem("user");
    let myEmail;
    let accesstoken;
    // let id_now;
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      accesstoken = foundUser.token;
      myEmail = foundUser.email;
    }
    let s1 = `${process.env.REACT_APP_BACKEND}/user/decline`;
    console.log(polygon_id);
    let requestOptions = {
      method: "post",
      url: s1,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    let val = JSON.stringify({
      email1: friend_email,
      email2: myEmail,
    });
    console.log(val);
    try {
      const d = await axios.post(s1, val, requestOptions);
      setAcc(!acc);
    } catch (err) {
      console.log(err);
    }
  };
  const clickHandler = async (friend_email) => {
    console.log("click");
    const loggedInUser = localStorage.getItem("user");
    let myEmail, accesstoken;
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser);
      myEmail = foundUser.email;
      accesstoken = foundUser.token;
    }
    setLoading(1);
    console.log(friend_email);
    let s1 = `${process.env.REACT_APP_BACKEND}/user/friendRequest`;
    // console.log(polygon_id);
    let requestOptions = {
      method: "post",
      url: s1,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    let val = JSON.stringify({
      email1: myEmail,
      email2: friend_email,
      status: "Pending",
    });
    // console.log(val);
    try {
      const d = await axios.post(s1, val, requestOptions);
      console.log(d);
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
    // api call for sending request

    let pendingLink = `${process.env.REACT_APP_BACKEND}/user/pending`;
    // console.log(polygon_id);
    requestOptions = {
      method: "post",
      url: pendingLink,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    // console.log(myEmail);
    val = JSON.stringify({
      email1: myEmail,
    });
    try {
      const d = await axios.post(pendingLink, val, requestOptions);
      // console.log(d);
      const arr = d.data;
      console.log("This is pending", arr);
      const pending2 = {};
      arr.forEach((curr_val) => (pending2[curr_val.Email2] = 1));
      setPending(pending2);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const fetchOptions = async () => {
    let name, email, accesstoken, id_now;
    const loggedInUser = localStorage.getItem("user");
    const polygonUser = localStorage.getItem("polygon");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      accesstoken = foundUser.token;
      name = foundUser.email;
      email = foundUser.email;
    }
    if (polygonUser) {
      const foundUser = JSON.parse(polygonUser);
      id_now = foundUser.polygon_id;
    }
    let s = `${process.env.REACT_APP_BACKEND}`;
    let s1 = s + `/user/options`;
    let requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    let val = JSON.stringify({
      name: name,
      email: email,
    });
    try {
      let d = await axios.post(s1, val, requestOptions);
      setShowOptions(d.data.options);

      d = await axios.post(
        s + `/user/friends`,
        JSON.stringify({
          id: id_now,
          email: email,
        }),
        requestOptions
      );
      setObj(d.data);
      localStorage.setItem("obj", JSON.stringify(d.data));

      d = await axios.post(
        s + "/user/pending",
        JSON.stringify({
          email1: email,
        }),
        requestOptions
      );
      let arr = d.data;
      const pending2 = {};
      arr.forEach((curr_val) => (pending2[curr_val.Email2] = 1));
      setPending(pending2);

      d = await axios.post(
        s + `/user/notif`,
        JSON.stringify({
          email1: email,
        }),
        requestOptions
      );
      arr = d.data;
      setNotif(arr);
      const f = {};
      arr.forEach((curr_val) => (f[curr_val.Email] = 1));
      setHashNotif(f);

      d = await axios.post(
        s + `/user/acceptList`,
        JSON.stringify({ email1: email }),
        requestOptions
      );
      arr = d.data;

      console.log("This is friends", arr);
      const notif2 = {};
      arr.forEach((curr_val) => (notif2[curr_val.Email] = 1));
      setFriends(arr);
      setHashFriends(notif2);
      localStorage.setItem("friends", JSON.stringify({ friends: notif2 }));

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(1);
    const loggedInUser = localStorage.getItem("user");
    let myEmail;
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log("This is it", foundUser);
      setName(foundUser.name);
      setEmail(foundUser.email);
      myEmail = foundUser.email;
      setPhone(foundUser.phone);
    }
    const objectData = localStorage.getItem("obj");
    if (objectData) {
      const foundData = JSON.parse(objectData);
      // console.log(foundData);
      setObj(foundData);
      // setLoading(false);
    }
    fetchOptions();
    // friendsList();

    // passing props of hashFriendsList for showing phone
    // pending list
  }, [acc]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <Navbar profile={profile} setProfile={setProfile} show={0} />
        <div className="profile-container">
          <div className="profile-card">
            <p className="stat">
              <strong>Name</strong> : {name}{" "}
            </p>
            <p className="stat">
              <strong>Email </strong>: {email}{" "}
            </p>
            <p className="stat">
              <strong>Phone</strong>: {phone}
            </p>
            <p>
              {" "}
              What crops you are growing? Help other farmers in your area by
              filling this form
            </p>
            <div
              className="forms
          "
            >
              <Forms
                form={form}
                setForm={setForm}
                Submit={0}
                options={options}
                setOptions={setOptions}
                showOptions={showOptions}
                setShowOptions={setShowOptions}
              ></Forms>
            </div>
          </div>

          <div className="friends">
            <p> Notifications</p>
            {typeof notif === "object"
              ? notif.map((curr_val, curr_idx, arr) => {
                  let s = "/profile/";
                  s += curr_val.Name;
                  return (
                    <div>
                      <Link to={s}>
                        {" "}
                        {curr_val.Name} {curr_val.Email}{" "}
                      </Link>{" "}
                      <button onClick={() => acceptHandler(curr_val.Email)}>
                        {" "}
                        ✅
                      </button>
                      <button onClick={() => denyHandler(curr_val.Email)}>
                        {" "}
                        ❌
                      </button>
                    </div>
                  );
                })
              : ""}
            <div>
              <p> Friends</p>
              {friends
                ? friends.map((curr_val, curr_idx, arr) => {
                    let s = "/profile/";
                    s += curr_val.Name;
                    return (
                      <div>
                        <Link to={s}>
                          {" "}
                          {curr_val.Name} {curr_val.Email}{" "}
                        </Link>{" "}
                      </div>
                    );
                  })
                : ""}
            </div>
            <div>
              <p> People in your area</p>
              {obj
                ? obj.map((curr_val, curr_idx, arr) => {
                    if (curr_val.Name === name) return;
                    console.log(curr_val);
                    console.log(
                      hashNotif[curr_val.Email],
                      hashFriends[curr_val.Email]
                    );
                    if (hashNotif[curr_val.Email]) return;
                    if (hashFriends[curr_val.Email]) return;
                    let s = "/profile/";
                    s += curr_val.Name;
                    return (
                      <div>
                        <Link to={s}>
                          {" "}
                          {curr_val.Name} {curr_val.Email}{" "}
                        </Link>{" "}
                        {pending[curr_val.Email] ? (
                          <button> Pending</button>
                        ) : (
                          <button
                            className="addfriend"
                            onClick={() => {
                              clickHandler(curr_val.Email);
                            }}
                          >
                            Add Friend
                          </button>
                        )}
                      </div>
                    );
                  })
                : ""}
            </div>
            <br></br>
            <br></br>
            <button
              style={{
                backgroundColor: "#064635",
                borderRadius: "5px",
                color: "#fff",
                padding: "5px 15px",
              }}
              onClick={deleteHandler}
            >
              {" "}
              Delete your account
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
