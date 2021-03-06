import React, { useState } from "react";
import { NavigationProps } from "../../../types";
import {
  AddIcon,
  HeartIcon,
  LogoutIcon,
  UserIcon,
} from "../../atoms/Icons.styles";
import {
  Nav,
  NavButton,
  NavList,
  NavListItem,
  StyledNavLink,
} from "./Navigation.styles";

const Navigation = ({ id }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpenMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleLogOut = () => {
    window.sessionStorage.clear();
    setIsOpen(false);
  };

  return (
    <Nav isOpen={isOpen}>
      <NavButton onClick={toggleOpenMenu}>🍔</NavButton>

      <NavList>
        <NavListItem>
          <StyledNavLink onClick={() => setIsOpen(false)} to={`/${id}/profile`}>
            <UserIcon /> Mój profil
          </StyledNavLink>
        </NavListItem>

        <NavListItem>
          <StyledNavLink
            onClick={() => setIsOpen(false)}
            to={`/${id}/my-restaurants`}
          >
            <HeartIcon /> Moje restauracje
          </StyledNavLink>
        </NavListItem>

        <NavListItem>
          <StyledNavLink
            onClick={() => setIsOpen(false)}
            to={`/${id}/add-restaurant`}
          >
            <AddIcon /> Dodaj restauracje
          </StyledNavLink>
        </NavListItem>

        <NavListItem>
          <StyledNavLink onClick={handleLogOut} to={`/`}>
            <LogoutIcon /> Wyloguj
          </StyledNavLink>
        </NavListItem>
      </NavList>
    </Nav>
  );
};

export default Navigation;
