import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Card,
  CardBody,
  Image,
  Stack,
  Button,
  useToast,
  Center,
  Spinner,
  useColorModeValue,
  VStack,
  IconButton,
  HStack,
  useTheme,
} from "@chakra-ui/react";
import { LuTrash2, LuBookOpen } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import BookCard from "../components/BookCard";
import axios from "axios";

export default function MyBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();
  const theme = useTheme();

  const getFavBooksURL = `http://localhost:5133/api/book?userId=${user?.id}`;

  const fetchUserBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(getFavBooksURL, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setBooks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      toast({
        title: "Error fetching books",
        description: "Unable to load your books. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookRemoved = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  useEffect(() => {
    fetchUserBooks();
  }, []);

  if (loading) {
    return (
      <Center h="calc(100vh - 64px)">
        <Spinner size="xl" color="purple.500" />
      </Center>
    );
  }

  return (
    <Box minH="calc(100vh - 64px)" bg={"gray.50"} py={8}>
      <Container maxW="container.xl">
        <VStack spacing={6} align="stretch">
          <Box>
            <Heading size="xl" mb={2}>
              My Books
            </Heading>
            <Text color={theme.colors.text}>
              Your personal reading collection
            </Text>
          </Box>

          {books.length === 0 ? (
            <Card
              bg={theme.colors.cardBg}
              borderWidth="1px"
              borderColor={theme.colors.borderColor}
            >
              <CardBody>
                <Center p={8}>
                  <VStack spacing={4}>
                    <LuBookOpen size={48} />
                    <Text fontSize="lg">Your book collection is empty</Text>
                    <Text color={theme.colors.text} textAlign="center">
                      Start adding books to your collection to see them here
                    </Text>
                    <Button
                      colorScheme="purple"
                      onClick={() => (window.location.href = "/")}
                    >
                      Browse Books
                    </Button>
                  </VStack>
                </Center>
              </CardBody>
            </Card>
          ) : (
            <Grid
              templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
              }}
              gap={6}
            >
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  bookId={book.isbn}
                  title={book.title}
                  author={book.author}
                  coverImage={book.coverImage}
                  onBookRemoved={handleBookRemoved}
                />
              ))}
            </Grid>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
