import React, { useContext, useRef, useState } from "react";
import axios from "axios";

import Alert from "../../atoms/Warning/Alert";
import FormField from "../../molecules/FormField/FormField";
import { RegisterIFormValues } from "../../../types";
import { URL } from "../../../apiurl";
import { UserContext } from "../../../Providers/UserProvider";
import { Button } from "../../atoms/Button.styles";
import { H1 } from "../../atoms/H1.styles";
import { StyledLink } from "../../atoms/Link.styles";
import { Article } from "../HomePage/HomePage.styles";

const initialFormState: RegisterIFormValues = {
  username: "",
  password: "",
  description: "",
  restaurantName: "",
  repeatedPassword: "",
};

const Register = () => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [isRegister, setIsRegister] = useState(false);
  const loginRef = useRef<HTMLAnchorElement>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [invalidRegisterMessage, setInvalidRegisterMessage] = useState("");
  const [isError, setIsError] = useState("");
  const { handleAddUser } = useContext(UserContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const CheckUsernameInDB = async () => {
    const response = await axios.get(`${URL}/users`);
    const userFromDB = await response.data.forEach(
      (user: { username: string }) => {
        if (user.username === formValues.username) {
          setIsRegister(true);
          return user;
        }
      }
    );
    return userFromDB;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await CheckUsernameInDB();

    if (isRegister) {
      setIsRegister(false);
      return;
    } else {
      if (
        formValues.username.length >= 4 &&
        formValues.password.length >= 8 &&
        formValues.password === formValues.repeatedPassword
      ) {
        const newUser = {
          username: formValues.username,
          password: formValues.password,
          description: formValues.description,
          restaurantName: formValues.restaurantName,
        };
        handleAddUser({
          username: formValues.username,
          description: formValues.description,
          restaurantName: formValues.restaurantName,
        });

        await axios
          .post(`${URL}/users/create`, newUser)
          .then((res) => console.log(res.data))
          .catch((err) => {
            setIsError("Coś poszło nie tak");
            console.log(err);
          });

        setFormValues(initialFormState);
        setIsSuccess(true);
      } else if (formValues.username.length < 4) {
        setInvalidRegisterMessage("Nazwa użytkownika jest za krótka");
      } else if (formValues.password.length < 8) {
        setInvalidRegisterMessage("Hasło musi być dłuższe");
      } else if (formValues.password !== formValues.repeatedPassword) {
        setInvalidRegisterMessage("Hasła muszą być takie same");
      }
    }
  };

  return (
    <Article>
      <H1 className="register">Rejestracja</H1>

      <Alert
        className="warning"
        message={
          "Ważne! Aplikacja jest w wersji testowej. Zadbaj o swoje bezpieczeństwo i używaj haseł, których nigdzie nie używasz."
        }
      />

      {isError && <Alert className="warning" message={isError} />}

      {isRegister && (
        <>
          <Alert
            className="warning"
            message={"Taka nazwa użytkownika już istnieje"}
          />
          <StyledLink to="/login">Zaloguj się</StyledLink>
        </>
      )}

      {invalidRegisterMessage && !isRegister && !isError && (
        <Alert className="error" message={invalidRegisterMessage} />
      )}

      {isSuccess && !isRegister && !isError && (
        <>
          <Alert
            className="success"
            message={"Zarejestrowano pomyślnie, możesz się zalogować"}
          />
          <StyledLink to="/login">Zaloguj się</StyledLink>
        </>
      )}

      <FormField
        id="username"
        name="username"
        type="string"
        placeholder="nazwa użytkownika (min. 4 znaki)*"
        value={formValues.username}
        onChange={handleInputChange}
      />
      <FormField
        id="password"
        name="password"
        type="password"
        placeholder="hasło (min. 8 znaków)*"
        value={formValues.password}
        onChange={handleInputChange}
      />
      <FormField
        id="repeatedPassword"
        name="repeatedPassword"
        type="password"
        placeholder="powtórz hasło*"
        value={formValues.repeatedPassword}
        onChange={handleInputChange}
      />
      <FormField
        id="description"
        name="description"
        type="string"
        placeholder="opis"
        value={formValues.description}
        onChange={handleInputChange}
      />
      <FormField
        id="restaurantName"
        name="restaurantName"
        type="string"
        placeholder="nazwa restauracji/miejsce pracy"
        value={formValues.restaurantName}
        onChange={handleInputChange}
      />

      <StyledLink to="/login" hidden ref={loginRef}></StyledLink>
      <Button onClick={handleSubmit}>Rejestruj</Button>
    </Article>
  );
};

export default Register;
