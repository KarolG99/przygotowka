const router = require("express").Router();
const {
  GetSingleRestaurant,
  CreateNewRestaurant,
  CreateNewTaskInRestaurant,
  DeleteTask,
} = require("../actions/restaurantActions");

router.route("/:id").get(GetSingleRestaurant);

router.route("/create").post(CreateNewRestaurant);

router.route("/:id/create-task").post(CreateNewTaskInRestaurant);

router.route("/:restaurantID/delete-task/:id").delete(DeleteTask);

module.exports = router;
