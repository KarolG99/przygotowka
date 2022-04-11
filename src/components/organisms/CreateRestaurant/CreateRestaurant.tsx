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

interface IInitialFormIDState {
  id: string;
}

const initialFormIDState: IInitialFormIDState = {
  id: "",
};

const AddRestaurant = () => {
  const { id } = useParams();
  const [userID, setUserID] = useState<IUserID>();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [invalidRestaurantMessage, setInvalidRestaurantMessage] = useState("");
  const [isAddedByIdMsg, setIsAddedByIdMsg] = useState("");
  const [isNotAddedByIdMsg, setIsNotAddedByIdMsg] = useState("");
  const [formValues, setFormValues] = useState(initialFormState);
  const [formIdValue, setFormIdValue] = useState(initialFormIDState);

  useEffect(() => {
    axios
      .get(`https://przygotowka.herokuapp.com/users/${id}`)
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
    setFormIdValue({
      ...formIdValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (formValues.name.length < 2) {
      setInvalidRestaurantMessage("Nazwa jest za krótka");
    } else if (formValues.password.length < 8) {
      setInvalidRestaurantMessage("Hasło musi być dłuższe");
    } else if (formValues.password !== formValues.repeatedPassword) {
      setInvalidRestaurantMessage("Hasła muszą być takie same");
    } else {
      const newRestaurant = {
        name: formValues.name,
        password: formValues.password,
      };

      if (newRestaurant) {
        await axios
          .post(`https://przygotowka.herokuapp.com/restaurants/create`, newRestaurant)
          .then((res) => {
            setFormValues(initialFormState);
            setIsSuccess(true);
          })
          .then(() => {
            axios
              .post(`https://przygotowka.herokuapp.com/users/${id}/add-fav-restaurant`, {
                favRestaurants: newRestaurant,
              })
              .then((res) => console.log(res.data))
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            setInvalidRestaurantMessage("Taka restauracja już istnieje");
            console.log(err);
          });
      }
    }
  };

  const handleAddById = async (e: React.FormEvent<HTMLButtonElement>) => {
    if (!formIdValue.id.length) {
    } else {
      const NewID = {
        id: formIdValue.id,
      };

      if (NewID) {
        await axios
          .post(`https://przygotowka.herokuapp.com/users/${id}/add-restaurant-by-id`, NewID)
          .then((res) => {
            setFormIdValue(initialFormIDState);
            setIsAddedByIdMsg("Dodano!");
          })
          .catch((err) => setIsNotAddedByIdMsg("Coś poszło nie tak"));
      }
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


            {invalidRestaurantMessage && (
              <Alert className="error" message={invalidRestaurantMessage} />
            )}

            {isSuccess && !invalidRestaurantMessage && (
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
            <Button onClick={handleSubmit}>Utwórz</Button>

            <H1 className="add-restaurant">Dodaj restauracje</H1>

            {isAddedByIdMsg && (
              <Alert className="success" message={isAddedByIdMsg} />
            )}

            {isNotAddedByIdMsg && (
              <Alert className="warning" message={isNotAddedByIdMsg} />
            )}

            <FormField
              id="id"
              name="id"
              placeholder="id restauracji"
              value={formIdValue.id}
              onChange={handleInputChange}
            />
            <Button onClick={handleAddById}>Dodaj</Button>
          </Article>
        </>
      )}
    </>
  );
};

export default AddRestaurant;
