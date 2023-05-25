const reducer = (state, action) => {
  if (action.type === "setName") {
    // console.log(action.payload);
    const h1 = action.payload;
    return { ...state, name: h1 };
  }
  if (action.type === "setEmail") {
    const h1 = action.payload;
    return { ...state, email: h1 };
  }
  if (action.type === "setPassword") {
    const h1 = action.payload;
    return { ...state, password: h1 };
  }
  if (action.type === "setEmail2") {
    const h1 = action.payload;
    console.log(action.payload);
    return { ...state, email2: h1 };
  }
  if (action.type === "setName2") {
    const h1 = action.payload;
    return { ...state, name2: h1 };
  }
  if (action.type == "setReq") {
    const h1 = action.payload;
    return { ...state, req: h1 };
  }
  if (action.type == "setData") {
    const h1 = action.payload;
    return { ...state, data: h1 };
  }
  if (action.type == "setUserData") {
    const h1 = action.payload;
    return { ...state, userData: h1 };
  }
  if (action.type == "setProfileView") {
    const h1 = action.payload;
    return { ...state, profile_view: h1 };
  }
  if (action.type === "setOptions") {
    const h1 = action.payload;
    return { ...state, goptions: h1 };
  }
  if (action.type === "setLat") {
    console.log("Latitude");
    const h1 = action.payload;
    return { ...state, lat: h1 };
  }
  if (action.type === "setLon") {
    console.log("Longitude");
    const h1 = action.payload;
    return { ...state, lon: h1 };
  }
  if (action.type === "setId") {
    const h1 = action.payload;
    console.log("I set the id", action.payload);
    return { ...state, polygon_id: h1 };
  }
  if (action.type === "setObj") {
    const h1 = action.payload;
    console.log("IN reducer", h1);
    return { ...state, obj: h1 };
  }
  if (action.type === "setLoading") {
    const h1 = action.payload;

    return { ...state, loadProfile: 0 };
  }
};

export default reducer;
