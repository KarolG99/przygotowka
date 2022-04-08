import styled from "styled-components";

export const RestaurantName = styled.h2`
  position: relative;
  width: fit-content;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: -19px;
    z-index: -1;
    width: 100%;
    height: 8px;
    background-color: ${({ theme }) => theme.colors.yellow};
  }
`;
