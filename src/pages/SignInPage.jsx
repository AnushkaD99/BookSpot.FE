// SignInPage.jsx
import React, { useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
  Divider,
  HStack,
  Link,
  FormErrorMessage,
  useTheme,
  useToast
} from '@chakra-ui/react';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

export default function SignInPage() {
  const theme = useTheme();
  const toast = useToast();
  const {user, setUser} = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const loginUrl = "http://localhost:5133/api/auth/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData.email);
    if (!validateForm()) return;
    
    try {
      const response = await axios.post(loginUrl, {
        userName: formData.email,
        password: formData.password
      },{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
    }});

      setUser(response.data);
      console.log(response.data.user);
      setFormData({ email: '', password: '' });
      setIsLoading(false);
      //redirect to home route
      window.location.href = "/";
      
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error signing in',
        description: 'Please check your credentials and try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      }); 
      setIsLoading(false);
      
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Box bg={theme.colors.bg} minH="calc(100vh - 64px)" py={12}>
      <Container maxW="container.sm">
        <VStack
          spacing={8}
          bg={theme.colors.cardBg}
          p={{ base: 6, md: 12 }}
          borderRadius="lg"
          boxShadow="lg"
          align="stretch"
        >
          {/* Header */}
          <VStack spacing={2} align="center">
            <Heading
              fontSize="3xl"
              fontFamily="'Playfair Display', serif"
            >
              Welcome Back to BookSpot
            </Heading>
            <Text color={theme.colors.text}>
              Sign in to access your reading universe
            </Text>
          </VStack>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter your password"
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      icon={showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <Box w="100%" textAlign="right">
                <Link
                  as={RouterLink}
                  to="/forgot-password"
                  color={theme.colors.accent}
                  fontSize="sm"
                >
                  Forgot Password?
                </Link>
              </Box>

              <Button
                type="submit"
                colorScheme="purple"
                size="lg"
                width="100%"
                isLoading={isLoading}
              >
                Sign In
              </Button>
            </VStack>
          </form>

          <VStack spacing={4}>
            <HStack w="100%">
              <Divider />
              <Text color={theme.colors.text} whiteSpace="nowrap" fontSize="sm">
                or continue with
              </Text>
              <Divider />
            </HStack>

            {/* Social Sign In Buttons */}
            <HStack spacing={4} width="100%">
              <Button
                w="full"
                variant="outline"
                leftIcon={<Box as="span" fontSize="1.5em">G</Box>}
              >
                Google
              </Button>
              <Button
                w="full"
                variant="outline"
                leftIcon={<Box as="span" fontSize="1.5em">f</Box>}
              >
                Facebook
              </Button>
            </HStack>

            {/* Sign Up Link */}
            <Text color={theme.colors.text}>
              Don't have an account?{' '}
              <Link
                as={RouterLink}
                to="/signup"
                color={theme.colors.accent}
                fontWeight="semibold"
              >
                Sign up
              </Link>
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};