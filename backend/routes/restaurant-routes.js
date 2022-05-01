const router = require("express").Router();
const {
  GetAllRestaurants,
  GetSingleRestaurant,
  CreateNewRestaurant,
  CreateNewTaskInRestaurant,
  DeleteTask,
} = require("../actions/restaurantActions");

router.route("/").get(GetAllRestaurants);

router.route("/:id").get(GetSingleRestaurant);

router.route("/create").post(CreateNewRestaurant);

router.route("/:id/create-task").post(CreateNewTaskInRestaurant);

router.route("/:restaurantID/delete-task/:id").delete(DeleteTask);

module.exports = router;
