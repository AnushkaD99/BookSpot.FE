import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { DetailPage, Home, Login, MyBooks, Register} from "./pages";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Flex direction={"column"} minH={"100vh"}>
        <NavBar />
        <Box flex="1" mb={10}>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/book/:bookId" element={<DetailPage />} />
            <Route path="/my-books" element={<MyBooks />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
        </Box>
        <Footer />
      </Flex>
    </Router>
  );
}

export default App;
