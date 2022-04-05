import React, { useState } from "react";
import {
  Nav,
  NavButton,
  NavList,
  NavListItem,
  StyledNavLink,
} from "./Navigation.styles";

interface Props {
  id: string;
}

const Navigation = ({ id }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpenMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <Nav isOpen={isOpen}>
      <NavButton onClick={toggleOpenMenu}>🍔</NavButton>
      <NavList>
        <NavListItem>
          <StyledNavLink onClick={() => setIsOpen(false)} to={`/${id}/profile`}>
            Mój profil
          </StyledNavLink>
        </NavListItem>
        <NavListItem>
          <StyledNavLink onClick={() => setIsOpen(false)} to={`/${id}/profile`}>
            Moje restauracje
          </StyledNavLink>
        </NavListItem>
        <NavListItem>
          <StyledNavLink onClick={() => setIsOpen(false)} to={`/${id}/add-restaurant`}>
            Dodaj restauracje
          </StyledNavLink>
        </NavListItem>
      </NavList>
    </Nav>
  );
};

export default Navigation;
