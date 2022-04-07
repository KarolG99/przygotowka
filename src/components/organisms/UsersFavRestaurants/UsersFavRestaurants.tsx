import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { H1 } from "../../atoms/H1.styles";
import Navigation from "../../molecules/Navigation/Navigation";
import { Article } from "../HomePage/HomePage.styles";
import { IUserInfo } from "../UserProfile/UserProfile";

interface IRestaurantsInfo {
  name: string;
  _id?: string;
}

const UsersFavRestaurants = () => {
  let { id } = useParams();
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [allRestaurantInfo, setAllRestaurantInfo] = useState<
    IRestaurantsInfo[]
  >([]);
  const allRestaurants: string[] = [];
  const favRestaurants: string[] = [];

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
      .get("http://localhost:8000/restaurants")
      .then((res) => res.data)
      .then((data) => {
        setAllRestaurantInfo(data);
      })
      .catch((err) => console.log(err));

    if (userInfo) {
      userInfo.favRestaurants?.map((restautant) => {});
    }
  }, [id]);

  if (allRestaurantInfo) {
    allRestaurantInfo.map((restaurant, index) => {
      allRestaurants.push(restaurant.name);
    });
  }

  if (userInfo) {
    userInfo?.favRestaurants?.map((restaurant) => {
      favRestaurants.push(restaurant.name);
    });
  }

  allRestaurants.map((name, index) => {
    const actualFavRestaurants = favRestaurants.filter((favName) =>  favName === name )
    console.log(actualFavRestaurants)
  })

  console.log(userInfo)


  return (
    <>
      {!isDataLoaded && (
        <Article>
          <h2>Ładowanie...</h2>
        </Article>
      )}

      {userInfo && isDataLoaded && allRestaurants && (
        <>
          <Navigation id={userInfo?._id} />

          <Article>
            <H1>Moje restauracje</H1>
            {favRestaurants.map((restaurantName, index) => (
              <h2 key={index}>{restaurantName}</h2>
            ))}
          </Article>
        </>
      )}
    </>
  );
};

export default UsersFavRestaurants;
