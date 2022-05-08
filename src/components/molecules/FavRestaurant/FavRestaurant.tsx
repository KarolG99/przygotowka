import React from "react";
import { FavRestaurantProps } from "../../../types";
import { Id } from "../../atoms/Id.styles";
import { RestaurantName } from "../../atoms/RestaurantName.styles";
import { Wrapper } from "../../atoms/Wrapper.styles";

const FavRestaurant = ({ name, _id, children }: FavRestaurantProps) => {
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
