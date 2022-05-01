const router = require("express").Router();
const {
  GetAllUsers,
  GetSingleUser,
  AddFavRestaurant,
  CreateNewUser,
  LoginUser,
  GetFavRestaurants,
  AddFavRestaurantById,
} = require("../actions/usersActions");
const verifyToken = require("../verification");

router.route("/").get(GetAllUsers);

router.get("/:id", verifyToken, GetSingleUser);

router.route("/create").post(CreateNewUser);

router.route("/login").post(LoginUser);

router.post("/:id/add-fav-restaurant", verifyToken, AddFavRestaurant);

router.post("/:id/add-restaurant-by-id", verifyToken, AddFavRestaurantById);

router.get("/:id/fav-restaurants", verifyToken, GetFavRestaurants);

module.exports = router;
