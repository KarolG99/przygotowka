import React, { useContext, useRef } from "react";
import { UserContext } from "../../../Providers/UserProvider";
import { StyledLink } from "../../atoms/Link.styles";
import { Article } from "../HomePage/HomePage.styles";

const GoToProfile = () => {
  const { user } = useContext(UserContext);
  const linkToProfileRef = useRef<HTMLAnchorElement>(null);

  return (
    <Article>
      {user[0] && (
        <StyledLink ref={linkToProfileRef} to={`/${user[0].id}/profile`}>
          Mój profil
        </StyledLink>
      )}
    </Article>
  );
};

export default GoToProfile;
