import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
:root {
  font-family: "Quicksand", system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-optical-sizing: auto;
  line-height: 1.5;
  font-weight: 300;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: #8AA6A3;
  text-decoration: inherit;
}

a:hover {
  color: #BFBFBF;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

#root {
  display: relative;
  width: 100%;
  height: 100%;
}

input {
  border-radius: 1rem;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #BFBFBF;
  transition: border-color 0.25s;
  color: #1a1a1a;
}
`;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyle />
    <App />
  </StrictMode>,
);
