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

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

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
          .then((res) => {
            console.log(res.data)
          })
          .catch((err) => {
            setIsError("Co?? posz??o nie tak, spr??buj innej nazwy u??ytkownika");
            console.log(err);
          });

        setFormValues(initialFormState);
        setIsSuccess(true);
      } else if (formValues.username.length < 4) {
        setInvalidRegisterMessage("Nazwa u??ytkownika jest za kr??tka");
      } else if (formValues.password.length < 8) {
        setInvalidRegisterMessage("Has??o musi by?? d??u??sze");
      } else if (formValues.password !== formValues.repeatedPassword) {
        setInvalidRegisterMessage("Has??a musz?? by?? takie same");
      }
    }
  };

  return (
    <Article>
      <H1 className="register">Rejestracja</H1>

      <Alert
        className="warning"
        message={
          "Wa??ne! Aplikacja jest w wersji testowej. Zadbaj o swoje bezpiecze??stwo i u??ywaj hase??, kt??rych nigdzie nie u??ywasz."
        }
      />

      {isError && <Alert className="warning" message={isError} />}

      {isRegister && (
        <>
          <Alert
            className="warning"
            message={"Taka nazwa u??ytkownika ju?? istnieje"}
          />
          <StyledLink to="/login">Zaloguj si??</StyledLink>
        </>
      )}

      {invalidRegisterMessage && !isRegister && !isError && (
        <Alert className="error" message={invalidRegisterMessage} />
      )}

      {isSuccess && !isRegister && !isError && (
        <>
          <Alert
            className="success"
            message={"Zarejestrowano pomy??lnie, mo??esz si?? zalogowa??"}
          />
          <StyledLink to="/login">Zaloguj si??</StyledLink>
        </>
      )}

      <FormField
        id="username"
        name="username"
        type="string"
        placeholder="nazwa u??ytkownika (min. 4 znaki)*"
        value={formValues.username}
        onChange={handleInputChange}
      />
      <FormField
        id="password"
        name="password"
        type="password"
        placeholder="has??o (min. 8 znak??w)*"
        value={formValues.password}
        onChange={handleInputChange}
      />
      <FormField
        id="repeatedPassword"
        name="repeatedPassword"
        type="password"
        placeholder="powt??rz has??o*"
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
