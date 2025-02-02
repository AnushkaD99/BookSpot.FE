import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./context/UserContext";

const theme = extendTheme({
  colors: {
    bg: "gray.50",
    cardBg: "white",
    accent: "purple.500",
    text: "gray.600",
    borderColor: "gray.200"
  }
});

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>      
      <UserProvider>
        <App />
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>
);