import React from "react";

import { IUserInfo } from "../../../types";
import { Description } from "../../atoms/Description.styles";
import { Username } from "../../atoms/username.styles";
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
