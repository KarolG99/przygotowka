import styled from "styled-components";
import { Wrapper } from "../../atoms/Wrapper.styles";

export const Task = styled(Wrapper)`
  padding-top: 10px;
  width: 80vw;
  max-width: 500px;

  -webkit-box-shadow: 0px 3px 13px -6px rgba(170, 170, 170, 1);
  -moz-box-shadow: 0px 3px 13px -6px rgba(170, 170, 170, 1);
  box-shadow: 0px 3px 13px -6px rgba(170, 170, 170, 1);

  .title {
    font-size: 20px;
    font-weight: 800;
  }

  .category {
    font-weight: 800;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.colors.yellow};
  }

  .description {
    font-weight: 300;
  }

  .username {
    color: ${({ theme }) => theme.colors.grey};
    font-weight: 400;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 999px;
    padding: 3px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.white};
    -webkit-box-shadow: 0px 3px 13px -6px rgba(170, 170, 170, 1);
    -moz-box-shadow: 0px 3px 13px -6px rgba(170, 170, 170, 1);
    box-shadow: 0px 3px 13px -6px rgba(170, 170, 170, 1);
  }

  .username-doneIcon {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
