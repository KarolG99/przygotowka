import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 30px 10px;
  padding: 19px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 7px 31px -4px rgba(170, 170, 170, 1);
  -moz-box-shadow: 0px 7px 31px -4px rgba(170, 170, 170, 1);
  box-shadow: 0px 7px 31px -4px rgba(170, 170, 170, 1);

  &.fav-restaurants {
    h4 {
      margin: 10px 0;
    }

    h2 {
      margin: 10px 0;
    }
  }
`;
