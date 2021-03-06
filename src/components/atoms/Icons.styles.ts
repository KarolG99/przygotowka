import styled from "styled-components";
import { ReactComponent as Add } from "../../assets/icons/add.svg";
import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";
import { ReactComponent as Heart } from "../../assets/icons/heart.svg";
import { ReactComponent as User } from "../../assets/icons/user.svg";
import { ReactComponent as Done } from "../../assets/icons/done.svg";
import { ReactComponent as Logout } from "../../assets/icons/logout.svg";
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
  height: 12px;
  width: 12px;
  margin-right: 5px;

  &.add-task {
    margin: 0;
  }
`;

export const CloseIcon = styled(Add)`
  fill: ${({ theme }) => theme.colors.white};
  height: 12px;
  width: 12px;
  transform: rotate(45deg);
`;

export const ArrowIcon = styled(Arrow)`
  height: 17px;
  width: 17px;
`;

export const HeartIcon = styled(Heart)`
  fill: ${({ theme }) => theme.colors.white};
  width: 14px;
  height: 14px;
  margin-right: 5px;
`;

export const UserIcon = styled(User)`
  fill: ${({ theme }) => theme.colors.white};
  width: 14px;
  height: 14px;
  margin-right: 5px;
`;

export const DoneIcon = styled(Done)`
  fill: ${({ theme }) => theme.colors.green};
  width: 20px;
  height: 20px;
  margin: 5px;
`;

export const LogoutIcon = styled(Logout)`
  fill: ${({ theme }) => theme.colors.white};
  width: 14px;
  height: 14px;
  margin-right: 5px;
`;
