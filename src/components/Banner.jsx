import {
  Box,
  Text,
  Container,
  Heading
} from "@chakra-ui/react";
import React, { useState } from "react";
import SearchBar from "./SearchBar";

const bannerImages = [
  "/image1.webp",
  "/image2.webp",
  "/image3.webp",
];

export default function Banner() {
  const [currentImage, setCurrentImage] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const accentColor = "purple.500";
  const gradientOverlay =
    "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)";
  return (
    <Box position="relative" height="600px">
      {/* Background Image Carousel */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundImage={`url(${bannerImages[currentImage]})`}
        backgroundSize="cover"
        backgroundPosition="center"
        transition="all 0.5s ease-in-out"
        overflow={"hidden"}
      />

      {/* Gradient Overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgGradient={gradientOverlay}
      />

      {/* Content Container */}
      <Container
        maxW="container.xl"
        height="100%"
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        px={{ base: 4, md: 8 }}
      >
        {/* Main Text Content */}
        <Box maxW="600px" color="white">
          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontFamily="'Playfair Display', serif"
            mb={4}
          >
            Discover Your Next Favorite Book with BookSpot!
          </Heading>

          <Text
            fontSize={{ base: "lg", md: "xl" }}
            fontFamily="'Inter', sans-serif"
            mb={8}
            opacity={0.9}
          >
            Search, Explore, and Dive into the World of Stories Today!
          </Text>

          {/* Search Bar */}
          <Box maxW="480px">
            <SearchBar />
          </Box>
        </Box>

        {/* Carousel Indicators */}
        <Box position="absolute" bottom={6} left={8} display="flex" gap={2}>
          {bannerImages.map((_, index) => (
            <Box
              key={index}
              w={2}
              h={2}
              borderRadius="full"
              bg={currentImage === index ? accentColor : "white"}
              opacity={currentImage === index ? 1 : 0.5}
              cursor="pointer"
              onClick={() => setCurrentImage(index)}
              transition="all 0.3s"
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}


