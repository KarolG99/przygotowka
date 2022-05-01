import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../../../apiurl";
import { H1 } from "../../atoms/H1.styles";
import { StyledLink } from "../../atoms/Link.styles";
import { UnauthorizedH2 } from "../../atoms/Unauthorized.styles";
import Navigation from "../../molecules/Navigation/Navigation";
import UserInfo from "../../molecules/UserInfo/UserInfo";
import { Article } from "../HomePage/HomePage.styles";
import { ACCESS_TOKEN } from "../LogIn/LogIn";

export interface IUserInfo {
  username: string;
  description: string;
  restaurantName: string;
  _id: string;
  favRestaurants?: {
    name: string;
  }[];
}

const UserProfile = () => {
  let { id } = useParams();
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (ACCESS_TOKEN) {
      axios.defaults.headers.common[
        "x-access-token"
      ] = `Bearer ${ACCESS_TOKEN}`;

      axios
        .get(`${URL}/users/${id}`)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setIsDataLoaded(true);
          setUserInfo({
            username: data.username,
            description: data.description,
            restaurantName: data.restaurantName,
            _id: data._id,
          });
        })
        .catch((err) => {
          console.log(err);
          setErrorMsg("Coś poszło nie tak");
        });
    } else {
      setErrorMsg("Musisz się zalogować");
    }
  }, [id]);

  return (
    <>
      {!isDataLoaded && !errorMsg && (
        <Article>
          <h2>Ładowanie...</h2>
        </Article>
      )}

      {errorMsg && (
        <Article>
          <UnauthorizedH2>Musisz się zalogować</UnauthorizedH2>
          <StyledLink to="/login">Zaloguj się</StyledLink>
        </Article>
      )}

      {userInfo && isDataLoaded && (
        <>
          <Navigation id={userInfo?._id} />

          <Article>
            <H1>Mój Profil</H1>
            <UserInfo
              username={userInfo.username}
              description={userInfo.description}
              restaurantName={userInfo.restaurantName}
              _id={userInfo._id}
            />
          </Article>
        </>
      )}
    </>
  );
};

export default UserProfile;
