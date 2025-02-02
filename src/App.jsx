import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home, Login, Register} from "./pages";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <Flex direction={"column"} minH={"100vh"}>
        <NavBar />
        <Box flex="1" mb={10}>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
        </Box>
        <Routes>
        </Routes>
      </Flex>
    </Router>
  );
}

export default App;
