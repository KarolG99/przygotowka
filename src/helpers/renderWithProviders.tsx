import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "../assets/styles/theme";

interface Props {
    children: React.ReactNode;
}

export const renderWithProviders = ({ children }: Props) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};
