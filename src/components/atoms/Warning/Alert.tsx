import React from "react";
import { AlertProps } from "../../../types";
import { StyledAlert } from "./Alert.styles";

const Alert = ({ message, className }: AlertProps) => {
  return <StyledAlert className={className}>{message}</StyledAlert>;
};

export default Alert;
