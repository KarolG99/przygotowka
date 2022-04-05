import styled from "styled-components";

export const Description = styled.p`
  margin: 10px;
  span {
    margin-right: 5px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.yellow};
  }
`;
