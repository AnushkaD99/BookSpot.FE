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

export default function MyBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();
  const theme = useTheme();

  if (loading) {
    return (
      <Center h="calc(100vh - 64px)">
        <Spinner size="xl" color="purple.500" />
      </Center>
    );
  }

  return (
    <Box
      minH="calc(100vh - 64px)"
      bg={useColorModeValue("gray.50", "gray.900")}
      py={8}
    >
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
                // <Card
                //   key={book.id}
                //   bg={theme.colors.cardBg}
                //   borderWidth="1px"
                //   borderColor={theme.colors.borderColor}
                //   transition="all 0.3s"
                //   _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
                // >
                //   <CardBody>
                //     <Image
                //       src={book.coverImage || '/book-placeholder.png'}
                //       alt={book.title}
                //       borderRadius="lg"
                //       w="full"
                //       h="250px"
                //       objectFit="cover"
                //       mb={4}
                //     />
                //     <Stack spacing={3}>
                //       <Heading size="md" noOfLines={2}>
                //         {book.title}
                //       </Heading>
                //       <Text color={theme.colors.text} fontSize="sm">
                //         by {book.author}
                //       </Text>
                //       <HStack justify="space-between" pt={2}>
                //         <Button
                //           variant="outline"
                //           colorScheme="purple"
                //           size="sm"
                //           leftIcon={<LuBookOpen size={16} />}
                //           onClick={() => navigate(`/book/${book.bookId}`)}
                //         >
                //           More Details
                //         </Button>
                //         <IconButton
                //           icon={<LuTrash2 size={16} />}
                //           colorScheme="red"
                //           variant="ghost"
                //           size="sm"
                //           // onClick={() => handleRemoveBook(book.id)}
                //           aria-label="Remove book"
                //         />
                //       </HStack>
                //     </Stack>
                //   </CardBody>
                // </Card>

                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.volumeInfo.title}
                  author={book.volumeInfo.authors}
                  coverImage={book.volumeInfo.imageLinks?.thumbnail}
                />
              ))}
            </Grid>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
