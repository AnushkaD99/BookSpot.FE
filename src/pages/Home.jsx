import { Box, Container, Flex, Text, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import Banner from "../components/Banner";
import axios from "axios";

export default function Home() {
  const [latestBooks, setLatestBooks] = useState([]);

  const APIKEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  // Fetch latest books on site load
  const fetchLatestBooks = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&maxResults=5&langRestrict=en&key=${APIKEY}`
      );
      setLatestBooks(response.data.items || []);
    } catch (error) {
      console.error("Error fetching latest books:", error);
    }
  };

  useEffect(() => {
    fetchLatestBooks();
  }, []);

  return (
    <Box w={"100%"}>
      <Banner />
      <Container
        maxW="container.xl"
        height="100%"
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        px={{ base: 4, md: 8 }}
      >
        <VStack gap={5} mt={10}>
          <Text align={"left"} fontSize={28} fontWeight={"bold"}>
            New Arrivals
          </Text>
          <Flex
            gap={10}
            alignItems={"center"}
            justifyContent={{ base: "center", md: "space-between"}}
            w={"100%"}
            flexWrap={"wrap"}
          >
            {latestBooks.map((book) => (
              <BookCard
                key={book.id}
                bookId={book.id}
                title={book.volumeInfo.title}
                author={book.volumeInfo.authors}
                coverImage={book.volumeInfo.imageLinks?.thumbnail}
              />
            ))}
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}