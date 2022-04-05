import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.yellow};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSize.button};

  -webkit-box-shadow: 8px 8px 24px 0px rgba(255, 233, 180, 1);
  -moz-box-shadow: 8px 8px 24px 0px rgba(255, 233, 180, 1);
  box-shadow: 8px 8px 24px 0px rgba(255, 233, 180, 1);
`;
