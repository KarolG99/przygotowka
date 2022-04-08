import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../atoms/Button.styles";
import { H1 } from "../../atoms/H1.styles";
import Alert from "../../atoms/Warning/Alert";
import FormField from "../../molecules/FormField/FormField";
import Navigation from "../../molecules/Navigation/Navigation";
import { Article } from "../HomePage/HomePage.styles";

interface IUserID {
  _id: string;
}

interface IInitialFormState {
  name: string;
  password: string;
  repeatedPassword: string;
}

const initialFormState: IInitialFormState = {
  name: "",
  password: "",
  repeatedPassword: "",
};

const AddRestaurant = () => {
  const { id } = useParams();
  const [userID, setUserID] = useState<IUserID>();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [invalidRestaurantMessage, setInvalidRestaurantMessage] = useState("");
  const [formValues, setFormValues] = useState(initialFormState);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setIsDataLoaded(true);
        setUserID({
          _id: data._id,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const CheckRestaurantNameInDB = async () => {
    const response = await axios.get("http://localhost:8000/restaurants");
    const RestaurantFromDB = await response.data.map(
      (restaurant: { name: string }) => {
        if (restaurant.name === formValues.name) {
          setIsRegister(true);
          return restaurant;
        }
      }
    );
    return RestaurantFromDB;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await CheckRestaurantNameInDB();
    if (isRegister) {
      setIsRegister(false);
      return;
    } else if (
      formValues.name.length >= 2 &&
      formValues.password.length >= 8 &&
      formValues.password === formValues.repeatedPassword
    ) {
      const newRestaurant = {
        name: formValues.name,
        password: formValues.password,
      };
      await axios
        .post("http://localhost:8000/restaurants/create", newRestaurant)
        .then((res) => {
          console.log(res.data);
          setFormValues(initialFormState);
          setIsSuccess(true);
        })
        .catch((err) => console.log(err));

      await axios
        .post(`http://localhost:8000/users/${id}/add-fav-restaurant`, {
          favRestaurants: newRestaurant,
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    } else if (formValues.name.length < 2) {
      setInvalidRestaurantMessage("Nazwa jest za krótka");
    } else if (formValues.password.length < 8) {
      setInvalidRestaurantMessage("Hasło musi być dłuższe");
    } else if (formValues.password !== formValues.repeatedPassword) {
      setInvalidRestaurantMessage("Hasła muszą być takie same");
    }
  };

  return (
    <>
      {!isDataLoaded && (
        <Article>
          <h2>Ładowanie...</h2>
        </Article>
      )}

      {userID && isDataLoaded && (
        <>
          <Navigation id={userID?._id} />
          <Article>
            <H1>Utwórz restauracje</H1>

            {isRegister && (
              <>
                <Alert
                  className="warning"
                  message={"⚠️ Taka nazwa restauracji już istnieje"}
                />
              </>
            )}

            {invalidRestaurantMessage && !isRegister && (
              <Alert className="error" message={invalidRestaurantMessage} />
            )}

            {isSuccess && !isRegister && (
              <>
                <Alert
                  className="success"
                  message={`Zarejestrowano pomyślnie, możesz dodać restauracje w zakładce "Moje restauracje"`}
                />
              </>
            )}

            <FormField
              id="name"
              name="name"
              placeholder="nazwa restauracji"
              value={formValues.name}
              onChange={handleInputChange}
            />
            <FormField
              id="password"
              name="password"
              type="password"
              placeholder="hasło (min. 8 znaków)"
              value={formValues.password}
              onChange={handleInputChange}
            />
            <FormField
              id="repeatedPassword"
              name="repeatedPassword"
              type="password"
              placeholder="powtórz hasło"
              value={formValues.repeatedPassword}
              onChange={handleInputChange}
            />
            <Button onClick={handleSubmit}>Dodaj</Button>
          </Article>
        </>
      )}
    </>
  );
};

export default AddRestaurant;
