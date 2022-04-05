import styled from "styled-components";

export const Username = styled.h2`
  margin: 30px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: -5%;
    z-index: -1;
    width: 110%;
    height: 8px;
    background-color: ${({ theme }) => theme.colors.yellow};
  }
`;
