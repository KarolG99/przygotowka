const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      trim: true,
    },
    password: {
      type: String,
      minlength: 8,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    restaurantName: {
      type: String,
      required: false,
      trim: true,
    },
    favRestaurants: [
      {
        name: {
          type: String,
          trim: true,
          sparse: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
