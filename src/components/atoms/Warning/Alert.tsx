import React from "react";
import { StyledAlert } from "./Alert.styles";

interface Props {
  message: string;
  className: string;
}

const Alert = ({ message, className }: Props) => {
  return <StyledAlert className={className}>{message}</StyledAlert>;
};

export default Alert;
