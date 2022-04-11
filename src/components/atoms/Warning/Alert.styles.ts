import styled from "styled-components";

export const StyledAlert = styled.h3`
  padding: 7px 13px;
  border-radius: 5px;
  margin: 10px 0 20px 0;
  font-weight: 300;
  width: 80vw;
  max-width: 700px;

  &.warning {
    background-color: ${({ theme }) => theme.colors.warning};
  }

  &.success {
    background-color: ${({ theme }) => theme.colors.success};
  }

  &.error {
    background-color: ${({ theme }) => theme.colors.error};
  }
`;
