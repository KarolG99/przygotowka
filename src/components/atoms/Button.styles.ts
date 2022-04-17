import styled from "styled-components";

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.yellow};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 20px;
  border: none;
  font-size: ${({ theme }) => theme.fontSize.button};
  margin: 20px;
  cursor: pointer;
  -webkit-box-shadow: 8px 8px 24px 0px rgba(255, 233, 180, 1);
  -moz-box-shadow: 8px 8px 24px 0px rgba(255, 233, 180, 1);
  box-shadow: 8px 8px 24px 0px rgba(255, 233, 180, 1);

  &.add-task, &.close-form {
    border-radius: 10px;
  }

  &.close-form {
    background-color: ${({ theme }) => theme.colors.red};
  }
`;
