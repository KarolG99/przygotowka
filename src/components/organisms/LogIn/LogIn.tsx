import axios from "axios";
import React, { useContext, useState } from "react";
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
}

const initialFormState: IFormValues = {
  username: "",
  password: "",
};

const LogIn = () => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [isLogIn, setIsLogIn] = useState(false);
  const [invalidLoginMessage, setInvalidLoginMessage] = useState("");
  const { handleAddUser } = useContext(UserContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const CheckUserInDB = async () => {
    const response = await axios.get("http://localhost:8000/users");
    const userFromDB = await response.data.filter(
      (user: { username: string; password: string }) => {
        if (
          user.username === formValues.username &&
          user.password === formValues.password
        ) {
          return user;
        }
      }
    );
    if (!userFromDB.length) {
      setInvalidLoginMessage("Ups.. podałeś złe dane");
    }
    if (userFromDB.length) return userFromDB;
  };

  const DisplayInvalidLoginMessage = (userFromDB: {
    username: string;
    password: string;
  }) => {

  };

  const handleLogIn = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userFromDB = await CheckUserInDB();

    if (userFromDB) {
      DisplayInvalidLoginMessage(userFromDB);
      console.log(userFromDB);
      handleAddUser({
        username: userFromDB[0].username,
        description: userFromDB[0].description,
        restaurantName: userFromDB[0].restaurantName,
        id: userFromDB[0]._id,
      });
      setIsLogIn(true);
      setFormValues(initialFormState);
    }
  };

  return (
    <Article>
      {!isLogIn ? (
        <>
          <H1>Zaloguj się</H1>

          <br />
          {invalidLoginMessage && (
            <Alert className="error" message={invalidLoginMessage} />
          )}
          <br />

          <FormField
            id="username"
            name="username"
            type="string"
            placeholder="nazwa użytkownika"
            value={formValues.username}
            onChange={handleInputChange}
          />
          <FormField
            id="password"
            name="password"
            type="password"
            placeholder="hasło"
            value={formValues.password}
            onChange={handleInputChange}
          />
          <Button onClick={handleLogIn}>Zaloguj</Button>
        </>
      ) : (
        <>
          <H1>Zalogowano</H1>
          <br />
          <br />
          <br />
          <StyledLink to="/go-to">Dalej</StyledLink>
        </>
      )}
    </Article>
  );
};

export default LogIn;
