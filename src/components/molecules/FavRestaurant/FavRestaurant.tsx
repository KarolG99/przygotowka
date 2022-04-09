import React from "react";
import { Id } from "../../atoms/Id.styles";
import { RestaurantName } from "../../atoms/RestaurantName.styles";
import { Wrapper } from "../../atoms/Wrapper.styles";

interface Props {
  name: string;
  _id: string;
  children: JSX.Element;
}
const FavRestaurant = ({ name, _id, children }: Props) => {
  return (
    <Wrapper className="fav-restaurants">
      <div>
        <h4>
          ID: <Id>{_id}</Id>
        </h4>
        <RestaurantName>{name}</RestaurantName>
      </div>
      {children}
    </Wrapper>
  );
};

export default FavRestaurant;
