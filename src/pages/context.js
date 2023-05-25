import React, { useState, useContext, useReducer, useEffect } from "react";

import reducer from "./reducer";

const AppContext = React.createContext();
const initialState = {
  signup: 1,
  name: "",
  email: "",
  password: "",
  email2: "",
  name2: "",
  data: {},
  req: 0,
  user_data: {},
  profile_view: 0,
  goptions: [],
  lat: 0,
  lon: 0,
  polygon_id: "",
  // obj: [],
  loadProfile: 1,
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setName = (e) => {
    console.log("I'm setting the name");
    dispatch({ type: "setName", payload: e });
  };
  const setEmail = (e) => {
    console.log("I'm setting the email");
    dispatch({ type: "setEmail", payload: e });
  };
  const setPassword = (e) => {
    console.log("I'm setting the password");
    dispatch({ type: "setPassword", payload: e });
  };
  const setEmail2 = (e) => {
    console.log("I'm setting the name");
    dispatch({ type: "setEmail2", payload: e });
  };
  const setName2 = (e) => {
    console.log("I'm setting the name");
    dispatch({ type: "setName2", payload: e });
  };
  const setReq = (e) => {
    console.log("Request is being sent");
    dispatch({ type: "setReq", payload: e });
  };
  const setData = (e) => {
    console.log("The data is being received");
    dispatch({ type: "setData", payload: e });
  };
  const setUserData = (e) => {
    console.log("The user data is being set");
    dispatch({ type: "setUserData", payload: e });
  };
  const setProfileView = (e) => {
    console.log("User profile is being shown");
    dispatch({ type: "setProfileView", payload: e });
  };
  const setOptions2 = (e) => {
    dispatch({ type: "setOptions", payload: e });
  };
  const setLat = (e) => {
    dispatch({ type: "setLat", payload: e });
  };
  const setLon = (e) => {
    dispatch({ type: "setLon", payload: e });
  };
  const setId = (e) => {
    console.log("Id is being set");
    dispatch({ type: "setId", payload: e });
  };
  const setObj = (e) => {
    dispatch({ type: "setObj", payload: e });
  };
  const setLoading = (e) => {
    console.log("I set loading");
    dispatch({ type: "setLoading", payload: e });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        setName,
        setEmail,
        setPassword,
        setEmail2,
        setName2,
        setReq,
        setData,
        setUserData,
        setOptions2,
        setLat,
        setLon,
        setId,
        setObj,
        setLoading,
      }}
    >
      {/* returning an object is allowed from context to get a global value */}
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
