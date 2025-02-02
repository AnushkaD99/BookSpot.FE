import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import App from "./App";

const theme = extendTheme({
  colors: {
    bg: "gray.50",
    cardBg: "white",
    accent: "purple.500",
    text: "gray.600"
  }
});

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);