import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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

export default function SignUpPage() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fName.trim()) {
      newErrors.fName = 'First name is required';
    }
    if (!formData.lName.trim()) {
      newErrors.lLame = 'Last name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\W)/.test(formData.password)) {
      newErrors.password =
        'Password must contain at least one capital letter, one small letter, and one symbol';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const signupUrl = "http://localhost:5133/api/auth/register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("1")
    try {
      setIsLoading(true);

      const response = await axios.post(signupUrl, {
        firstName: formData.fName,
        lastName: formData.lName,
        email: formData.email,
        password: formData.password

      });
      console.log(response.data);
      setFormData({ email: '', password: '', fName: '', lName: '' });

      setIsLoading(false);
      toast({
        title: 'Account created successfully!',
        description: 'Welcome to BookSpot.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate("/signin");
    } catch (error) {
      setErrors(error);
      setIsLoading(false);
      toast({
        title: 'Error creating account',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    }
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
              Join BookSpot Today
            </Heading>
            <Text color={theme.colors.text}>
              Create an account to start your reading journey
            </Text>
          </VStack>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.name}>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  value={formData.fName}
                  onChange={(e) => setFormData({ ...formData, fName: e.target.value })}
                  placeholder="Enter your first name"
                />
                <FormErrorMessage>{errors.fName}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.lName}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={formData.lName}
                  onChange={(e) => setFormData({ ...formData, lName: e.target.value })}
                  placeholder="Enter your last name"
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

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
                    placeholder="Create a password"
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

              <FormControl isInvalid={errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirm your password"
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      icon={showConfirmPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="purple"
                size="lg"
                width="100%"
                isLoading={isLoading}
              >
                Create Account
              </Button>
            </VStack>
          </form>

          <VStack spacing={4}>
            <HStack w="100%">
              <Divider />
              <Text color={theme.colors.text} whiteSpace="nowrap" fontSize="sm">
                or sign up with
              </Text>
              <Divider />
            </HStack>

            {/* Social Sign Up Buttons */}
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

            {/* Sign In Link */}
            <Text color={theme.colors.text}>
              Already have an account?{' '}
              <Link
                as={RouterLink}
                to="/signin"
                color={theme.colors.accent}
                fontWeight="semibold"
              >
                Sign in
              </Link>
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}