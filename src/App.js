import React, { Component, useState } from "react";
import { useGlobalContext } from "./pages/context";
import Navbar from "./pages/Navbar.js";
import Form from "./pages/Form.js";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import Home2 from "./pages/Home2.js";
import Profile from "./pages/profile.js";
import About from "./pages/about.js";
import Weather from "./pages/weather.js";
import UserProfile from "./pages/otherprofile.js";
import Crops from "./pages/localcrops.js";
import Stores from "./pages/storeSection.js"
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Home2 />} />
        <Route path="/" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="/profile/:name2" element={<UserProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/localcrops" element={<Crops />} />
        <Route path="/StoreSection" element={<Stores />} />
      </Routes>
    </div>
  );
}
export default App;

// All that remains is backend by making security and authorization ✅, api fetch , route setup ✅ , backend database ✅ then we are done
// Goverment policies what you are eligible for ❌
// End : Language , Dark mode
// Major Crops to be added based on google cloud / google maps and get info from wiki ✅
// Issues : Get started loading the api again and again and make a return to the form.Issue solved. ✅
// Issues : Setting up the whole route so as to access the links and to navigate the website. ✅
// Feature : To give profiles which will have a link to the profile ✅
// Whoever sends the request from the login/signup will be shown. Change the global state ✅
// The issue of the data reloading after the componenet is mounted onto the website. ✅
// Main thing to do is fetching data from api using polygon ✅
// Friends feature which will involed profile seeing ✅
// Getting the address of the user which is latitude or longitude ✅
// One big issue is the api taking a lot of time to update the sattelite data
// Other feature is adding friends ✅ and checking what other farmers are doing in their polygon. Which has to be implemented in the login page.
// Weather forecast is available ✅
// Also adding cookies in the website which will remember the login ✅
// Centroid idea of polygon and grouping polygon is now possible. Made a relational data model to store name and poly_id ✅
// Custom navbar whose work for other profile is to useNavigate to profile. And other navbar for profile will be redundant ✅
// Make a new api keys in a new file
// Yield cost and soil health
// Amazing idea is to get map from api and then color it based on the user submissions and can be done with the current api ✅
// Use callback and use memo hook implementation 🏴
// To do something abotu guest login and that use can see the layout of the website ✅
// Accumulative weather api to see if your crops are in dangern ❌
// Not getting accurate location as of now change that ✅
// In the stores components just fetch api and show the nearby stores and their address and lat lon for marking further which will be
// stored in a local state and distance from the user
// Mark the users who come from different location in the same polygon. Modify the user schema to do so. ✅
// Polygon's needs
// Feature : Modify the markers
// Friends feature which will involve phone feature.
// setLoading time for the map check

