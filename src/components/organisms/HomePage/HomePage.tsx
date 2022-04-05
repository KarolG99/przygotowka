import React from "react";
import { StyledLink } from "../../atoms/Link.styles";
import { H1 } from "../../atoms/H1.styles";
import {
  Article,
  Instruction,
  LinksWrapper,
  SingleLink,
  StyledCookingIcon,
} from "./HomePage.styles";

const HomePage = () => {
  return (
    <Article>
      <H1>Przygotówka</H1>

      <Instruction>
        <div className="content">
          <h2>Przygotuj sie lepiej do serwisu</h2>
          <ul>
            <li>Stwórz profil użytkownika</li>
            <li>Stwórz profil swojej restauracji</li>
            <li>Dodaj swoich wspołpracowników</li>
            <li>Wspólnie dzielcie się zadaniami</li>
          </ul>
        </div>
        <StyledCookingIcon />
      </Instruction>

      <LinksWrapper>
        <SingleLink>
          <p>Masz konto:</p> <StyledLink to="/login">Zaloguj się</StyledLink>
        </SingleLink>

        <SingleLink>
          <p>Nie masz konta:</p>
          <StyledLink to="/register">Zarejestruj się</StyledLink>
        </SingleLink>
      </LinksWrapper>
    </Article>
  );
};

export default HomePage;
