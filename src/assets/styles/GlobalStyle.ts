import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        width: 100vw;
        overflow-x: hidden;
    }
    *, *::after, *::before {
        box-sizing: inherit;
        margin: 0;
        padding: 0;
    }
    body {
        font-family: 'Montserrat', sans-serif;
    }
    a, button {
        font-family: 'Montserrat', sans-serif;
    }
`;
