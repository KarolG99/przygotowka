import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface Props {
  isOpen: boolean;
}

export const Nav = styled.nav`
  z-index: 1000;
  width: 80vw;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  background-color: ${({ theme }) => theme.colors.yellow};
  position: fixed;
  right: 0;
  bottom: 50px;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${({ isOpen }: Props) => (isOpen ? "0" : "100%")});
  -webkit-box-shadow: 7px 3px 24px 0px rgba(255, 235, 169, 1);
  -moz-box-shadow: 7px 3px 24px 0px rgba(255, 235, 169, 1);
  box-shadow: 7px 3px 24px 0px rgba(255, 235, 169, 1);
`;

export const NavList = styled.ul`
  padding: 0;
  list-style: none;
`;

export const NavListItem = styled.li`
  margin: 14px 0;
`;

export const NavButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.yellow};
  border: none;
  position: absolute;
  bottom: 0;
  left: -50px;
  cursor: pointer;
  -webkit-box-shadow: -12px 8px 24px 0px rgba(255, 235, 169, 1);
  -moz-box-shadow: -12px 8px 24px 0px rgba(255, 235, 169, 1);
  box-shadow: -12px 8px 24px 0px rgba(255, 235, 169, 1);
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
`;
