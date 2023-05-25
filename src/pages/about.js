import React, { Component, useState, useEffect } from "react";
// import logo from "./logo.svg";
// import "./App.css";
import Navbar from "./Navbar.js";
import { Route, Link } from "react-router-dom";
import { useGlobalContext } from "./context.js";
import Footer from "./Footer.js";
import img1 from "./images/abt1.png";
import img2 from "./images/abt2.jpg";
const Home = () => {
  const [profile, setProfile] = useState(1);
  let t1, t2;
  const { name, email, name2, email2, setName, setEmail } = useGlobalContext();
  console.log(name, name2);
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
  if (name) {
    t1 = name;
    t2 = email;
  }
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
        <section className="about-section" style={{ backgroundColor: "#f0f0f0", padding: "50px 0" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="about-image-container">
                <img src={img1} alt="About Image 1" className="about-image1" style={{ width: "100%", height: "auto" ,marginTop:"100px" }} />
              </div>
            </div>
            <div className="col-md-6" style={{ marginTop:"100px" }}>
              <div className="about-description-container">
                <p className="about-description1" style={{ fontSize: "1.2rem", lineHeight: "1.5" }}>
                  Our website is a farmer's best friend. We understand the challenges that farmers face on a daily basis, and we strive to provide them with the resources and tools they need to succeed. Our platform is designed to help farmers optimize their crop yields and minimize their costs, all while making the farming experience as enjoyable as possible.
                </p>
                <p className="about-description1" style={{ fontSize: "1.2rem", lineHeight: "1.5" }}>
                  Our comprehensive platform is packed with features that you won't find anywhere else. We offer information on the optimal temperature for a wide range of crops, as well as a detailed database of different crops that farmers can choose to grow. We provide tips and strategies for effective crop management, including information on soil quality, irrigation techniques, and pest control. Our platform also allows farmers to connect with other farmers in their area, share information about their crops and farming practices, and gain insights into the local agricultural community.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="about-features-heading" style={{ fontSize: "3rem", margin: "50px 0", textAlign: "center" ,color:"#064635"}}>Key Features</h2>
          </div>
          <div className="row">
            <div className="col-md-6 order-md-2">
              <div className="about-image-container">
                <img src={img2} alt="About Image 2" className="about-image2" style={{ width: "100%", height: "auto" ,marginBottom:"50px"}} />
              </div>
            </div>
            <div className="col-md-6 order-md-1">
              <div className="about-features-container">
                <dl className="about-features-list" style={{ fontSize: "1.2rem", lineHeight: "1.5" }}>
                 
                <dt>Optimal Temperature for Crops:</dt>
                <dd style={{color:"#7c7c7c", fontSize:"1rem"}}>We provide farmers with information about the optimal temperature for a wide range of crops, so you can grow your crops more efficiently and with greater success.</dd>
                <dt>Comprehensive Crop Database:</dt>
                <dd style={{color:"#7c7c7c", fontSize:"1rem"}}>Our platform offers a database of different crops that farmers can choose to grow, including detailed information about each crop, such as its growth cycle, ideal climate conditions, and other important factors to consider when selecting a crop.</dd>
                <dt>Tools and Resources:</dt>
                <dd style={{color:"#7c7c7c", fontSize:"1rem"}}>We offer farmers tips and strategies for effective crop management, including information on soil quality, irrigation techniques, and pest control. We also provide a range of tools and resources to help you get the most out of your farming experience.</dd>
                <dt>Connect with Other Farmers:</dt>
                <dd style={{color:"#7c7c7c", fontSize:"1rem"}}>Our platform allows farmers to connect with other farmers in their area, share information about their crops and farming practices, and gain insights into the local agricultural community. We believe that collaboration is key to success in farming, and our platform makes it easy to connect with like-minded individuals who share your passion.</dd>


                  </dl>
                </div>
              </div>
            </div>
          </div>

        </section>
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
};

export default Home;