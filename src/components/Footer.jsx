// Footer.jsx
import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  Flex,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { LuFacebook, LuInstagram, LuMail, LuTwitter } from 'react-icons/lu';

export default function Footer() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const accentColor = 'purple.500';

  return (
    <Box bg={bgColor} color={textColor}>
      <Container as={Stack} maxW={'container.xl'} py={10}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify={'space-between'}
          align={{ base: 'center', md: 'flex-start' }}
          spacing={8}
        >
          {/* Brand Section */}
          <Stack align={{ base: 'center', md: 'flex-start' }} mb={{ base: 8, md: 0 }}>
            <Text
              fontFamily="'Playfair Display', serif"
              fontSize="2xl"
              fontWeight="bold"
              color={useColorModeValue('gray.800', 'white')}
              mb={2}
            >
              BookSpot
            </Text>
            <Text fontSize={'sm'} textAlign={{ base: 'center', md: 'left' }}>
              Discover your next favorite book with us
            </Text>
          </Stack>

          {/* Quick Links */}
          <Stack align={{ base: 'center', md: 'flex-start' }}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>Quick Links</Text>
            <Link href={'#'} _hover={{ color: accentColor }}>Home</Link>
            <Link href={'#'} _hover={{ color: accentColor }}>My Books</Link>
            <Link href={'#'} _hover={{ color: accentColor }}>Browse Categories</Link>
            <Link href={'#'} _hover={{ color: accentColor }}>New Releases</Link>
          </Stack>

          {/* Support */}
          <Stack align={{ base: 'center', md: 'flex-start' }}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>Support</Text>
            <Link href={'#'} _hover={{ color: accentColor }}>Help Center</Link>
            <Link href={'#'} _hover={{ color: accentColor }}>Privacy Policy</Link>
            <Link href={'#'} _hover={{ color: accentColor }}>Terms of Service</Link>
            <Link href={'#'} _hover={{ color: accentColor }}>Contact Us</Link>
          </Stack>

          {/* Social Links */}
          <Stack align={{ base: 'center', md: 'flex-start' }}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2}>Connect With Us</Text>
            <Stack direction={'row'} spacing={6}>
              <Link href={'#'} _hover={{ color: accentColor }}>
                <LuFacebook size={20} />
              </Link>
              <Link href={'#'} _hover={{ color: accentColor }}>
                <LuTwitter size={20} />
              </Link>
              <Link href={'#'} _hover={{ color: accentColor }}>
                <LuInstagram size={20} />
              </Link>
              <Link href={'#'} _hover={{ color: accentColor }}>
                <LuMail size={20} />
              </Link>
            </Stack>
          </Stack>
        </Flex>

        <Divider my={6} />

        {/* Copyright */}
        <Text pt={2} fontSize={'sm'} textAlign={'center'}>
          © {new Date().getFullYear()} BookSpot. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};