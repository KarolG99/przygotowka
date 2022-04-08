import React from "react";
import { Id } from "../../atoms/Id.styles";
import { RestaurantName } from "../../atoms/RestaurantName.styles";
import { Wrapper } from "../../atoms/Wrapper.styles";
import { IRestaurantsInfo } from "../../organisms/UsersFavRestaurants/UsersFavRestaurants";

const FavRestaurants = ({ name, _id }: IRestaurantsInfo) => {
  return (
    <Wrapper className="fav-restaurants">
      <h4>
        ID: <Id>{_id}</Id>
      </h4>
        <RestaurantName>{name}</RestaurantName>
    </Wrapper>
  );
};

export default FavRestaurants;
