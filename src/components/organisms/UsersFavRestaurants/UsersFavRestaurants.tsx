import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { H1 } from "../../atoms/H1.styles";
import { ArrowIcon, LinkWithIcon } from "../../atoms/Icons.styles";
import { NoContent } from "../../atoms/NoContent.styles";
import FavRestaurant from "../../molecules/FavRestaurant/FavRestaurant";
import Navigation from "../../molecules/Navigation/Navigation";
import { Article } from "../HomePage/HomePage.styles";
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

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${id}`)
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
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:8000/users/${id}/fav-restaurants`)
      .then((res) => res.data)
      .then((data) => {
        setFavRestaurants(data);
        setIsDataLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      {userInfo && <Navigation id={userInfo?._id} />}

      <Article>
        {!isDataLoaded && <h2>Ładowanie...</h2>}

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
