import styled from "styled-components";
import { Wrapper } from "../../atoms/Wrapper.styles";

export const Task = styled(Wrapper)`
  padding-top: 10px;
  width: 80vw;
  max-width: 500px;

  -webkit-box-shadow: 0px 3px 13px -6px rgba(170, 170, 170, 1);
  -moz-box-shadow: 0px 3px 13px -6px rgba(170, 170, 170, 1);
  box-shadow: 0px 3px 13px -6px rgba(170, 170, 170, 1);

  .title {
    font-size: 20px;
    font-weight: 800;
  }

  .category {
    font-weight: 800;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.colors.yellow};
  }

  .description {
    font-weight: 300;
  }
`;
