import styled, { keyframes } from "styled-components";
import { Wrapper } from "../../atoms/Wrapper.styles";

export const Scale = keyframes`
  0% {
    transform: scale(0.7);
    -webkit-transform: scale(0.7);
    -moz-transform: scale(0.7);
    -o-transform: scale(0.7);
    opacity: 0;

  }
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    opacity: 1;
  }
`;

export const DeleteTaskInfo = styled.p`
  background-color: ${({ theme }) => theme.colors.info};
  margin: 7px;
  padding: 5px 10px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.black};
  font-weight: 300;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    padding: 1px 10px;
    margin-left: 10px;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.black};
    border: none;
    border-radius: 5px;
    background-color: white;
    cursor: pointer;
  }
`;

export const Task = styled(Wrapper)`
  padding-top: 10px;
  width: 80vw;
  max-width: 500px;
  animation: ${Scale} 0.37s ease-in-out;
  -webkit-animation: ${Scale} 0.37s ease-in-out;
  -moz-animation: ${Scale} 0.37s ease-in-out;

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
