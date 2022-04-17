import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../../../apiurl";
import { H1 } from "../../atoms/H1.styles";
import { ArrowIcon, LinkWithIcon } from "../../atoms/Icons.styles";
import { StyledLink } from "../../atoms/Link.styles";
import { NoContent } from "../../atoms/NoContent.styles";
import { UnauthorizedH2 } from "../../atoms/Unauthorized.styles";
import FavRestaurant from "../../molecules/FavRestaurant/FavRestaurant";
import Navigation from "../../molecules/Navigation/Navigation";
import { Article } from "../HomePage/HomePage.styles";
import { ACCESS_TOKEN } from "../LogIn/LogIn";
import { IUserInfo } from "../UserProfile/UserProfile";

export interface IRestaurantsInfo {
  name: string;
  _id: string;
}

const UsersFavRestaurants = () => {
  let { id } = useParams();
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [favRestaurants, setFavRestaurants] = useState<IRestaurantsInfo[]>();
  const [errorMsg, setErrorMsg] = useState("");
  // const ACCESS_TOKEN = window.localStorage.getItem("secretToken");

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
            favRestaurants: data.favRestaurants,
          });
        })
        .catch((err) => {
          setErrorMsg("Coś poszło nie tak");
          console.log(err);
        });

      axios
        .get(`${URL}/users/${id}/fav-restaurants`)
        .then((res) => res.data)
        .then((data) => {
          setFavRestaurants(data);
          setIsDataLoaded(true);
        })
        .catch((err) => console.log(err));
    } else {
      setErrorMsg("Musisz się zalogować");
    }
  }, [id]);

  return (
    <>
      {userInfo && <Navigation id={userInfo?._id} />}

      <Article>
        {!isDataLoaded && !errorMsg && <h2>Ładowanie...</h2>}

        {errorMsg && (
          <Article>
            <UnauthorizedH2>Musisz się zalogować</UnauthorizedH2>
            <StyledLink to="/login">Zaloguj się</StyledLink>
          </Article>
        )}

        {!favRestaurants?.length && userInfo && (
          <>
            <H1>Moje restauracje</H1>
            <NoContent>Nie masz żadnych restauracji</NoContent>
          </>
        )}

        {isDataLoaded && favRestaurants && userInfo && (
          <>
            {favRestaurants[0] && (
              <>
                <H1>Moje restauracje</H1>
                {favRestaurants.map((restaurant) => (
                  <React.Fragment key={restaurant._id}>
                    <FavRestaurant
                      key={restaurant._id}
                      name={restaurant.name}
                      _id={restaurant._id}
                    >
                      <LinkWithIcon
                        to={`/${userInfo?._id}/my-restaurants/${restaurant._id}`}
                      >
                        <ArrowIcon />
                      </LinkWithIcon>
                    </FavRestaurant>
                  </React.Fragment>
                ))}
              </>
            )}
          </>
        )}
      </Article>
    </>
  );
};

export default UsersFavRestaurants;
