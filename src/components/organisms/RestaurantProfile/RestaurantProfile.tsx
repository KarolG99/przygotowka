import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Navigation from "../../molecules/Navigation/Navigation";
import FormField from "../../molecules/FormField/FormField";
import Alert from "../../atoms/Warning/Alert";
import RestaurantInfo from "../../molecules/RestaurantInfo/RestaurantInfo";
import { ITask, IUserInfo, RestaurantProfileIRestaurant } from "../../../types";
import { URL } from "../../../apiurl";
import { Button } from "../../atoms/Button.styles";
import { H1 } from "../../atoms/H1.styles";
import { AddIcon, CloseIcon } from "../../atoms/Icons.styles";
import { Id } from "../../atoms/Id.styles";
import { StyledLink } from "../../atoms/Link.styles";
import { UnauthorizedH2 } from "../../atoms/Unauthorized.styles";
import { Username } from "../../atoms/username.styles";
import { Article } from "../HomePage/HomePage.styles";
import { ACCESS_TOKEN } from "../LogIn/LogIn";

const initialFormState: ITask = {
  title: "",
  category: "",
  description: "",
};

const RestaurantProfile = () => {
  const { id, restaurantID } = useParams();
  const [restaurantInfo, setRestaurantInfo] =
    useState<RestaurantProfileIRestaurant>();
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [formValues, setFormValues] = useState(initialFormState);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isFormShowing, setIsFormShowing] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [noTokenMsg, setNoTokenMsg] = useState("");

  useEffect(() => {
    if (ACCESS_TOKEN) {
      axios.defaults.headers.common[
        "x-access-token"
      ] = `Bearer ${ACCESS_TOKEN}`;

      axios
        .get(`${URL}/restaurants/${restaurantID}`)
        .then((res) => res.data)
        .then((data) => {
          setIsDataLoaded(true);
          setRestaurantInfo(data);
        })
        .catch((err) => console.log(err));
    } else {
      setNoTokenMsg("Musisz się zalogować");
    }
  }, [restaurantID, restaurantInfo]);

  useEffect(() => {
    if (ACCESS_TOKEN) {
      axios.defaults.headers.common[
        "x-access-token"
      ] = `Bearer ${ACCESS_TOKEN}`;

      axios
        .get(`${URL}/users/${id}`)
        .then((res) => res.data)
        .then((data) => {
          setIsDataLoaded(true);
          setUserInfo({
            username: data.username,
            description: data.description,
            restaurantName: data.restaurantName,
            _id: data._id,
          });
        })
        .catch((err) => console.log(err));
    } else {
      setNoTokenMsg("Musisz się zalogować");
    }
  }, [id, restaurantID]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTask = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (formValues.title.length < 3) {
      setWarningMessage("Tytuł jest za krótki");
      return;
    } else if (formValues.category.length < 3) {
      setWarningMessage("Stanowisko/kategoria jest za krótka");
      return;
    } else if (formValues.description.length < 3) {
      setWarningMessage("Treść jest za krótka");
      return;
    } else {
      setErrorMessage("");
      setWarningMessage("");

      if (userInfo?.username) {
        const newTask: ITask = {
          username: userInfo?.username,
          title: formValues.title,
          category: formValues.category,
          description: formValues.description,
        };

        if (newTask) {
          await axios
            .post(`${URL}/restaurants/${restaurantID}/create-task`, {
              tasks: newTask,
            })
            .then((res) => {
              setIsFormShowing(false);
              setFormValues(initialFormState);
            })
            .catch((err) => {
              setErrorMessage("Coś poszło nie tak");
            });
        }
      }
    }
  };

  const CloseForm = () => {
    setIsFormShowing(false);
    setFormValues(initialFormState);
  };

  return (
    <>
      {!isDataLoaded && !noTokenMsg && (
        <Article>
          <h2>Ładowanie...</h2>
        </Article>
      )}

      {noTokenMsg && (
        <Article>
          <UnauthorizedH2>Musisz się zalogować</UnauthorizedH2>
          <StyledLink to="/login">Zaloguj się</StyledLink>
        </Article>
      )}

      {restaurantInfo && isDataLoaded && userInfo && (
        <>
          <Navigation id={userInfo?._id} />

          <Article>
            <H1>Profil Restauracji</H1>
            <Username className="restaurant-name">
              {restaurantInfo.name}
            </Username>
            <h4>
              ID: <Id>{restaurantInfo._id}</Id>
            </h4>

            {!isFormShowing ? (
              <Button onClick={() => setIsFormShowing(true)}>
                Dodaj zadanie
              </Button>
            ) : (
              <React.Fragment>
                {warningMessage && (
                  <Alert className="warning" message={warningMessage} />
                )}

                {errorMessage && (
                  <Alert className="error" message={errorMessage} />
                )}

                <FormField
                  id="title"
                  name="title"
                  placeholder="tytuł"
                  value={formValues.title}
                  onChange={handleInputChange}
                />
                <FormField
                  id="category"
                  name="category"
                  placeholder="stanowisko/kategoria"
                  value={formValues.category}
                  onChange={handleInputChange}
                />
                <FormField
                  id="description"
                  name="description"
                  placeholder="treść zadania"
                  value={formValues.description}
                  onChange={handleInputChange}
                />

                <div>
                  <Button className="add-task" onClick={handleAddTask}>
                    <AddIcon className="add-task" />
                  </Button>

                  <Button className="close-form" onClick={CloseForm}>
                    <CloseIcon />
                  </Button>
                </div>
              </React.Fragment>
            )}

            <RestaurantInfo
              tasks={restaurantInfo.tasks}
              restaurantID={restaurantInfo._id}
            />
          </Article>
        </>
      )}
    </>
  );
};

export default RestaurantProfile;
