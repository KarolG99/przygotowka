import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { URL } from "../../../apiurl";
import { UserContext } from "../../../Providers/UserProvider";
import { Button } from "../../atoms/Button.styles";
import { H1 } from "../../atoms/H1.styles";
import { StyledLink } from "../../atoms/Link.styles";
import Alert from "../../atoms/Warning/Alert";
import FormField from "../../molecules/FormField/FormField";
import { Article } from "../HomePage/HomePage.styles";
import { IUserInfo } from "../UserProfile/UserProfile";

interface IFormValues {
  username: string;
  password: string;
}

const initialFormState: IFormValues = {
  username: "",
  password: "",
};

export let ACCESS_TOKEN = "";

if (sessionStorage.getItem("secretToken")) {
  ACCESS_TOKEN = sessionStorage.getItem("secretToken") as string;
}

const LogIn = () => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [isLogIn, setIsLogIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [invalidLoginMessage, setInvalidLoginMessage] = useState("");
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { handleAddUser } = useContext(UserContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogIn = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const userToLogin = {
      username: formValues.username,
      password: formValues.password,
    };

    await axios
      .post(`${URL}/users/login`, userToLogin, {
        headers: {
          "Content-type": "application/json",
          accept: "application/json",
        },
      })
      .then((res) => {
        setUserInfo(res.data.user);
        setIsLoading(true);
        if (res.status === 200) return res.data;
        else return res.statusText;
      })
      .then((data) => {
        if (data.access_token) {
          ACCESS_TOKEN = data.access_token;
          window.sessionStorage.setItem(
            "secretToken",
            JSON.stringify(data.access_token)
          );
        }
      })
      .catch((err) => {
        setInvalidLoginMessage("Nieprawidłowa nazwa użytkownika lub hasło");
        console.log(err);
      });

    // zalogowanie sie po zaladowaniu danych
    if (!invalidLoginMessage) {
      if (submitBtnRef.current) {
        submitBtnRef.current.click();
      }
    }

    if (userInfo) {
      handleAddUser({
        username: userInfo.username,
        description: userInfo.description,
        restaurantName: userInfo.restaurantName,
        id: userInfo._id,
      });
      setIsLoading(false);
      setIsLogIn(true);
      setFormValues(initialFormState);
    }

    if (linkRef.current) {
      linkRef.current.click();
    }
  };

  return (
    <Article>
      {!isLogIn ? (
        <>
          <H1>Zaloguj się</H1>

          <br />
          {isLoading && !invalidLoginMessage && (
            <Alert className="success" message="Ładowanie.." />
          )}

          {invalidLoginMessage && !isLoading && (
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
          <Button ref={submitBtnRef} onClick={handleLogIn}>
            Zaloguj
          </Button>
        </>
      ) : (
        <>
          <H1>Zalogowano</H1>
          <br />
          <br />
          <br />
          {userInfo  && (
            <StyledLink to={`/${userInfo._id}/profile`} ref={linkRef}>Mój profil</StyledLink>
          )}
        </>
      )}
    </Article>
  );
};

export default LogIn;
