// what logic do you want to apply after getting data from user

const AsyncHandler = require("express-async-handler");
const user = require("../models/model1.js");
const generateToken = require("../config/generateToken.js");
const polygon = require("../models/model2.js");
const cropsconsider = require("../models/model3.js");
const friendsconsider = require("../models/model4.js");

const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password, phone, lat, lon, address } = req.body;
  // console.log(lat, lon);
  if (!name || !email || !password) {
    res.status(400);
    throw new error("Please enter all fields");
  }

  const userExists = await user.findOne({ email });
  //   condition of same email existing as now
  // console.log(req.body);
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // console.log("User created");

  const new_user = await user.create({
    Name: req.body.name,
    Email: req.body.email,
    Password: req.body.password,
    Phone: req.body.phone,
    Lat: lat,
    Lon: lon,
    Address: address,
  });
  if (new_user) {
    res.status(201).json({
      _id: new_user._id,
      name: new_user.Name,
      email: new_user.Email,
      phone: new_user.Phone,
      token: generateToken(new_user.Email),
    });
  } else {
    res.status(400);
    throw new error("User not found");
  }
});

const authUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user2 = await user.findOne({ Email: email });
  // console.log(email, password);
  if (user2) {
    // console.log(user2.Password);
    if (await user2.matchPassword(password)) {
      res.json({
        _id: user2._id,
        name: user2.Name,
        email: user2.Email,
        phone: user2.Phone,
        token: generateToken(user2.Email),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email and password");
    }
  } else {
    res.status(401);
    throw new Error("Invalid email and password");
  }
});
const profileUser = AsyncHandler(async (req, res) => {
  const name = req.params.id;
  // console.log(name);
  const user2 = await user.findOne({ Name: name });

  if (user2) {
    if (true) {
      res.json({
        _id: user2._id,
        name: user2.Name,
        email: user2.Email,
        phone: user2.Phone,
        token: generateToken(user2._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email and password");
    }
  } else {
    res.status(401);
    throw new Error("Invalid email and password");
  }
  // res.send();
});

const polygonUser = AsyncHandler(async (req, res) => {
  // This logic is just to put the farmers under one polygon
  // hello : true means that we found the email.
  const { name, email, lat, lon } = req.body;
  try {
    let h = await polygon.find({ Email: email });
    // console.log(h);
    // console.log(h.Name);
    res.json({
      name: h[0].Name,
      email: h[0].Email,
      Polygon_id: h[0].Polygon_id,
      hello: true,
    });

    return;
  } catch (err) {}
  // console.log(name, email, lat, lon);
  let poly;
  try {
    // console.log(lat);
    // console.log("This got executed");
    poly = await polygon.find({
      lat1: { $lte: lat },
      lat3: { $gte: lat },
      lon1: { $lte: lon },
      lon3: { $gte: lon },
    });
  } catch (error) {
    return;
  }
  // console.log("eong", poly);
  if (poly.length) {
    // console.log("I found parent polygon");
    let lat1, lon1, lat2, lon2, lat3, lon3, lat4, lon4;
    let a = Math.sqrt((1500 * 4) / Math.sqrt(3));
    // console.log(a);
    // console.log(lat, lon);
    console.log("This is the request being called. It is a child user");
    console.log(poly);
    let b = (Math.sqrt(3) / 2) * a;
    b /= 1000;
    lat1 = lat - b * Math.cos(45);
    lon1 = lon - b * Math.sin(45);

    lat2 = lat + b * Math.cos(45);
    lon2 = lon - b * Math.sin(45);

    lat3 = lat + b * Math.cos(45);
    lon3 = lon + b * Math.sin(45);

    lat4 = lat - b * Math.cos(45);
    lon4 = lon + b * Math.sin(45);
    // console.log(poly[0].Polygon_id);
    // console.log("i am here");
    try {
      await polygon.create({
        Name: name,
        Email: email,
        Polygon_id: poly[0].Polygon_id,
        lat1: poly[0].lat1,
        lat2: poly[0].lat2,
        lat3: poly[0].lat3,
        lat4: poly[0].lat4,
        lon1: poly[0].lon1,
        lon2: poly[0].lon2,
        lon3: poly[0].lon3,
        lon4: poly[0].lon4,
      });
      res.json({
        name: name,
        email: email,
        Polygon_id: poly[0].Polygon_id,
      });
    } catch (err) {
      // console.log(err);
    }
  } else {
    // console.log("Couldn't find any");
    res.json("Failed");
    // empty request in order to indicate no file
    // also check if the email is same in order to stop the polygon from being created again and again. Creating another api for storing in db
  }
});

const polygonData = AsyncHandler(async (req, res) => {
  const {
    name,
    email,
    polygon_id,
    lat1,
    lat2,
    lat3,
    lat4,
    lon1,
    lon2,
    lon3,
    lon4,
  } = req.body;
  // console.log("Polygon creation", id);
  try {
    await polygon.create({
      Name: name,
      Email: email,
      Polygon_id: polygon_id,
      lat1: lat1,
      lat2: lat2,
      lat3: lat3,
      lat4: lat4,
      lon1: lon1,
      lon2: lon2,
      lon3: lon3,
      lon4: lon4,
    });
    res.json("Successful");
  } catch (err) {
    // console.log(err);
    res.json("Failed");
  }
});

const friendsList = AsyncHandler(async (req, res) => {
  const { id } = req.body;
  try {
    let h = await polygon.find({ Polygon_id: id });
    res.json(h);
  } catch (err) {
    // console.log(err);
    res.json("Failed");
  }
});

const farmersList = AsyncHandler(async (req, res) => {
  const { polygon_id } = req.body;
  // console.log(polygon_id);
  // find the same polygon_id

  try {
    let h = await polygon.find({});
    // console.log("This is a polygon", h);

    let arr = [];
    for (let i = 0; i < h.length; i++) {
      let h2;
      try {
        h2 = await user.findOne({ Email: h[i].Email });
        arr.push(h2);
      } catch (err) {
        // console.log(err);
        continue;
      }
    }
    // console.log("This is the final", arr);
    res.json(arr);
  } catch (err) {
    // console.log(err);
    res.json("Failed");
  }
});

const cropsList = AsyncHandler(async (req, res) => {
  const { name, email, crops } = req.body;
  // console.log(crops);
  try {
    const h1 = await cropsconsider.find({ Email: email });
    console.log(h1);
    if (h1.length) {
      await cropsconsider.updateOne({ Email: email }, { Crops: crops });
      res.json("Crops updated");
    } else {
      await cropsconsider.create({ Name: name, Email: email, Crops: crops });
      res.json("Crops created");
      // the mistake was not sending a response back to the user
    }
  } catch (err) {
    res.json("Crops not Created");
  }
  // res.json("Hi");
});

const optionsList = AsyncHandler(async (req, res) => {
  const { name, email } = req.body;

  // console.log(req.url);
  // console.log(name, email);
  try {
    let h = await cropsconsider.findOne({ Name: name, Email: email });
    if (h)
      res.json({
        options: h.Crops,
      });
    else {
      res.json("failed");
    }
  } catch (err) {
    // console.log(err);
    res.json("No option present");
  }
});

const addressFind = AsyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    let h = await user.findOne({ Email: email });
    // console.log(h);
    res.json({
      address: h.Address,
    });
  } catch (err) {
    // console.log(err);
    res.json("No address found");
  }
});

const updateUser = AsyncHandler(async (req, res) => {
  const { email, lat_now, lon_now } = req.body;
  try {
    const user2 = await user.findOne({ Email: email });
    // console.log("Finding the user", email, lat, lon);
    try {
      // console.log("Updating the user");
      await user.updateOne({ Email: email }, { Lat: lat_now, Lon: lon_now });
      res.json("Success");
    } catch (err) {
      // console.log(err);
    }
  } catch (err) {
    // console.log(err);
  }
});

const localcrops = AsyncHandler(async (req, res) => {
  const { name, polygon_id } = req.body;
  // console.log("This", req.body);
  try {
    const h = await cropsconsider.find({ Crops: { $in: [name] } });
    // console.log(h);
    if (h.length) {
      const arr2 = [];
      for (let i = 0; i < h.length; i++) {
        // if (h.Polygon_id !== polygon_id) continue;
        try {
          const h1 = await user.findOne({ Email: h[i].Email });
          try {
            // console.log(h[i].Email, polygon_id);
            const h2 = await polygon.findOne(
              { Email: h[i].Email },
              { Polygon_id: polygon_id }
            );
            // console.log(h2);
            if (h2) {
              // console.log("i got added");
              arr2.push(h1);
            }
          } catch (err) {
            // console.log(err);
          }
        } catch (err) {
          // console.log(err);
        }
      }
      res.json(arr2);
    } else {
      res.json("Failed");
    }
  } catch (err) {
    // console.log(err);
    res.json("Failed");
  }
});

const latitudeList = AsyncHandler(async (req, res) => {
  // find the parent email of the polygon in order to access them afterwards`

  // const { email } = req.body;
  // try {
  //   const regex = new RegExp(substring, email);
  //   let h = await polygon.findOne({ Polygon_id: { $regex: regex } });
  //   res.json(h);
  // } catch (err) {
  //   console.log(err);
  //   res.json("FAiled");
  // }

  let { polygon_id } = req.body;
  // polygon_id = polygon_id.substring(5, polygon_id.length);

  let x;
  for (let i = 1; i < polygon_id.length; i++) {
    if (polygon_id[i] === ":") {
      x = i + 1;
      break;
    }
  }
  polygon_id = polygon_id.substring(x, polygon_id.length);
  console.log(polygon_id);
  console.log("The parent polygon is being searched");
  try {
    let h = await polygon.findOne({ Email: polygon_id });
    res.json(h);
  } catch (err) {
    console.log(err);
    res.json("Failed");
  }
});

const friendRequest = AsyncHandler(async (req, res) => {
  let { email1, email2, status } = req.body;
  // console.log(email1, email2, status);
  try {
    let h = await friendsconsider.create({
      Email1: email1,
      Email2: email2,
      Status: status,
    });
    res.json("Successful");
  } catch (err) {
    console.log(err);
    res.json("Failed");
  }
});

const pendingList = AsyncHandler(async (req, res) => {
  const { email1 } = req.body;
  // res.json("Hi");
  console.log(req.url);
  console.log("This", email1);
  console.log("\n");
  try {
    let h = await friendsconsider.find({
      Email1: email1,
      Status: "Pending",
    });
    // console.log(h);
    res.json(h);
  } catch (err) {
    // console.log(err);
    res.json("No such");
  }
});

const notificationList = AsyncHandler(async (req, res) => {
  const { email1 } = req.body;
  // console.log("This is", email1);
  try {
    let h = await friendsconsider.find({
      Email2: email1,
      Status: "Pending",
    });
    let h2 = [];
    for (let i = 0; i < h.length; i++) {
      try {
        let h3 = await user.findOne({ Email: h[i].Email1 });
        h2.push(h3);
      } catch (err) {
        // console.log(err);
      }
    }
    res.json(h2);
  } catch (err) {
    // console.log(err);
    res.json("No notifications");
  }
});

const AcceptUser = AsyncHandler(async (req, res) => {
  const { email1 } = req.body;
  console.log(email1);
  try {
    let h2;
    let h = await friendsconsider.find({
      Email2: email1,
      Status: "Accepted",
    });
    // console.log(h);
    if (h.length) {
      try {
        let h3 = [];
        for (let i = 0; i < h.length; i++) {
          try {
            console.log(h[i].Email1);
            let temp = await user.findOne({ Email: h[i].Email1 });
            if (temp) {
              h3.push(temp);
            }
          } catch (err) {
            console.log(err);
          }
        }
        await user.find({ Email: h[0].Email1 });
        if (h3.length) h2 = h3;
      } catch (err) {
        console.log(err);
      }
      // h2.push(h);
      // console.log(h);
    }
    h = await friendsconsider.find({
      Email1: email1,
      Status: "Accepted",
    });
    // console.log("asdf", h);
    if (h.length) {
      try {
        // console.log(h.Email2);
        let h3 = [];
        for (let i = 0; i < h.length; i++) {
          try {
            // console.log(h[i].Email2);
            let temp = await user.findOne({ Email: h[i].Email2 });
            if (temp) {
              h3.push(temp);
            }
          } catch (err) {
            // console.log(err);
          }
        }
        console.log(h3);
        if (h2 && h3.length) h2 = h2.concat(h3);
        else if (h3.length) {
          h2 = h3;
        }
      } catch (err) {
        console.log(err);
      }
      // h2.push(h);
      // console.log(h);
    }
    res.json(h2);
  } catch (err) {
    res.json([]);
  }
});

const acceptList = AsyncHandler(async (req, res) => {
  const { email1, email2 } = req.body;

  try {
    // let h = await friendsconsider.findOne({
    //   Email1: email1,
    //   Email2: email2,
    //   Status: "Pending",
    // });
    // console.log(h);
    // try {
    await friendsconsider.updateOne(
      { Email1: email1, Email2: email2 },
      { Status: "Accepted" }
    );
    res.json("Successful");
  } catch (err) {
    console.log(err);
  }
});

const declineList = AsyncHandler(async (req, res) => {
  const { email1, email2 } = req.body;
  // delete the request
  try {
    await friendsconsider.deleteOne({ Email1: email1, Email2: email2 });
    // because let's say i got the request now I wish to delete
    // res.json("Success deletion");
  } catch (err) {
    console.log(err);
    // res.json("Failed");
  }

  try {
    await friendsconsider.deleteOne({ Email2: email1, Email1: email2 });
    res.json("Successful");
  } catch (err) {
    console.log(err);
  }
});

const deleteUser = AsyncHandler(async (req, res) => {
  const { email } = req.body;
  // delete the request
  try {
    await user.deleteOne({ Email: email });
    await polygon.deleteOne({ Email: email });
    await cropsconsider.deleteOne({ Email: email });
    try {
      await friendsconsider.deleteMany({ Email1: email });
    } catch (err) {
      console.log(err);
    }

    try {
      await friendsconsider.deleteMany({ Email2: email });
    } catch (err) {
      console.log(err);
    }
    // because let's say i got the request now I wish to delete
    res.json("Success deletion");
  } catch (err) {
    console.log(err);
    res.json("Failed");
  }
});
module.exports = {
  registerUser,
  authUser,
  profileUser,
  polygonUser,
  polygonData,
  friendsList,
  farmersList,
  cropsList,
  optionsList,
  addressFind,
  updateUser,
  localcrops,
  latitudeList,
  friendRequest,
  pendingList,
  notificationList,
  AcceptUser,
  acceptList,
  declineList,
  deleteUser,
};

// Request must be in lower case while the schema is in upper case
