import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { H1 } from "../../atoms/H1.styles";
import Navigation from "../../molecules/Navigation/Navigation";
import RestaurantInfo from "../../molecules/RestaurantInfo/RestaurantInfo";
import { Article } from "../HomePage/HomePage.styles";
import { IUserInfo } from "../UserProfile/UserProfile";

interface IRestaurant {
  name: string;
  _id: string;
  tasks: [];
}

const RestaurantProfile = () => {
  const { id, restaurantID } = useParams();
  const [restaurantInfo, setRestaurantInfo] = useState<IRestaurant>();
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/restaurants/${restaurantID}`)
      .then((res) => res.data)
      .then((data) => {
        setIsDataLoaded(true);
        setRestaurantInfo(data);
      })
      .catch((err) => console.log(err));
  }, [restaurantID]);

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
        });
      })
      .catch((err) => console.log(err));
  }, [id, restaurantID]);

  return (
    <>
      {!isDataLoaded && (
        <Article>
          <h2>Ładowanie...</h2>
        </Article>
      )}

      {restaurantInfo && isDataLoaded && userInfo && (
        <>
          <Navigation id={userInfo?._id} />

          <Article>
            <H1>Profil Restauracji</H1>
            <RestaurantInfo
              name={restaurantInfo.name}
              _id={restaurantInfo._id}
              tasks={restaurantInfo.tasks}
            />
          </Article>
        </>
      )}
    </>
  );
};

export default RestaurantProfile;
