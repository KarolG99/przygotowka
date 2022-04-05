import styled from "styled-components";

export const H1 = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.h1};
  font-weight: 900;
  letter-spacing: 1px;
  width: fit-content;
  margin: auto;
  color: ${({ theme }) => theme.colors.yellow};

  &.register {
    margin-bottom: 50px;
  }
`;
