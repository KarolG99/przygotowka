const Restaurant = require("../models/restaurant-model");
const bcrypt = require("bcryptjs");

const RestaurantsActions = {
  GetAllRestaurants: (req, res) => {
    Restaurant.find({})
      .then((restaurants) => res.json(restaurants))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  },

  GetSingleRestaurant: (req, res) => {
    Restaurant.findById(req.params.id)
      .then((restaurants) => res.json(restaurants))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  },

  CreateNewRestaurant: async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const restaurant = await Restaurant.findOne({ name });

    if (!(name || password)) {
      return res.status(400).json({ error: "Wypełnij wszystkie pola" });
    }
    if (!restaurant) {
      const newRestaurant = new Restaurant({ name, password });

      const salt = await bcrypt.genSalt(10);
      newRestaurant.password = await bcrypt.hash(newRestaurant.password, salt);

      newRestaurant
        .save()
        .then(() => res.status(200).json("Restaurant added!"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    } else {
      return res.status(400).json({ error: "Taka restauracja już istnieje" });
    }
  },

  CreateNewTaskInRestaurant: async (req, res) => {
    const id = req.params.id;
    const username = req.body.tasks.username;
    const title = req.body.tasks.title;
    const category = req.body.tasks.category;
    const description = req.body.tasks.description;

    const restaurant = await Restaurant.findById(id);
    restaurant.tasks.username = username;
    restaurant.tasks.title = title;
    restaurant.tasks.category = category;
    restaurant.tasks.description = description;

    const newTask = { username, title, category, description };

    await restaurant.tasks.unshift(newTask);
    await restaurant
      .save()
      .then(() => res.status(200).json("Added"))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  },

  DeleteTask: async (req, res) => {
    const id = req.params.id;
    const restaurantID = req.params.restaurantID;

    const restaurant = await Restaurant.findById(restaurantID);

    if (restaurant) {
      restaurant.tasks.filter((task) => {
        if (task._id.toString() === id) {
          const index = restaurant.tasks.indexOf(task);
          restaurant.tasks.splice(index, 1);
        }
      });
    }

    await restaurant
      .save()
      .then(() => res.status(200).json("Deleted"))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  },
};

module.exports = RestaurantsActions;
