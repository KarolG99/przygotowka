import styled from "styled-components";
import { Scale } from "../RestaurantInfo/RestaurantInfo.styles";

export const FormFieldWrapper = styled.div`
  margin: 15px 0;
  animation: ${Scale} 0.37s ease-in-out;
  input {
    width: 80vw;
    max-width: 400px;
    margin: 10px;
    padding: 4px 2px;
    border: none;
    border-bottom: 3px solid ${({ theme }) => theme.colors.yellow};
    outline: none;
    border-radius: 0;
    font-weight: 600;
    font-size: 16px;
  }
`;
