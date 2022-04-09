import styled from "styled-components";
import { ReactComponent as Add } from "../../assets/icons/add.svg";
import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";
import { StyledLink } from "./Link.styles";

export const LinkWithIcon = styled(StyledLink)`
  background-color: ${({ theme }) => theme.colors.yellow};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: fit-content;
  border-radius: 5px;
  margin: 15px 5px 5px 5px;
`;

export const AddIcon = styled(Add)`
  fill: ${({ theme }) => theme.colors.white};
  height: 10px;
`;

export const ArrowIcon = styled(Arrow)`
  height: 17px;
  width: 17px;
`;
