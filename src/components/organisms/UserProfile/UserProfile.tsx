import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { H1 } from "../../atoms/H1.styles";
import Navigation from "../../molecules/Navigation/Navigation";
import UserInfo from "../../molecules/UserInfo/UserInfo";
import { Article } from "../HomePage/HomePage.styles";

export interface IUserInfo {
  username?: string;
  description?: string;
  restaurantName?: string;
  _id: string;
}

interface ILogOut {
  id: string;
}

const UserProfile = () => {
  let { id } = useParams();
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

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
    }, [id]);

  return (
    <>
      {!isDataLoaded && (
        <Article>
          <h2>Ładowanie...</h2>
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
