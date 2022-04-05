import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../../Providers/UserProvider";
import { Button } from "../../atoms/Button.styles";
import { H1 } from "../../atoms/H1.styles";
import { StyledLink } from "../../atoms/Link.styles";
import Alert from "../../atoms/Warning/Alert";
import FormField from "../../molecules/FormField/FormField";
import { Article } from "../HomePage/HomePage.styles";

interface IFormValues {
  username: string;
  password: string;
  description: string;
  restaurantName: string;
  repeatedPassword: string;
}

const initialFormState: IFormValues = {
  username: "",
  password: "",
  description: "",
  restaurantName: "",
  repeatedPassword: "",
};

const Register = () => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const loginRef = useRef<HTMLAnchorElement>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [invalidRegisterMessage, setInvalidRegisterMessage] = useState("");
  const { handleAddUser } = useContext(UserContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const CheckUsernameInDB = async () => {
    const response = await axios.get("http://localhost:8000/users");
    const userFromDB = await response.data.map(
      (user: { username: string; _id: string }) => {
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
          .post("http://localhost:8000/users/create", newUser)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));

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

      {isRegister && (
        <>
          <Alert
            className="warning"
            message={"⚠️ Taka nazwa użytkownika już istnieje"}
          />
          <StyledLink to="/login">Zaloguj się</StyledLink>
        </>
      )}

      {invalidRegisterMessage && !isRegister && (
        <Alert className="error" message={invalidRegisterMessage} />
      )}

      {isSuccess && !isRegister && (
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
