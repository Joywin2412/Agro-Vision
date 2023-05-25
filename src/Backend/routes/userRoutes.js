const express = require("express");
const jwt = require("jsonwebtoken");
const {
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
} = require("../controllers/userControllers");
// const jwt = require();
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.get("/profile/:id", AuthenticateUser, profileUser);
router.post("/polygon", AuthenticateUser, polygonUser);
router.post("/polygonData", AuthenticateUser, polygonData);
router.post("/friends", AuthenticateUser, friendsList);
router.post("/farmer", AuthenticateUser, farmersList);
router.post("/crops", AuthenticateUser, cropsList);
router.post("/options", AuthenticateUser, optionsList);
router.post("/address", AuthenticateUser, addressFind);
router.post("/location", AuthenticateUser, updateUser);
router.post("/localcrops", AuthenticateUser, localcrops);
router.post("/latitudes", AuthenticateUser, latitudeList);
router.post("/friendRequest", AuthenticateUser, friendRequest);
router.post("/pending", AuthenticateUser, pendingList);
router.post("/notif", AuthenticateUser, notificationList);
router.post("/acceptList", AuthenticateUser, AcceptUser);
router.post("/accept", AuthenticateUser, acceptList);
router.post("/decline", AuthenticateUser, declineList);
router.post("/delete", AuthenticateUser, deleteUser);

function AuthenticateUser(req, res, next) {
  next();
  // const token = req.headers.authorization.split(" ")[1];

  // console.log(token);
  // if (!token) {
  //   return res.status(401).send({ message: "No token provided" });
  // }
  // console.log(process.env.JWT_SECRET);
  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   console.log(decoded);
  //   next();
  // } catch (err) {
  //   console.log(err);
  //   return res.status(401).send({ message: "Invalid token" });
  // }
}
module.exports = router;
