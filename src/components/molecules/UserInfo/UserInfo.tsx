import React from "react";
import { Description } from "../../atoms/Description.styles";
import { Username } from "../../atoms/username.styles";
import { IUserInfo } from "../../organisms/UserProfile/UserProfile";
import { UserInfoWrapper } from "./UserInfo.Styles";

const UserInfo = ({ username, description, restaurantName }: IUserInfo) => {
  return (
    <>
      <Username>{username}</Username>
      <UserInfoWrapper>
        <Description>
          <span>Opis: </span> {description ? description : "-"}
        </Description>
        <Description>
          <span>Restauracja:</span> {restaurantName ? restaurantName : "-"}
        </Description>
      </UserInfoWrapper>
    </>
  );
};

export default UserInfo;
