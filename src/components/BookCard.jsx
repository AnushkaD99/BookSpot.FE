import { Button, Card, CardBody, Heading, HStack, IconButton, Image, Stack, Text, useTheme} from "@chakra-ui/react";
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { LuBookOpen, LuTrash2 } from "react-icons/lu";

export default function BookCard({ id, title, author, coverImage }) {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Card
      key={id}
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
              // onClick={() => handleRemoveBook(id)}
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
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  author: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  imageURL: PropTypes.string.isRequired,
};
