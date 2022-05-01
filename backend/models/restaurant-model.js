const mongoose = require("mongoose");
const Tasks = require("../models/restaurantTasks-model");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      // required: true,
      trim: true,
      minlength: 2,
    },
    password: {
      type: String,
      // required: true,
      trim: true,
      minlength: 8,
    },
    tasks: [
      {
        username: { type: String, trim: true },
        title: { type: String, required: false, trim: true },
        category: { type: String, trim: true },
        description: { type: String, required: false, trim: true },
      },
    ],
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
