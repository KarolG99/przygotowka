import React, { useContext, useRef, useState } from "react";
import axios from "axios";

import Alert from "../../atoms/Warning/Alert";
import FormField from "../../molecules/FormField/FormField";
import useForm from "../../../hooks/useForm";
import { IUserInfo, LoginIFormValues } from "../../../types";
import { URL } from "../../../apiurl";
import { UserContext } from "../../../Providers/UserProvider";
import { Button } from "../../atoms/Button.styles";
import { H1 } from "../../atoms/H1.styles";
import { StyledLink } from "../../atoms/Link.styles";
import { Article } from "../HomePage/HomePage.styles";

const initialFormState: LoginIFormValues = {
  username: "",
  password: "",
};

export let ACCESS_TOKEN = "";

if (sessionStorage.getItem("secretToken")) {
  ACCESS_TOKEN = sessionStorage.getItem("secretToken") as string;
}

// reducer
// const ActionTypes = {
//   setIsLoading: "SET_IS_LOADING",
//   setIsLogIn: "SET_IS_LOGIN",
//   setInvalidLoginMessage: "SET_INVALID_LOGIN_MESSAGE",
//   SUCCESS_FETCH_DATA: "SUCCESS_FETCH_DATA",
// };

// interface State {
//   isLoading?: boolean;
//   isLogIn?: boolean;
//   invalidLoginMessage?: string;
// }
// interface Action {
//   type: string;
//   setIsLoading?: boolean;
//   setIsLogIn?: boolean;
//   setInvalidLoginMessage?: string;
// }
// const initialState: State = {
//   isLoading: false,
//   isLogIn: false,
//   invalidLoginMessage: "",
// };

// const reducer = (state: State, action: Action) => {
//   switch (action.type) {
//     case ActionTypes.setIsLoading:
//       state.isLoading = action.setIsLoading;
//       return state;
//     case ActionTypes.setIsLogIn:
//       state.isLogIn = action.setIsLogIn;
//       return state;
//     case ActionTypes.setInvalidLoginMessage:
//       state.invalidLoginMessage = action.setInvalidLoginMessage;
//       return state;
//     case ActionTypes.SUCCESS_FETCH_DATA:
//       return {
//         isLoading: false,
//         isLogIn: true,
//       };
//     default:
//       return state;
//   }
// };

const LogIn = () => {
  // const [state, dispatch] = useReducer<React.Reducer<State | any, Action>>(
  //   reducer,
  //   initialState
  // );
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [isLogIn, setIsLogIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [invalidLoginMessage, setInvalidLoginMessage] = useState("");
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { handleAddUser } = useContext(UserContext);
  const { formValues, setFormValues, handleInputChange } = useForm({
    initialFormState,
  });

  const handleLogIn = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const userToLogin = {
      username: formValues.username,
      password: formValues.password,
    };

    setIsLoading(true);

    await axios
      .post(`${URL}/users/login`, userToLogin, {
        headers: {
          "Content-type": "application/json",
          accept: "application/json",
        },
      })
      .then((res) => {
        setUserInfo(res.data.user);
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
        setIsLoading(false);
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
            required={true}
          />
          <FormField
            id="password"
            name="password"
            type="password"
            placeholder="hasło"
            value={formValues.password}
            onChange={handleInputChange}
            required={true}
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
          {userInfo && (
            <StyledLink to={`/${userInfo._id}/profile`} ref={linkRef}>
              Mój profil
            </StyledLink>
          )}
        </>
      )}
    </Article>
  );
};

export default LogIn;
