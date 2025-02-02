import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Text,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const APIKEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch books from API
  const fetchBooks = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${APIKEY}`
      );
      setResults(response.data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change with debounce
  useEffect(() => {
    if (search.trim() === "") {
      setResults([]);
      return;
    }
    const debounce = setTimeout(() => fetchBooks(search), 300); // 300ms debounce
    return () => clearTimeout(debounce);
  }, [search]);

  return (
    <Box position="relative" w="100%">
      <InputGroup>
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter your book name"
        />
        <InputRightElement>
          <LuSearch />
        </InputRightElement>
      </InputGroup>

      {results.length > 0 && (
        <VStack
          position="absolute"
          top="100%"
          left="0"
          bg="white"
          boxShadow="lg"
          borderRadius="md"
          spacing={2}
          mt={2}
          p={2}
          zIndex={10}
          w="100%"
          maxH="300px"
          overflowY="auto"
        >
          {results.map((book) => (
            <Box
              key={book.id}
              onClick={() => navigate(`/book/${book.id}`)}
              cursor="pointer"
              w="100%"
              display="flex"
              alignItems="center"
              borderBottom="1px solid #e2e8f0"
              p={2}
            >
              <Image
                src={book.volumeInfo.imageLinks?.thumbnail || ""}
                alt={book.volumeInfo.title}
                boxSize="50px"
                mr={3}
              />
              <Box>
                <Text fontWeight="bold" color={"black"}>
                  {book.volumeInfo.title}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                </Text>
              </Box>
            </Box>
          ))}
        </VStack>
      )}

      {loading && <Text mt={2}>Loading...</Text>}
    </Box>
  );
}
