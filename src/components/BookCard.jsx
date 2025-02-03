import {
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  useTheme,
  useToast,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { LuBookOpen, LuTrash2 } from "react-icons/lu";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function BookCard({ id, bookId, title, author, coverImage, onBookRemoved }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const toast = useToast();
  const {user} = useContext(UserContext);

  const bookDeleteURL = "http://localhost:5133/api/book"

  const handleRemoveBook = async (id) => {
    try {
      console.log(`${bookDeleteURL}/${id}`);
      const response = axios.delete(`${bookDeleteURL}/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      })
      console.log(response);
      toast({
        title: 'Book removed',
        description: 'The book has been removed from your collection.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onBookRemoved(id);

    } catch (error) {
      console.error("Error removing book:", error);
      toast({
        title: "Error",
        description: "Unable to remove the book. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Card
      key={bookId}
      bg={theme.colors.cardBg}
      borderWidth="1px"
      borderColor={theme.colors.borderColor}
      transition="all 0.3s"
      _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
    >
      <CardBody>
        <Image
          src={coverImage || "/book-placeholder.png"}
          alt={title}
          borderRadius="lg"
          w="full"
          h="250px"
          objectFit="cover"
          mb={4}
        />
        <Stack spacing={3}>
          <Heading size="md" noOfLines={2}>
            {title}
          </Heading>
          <Text color={theme.colors.text} fontSize="sm">
            by {author}
          </Text>
          <HStack justify="space-between" pt={2}>
            <Button
              variant="outline"
              colorScheme="purple"
              size="sm"
              leftIcon={<LuBookOpen size={16} />}
              onClick={() => navigate(`/book/${bookId}`)}
            >
              More Details
            </Button>
            <IconButton
              icon={<LuTrash2 size={16} />}
              colorScheme="red"
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveBook(id)}
              aria-label="Remove book"
            />
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
}

// Prop Validation
BookCard.propTypes = {
  bookId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  coverImage: PropTypes.string.isRequired,
};
