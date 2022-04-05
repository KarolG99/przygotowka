import styled from "styled-components";
import { ReactComponent as CookingIcon } from "../../../assets/icons/undraw_cooking.svg";

export const Article = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10vh 20px 20px 20px;
`;

export const Instruction = styled.div`
  margin-top: 90px;
  max-width: 80vw;

  @media screen and (min-width: 1040px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: wrap-row;
  }

  .content {
    margin-right: 60px;
  }

  h2 {
    font-weight: 800;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 100px;
      height: 70%;
      background-color: ${({ theme }) => theme.colors.yellow};
      z-index: -1;
    }
  }

  ul {
    padding: 20px;
    font-weight: 300;
    font-size: 18px;
    list-style: none;

    li {
      position: relative;
      margin: 20px 2px;
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: -12px;
        transform: translate(-50%, -50%);
        width: 13px;
        height: 13px;
        background-color: ${({ theme }) => theme.colors.yellow};
        border-radius: 7px 4px 1px 3px;
        z-index: -1;
      }
    }
  }
`;

export const StyledCookingIcon = styled(CookingIcon)`
  width: 80vw;
  max-width: 400px;
  height: fit-content;
`;

export const LinksWrapper = styled.div`
  display: flex;
  flex-flow: wrap row;
  margin: 50px 0 40px 0;
`;

export const SingleLink = styled.div`
  margin: 15px;
  @media screen and (min-width: 600px) {
    margin: 40px;
  }

  p {
    font-weight: 500;
    margin-bottom: 20px;
  }
`;
