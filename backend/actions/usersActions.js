const User = require("../models/user-model");
const Restaurant = require("../models/restaurant-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UsersActions = {
  GetAllUsers: (req, res) => {
    User.find({})
      .then((users) => res.status(200).json(users))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  },

  GetSingleUser: (req, res) => {
    const headers = req.headers;

    User.findById(req.params.id)
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  },

  CreateNewUser: async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const description = req.body.description;
    const restaurantName = req.body.restaurantName;

    if (!(username || password)) {
      return res
        .status(400)
        .json({ error: "Uzupełnij nazwe użytkownika i hasło" });
    }
    const newUser = new User({
      username,
      password,
      description,
      restaurantName,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    newUser
      .save()
      .then(() =>
        res.status(200).json("Zarejestrowano pomyślnie, możesz się zalogować")
      )
      .catch((err) => res.status(400).json(`Użytwkownik już istnieje`));
  },

  LoginUser: async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      res.status(400).send("Wypełnij wszystkie pola");
      return;
    }

    const user = await User.findOne({ username });

    if (!user) {
      res.status(400).send("Nie znaleziono użytkownika");
      return;
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = jwt.sign(
          {
            sub: user._id,
            username: user.username,
          },
          "mysecretkey",
          { expiresIn: "3h" }
        );

        res.status(200).send({ access_token: token, user: user });
      } else {
        res.status(400).send("Złe hasło");
      }
    }
  },

  AddFavRestaurant: async (req, res) => {
    const id = req.params.id;
    const name = req.body.favRestaurants.name;
    const password = req.body.favRestaurants.password;

    const user = await User.findById(id);

    const newFavRestaurant = new Restaurant({ name, password });

    await user.favRestaurants.push(newFavRestaurant);
    await user
      .save()
      .then(() => res.status(200).json("Fav Restaurant added!"))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  },

  AddFavRestaurantById: async (req, res) => {
    const id = req.params.id;
    const restaurantID = req.body.id;

    const user = await User.findById(id);
    const newFavRestaurant = await Restaurant.findById(restaurantID);

    const isExistInFav = [];

    if (newFavRestaurant) {
      user.favRestaurants.map((restaurant) => {
        if (restaurant.name === newFavRestaurant.name) {
          isExistInFav.push(newFavRestaurant.name);
        }
      });
    }

    if (!isExistInFav.length) {
      await user.favRestaurants.push(newFavRestaurant);
      await user
        .save()
        .then(() => res.status(200).json("Fav Restaurant added!"))
        .catch((err) => res.status(400).json(`Something goes wrong: ${err}`));
    } else {
      res.status(400).json(`Something goes wrong`);
    }
  },

  GetFavRestaurants: async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    const restaurant = await Restaurant.find();

    const iterator = user.favRestaurants.values();
    const favRes = [];

    for (const value of iterator) {
      restaurant.map((restaurantInfo) => {
        if (restaurantInfo.name === value.name) {
          favRes.push(restaurantInfo);
        }
      });
    }

    user.favRestaurants = favRes;

    await user
      .save()
      .then(() => res.status(200).json(user.favRestaurants))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  },
};

module.exports = UsersActions;
