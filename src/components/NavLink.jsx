// NavLink.jsx
import React from 'react';
import { Link, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';
export default function NavLink ({ children, isActive = false, onClick }) {
  const textColor = useColorModeValue('gray.800', 'white');
  const accentColor = 'purple.500';

  return (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        color: accentColor,
      }}
      fontWeight={500}
      color={isActive ? accentColor : textColor}
      cursor="pointer"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

NavLink.propTypes = {
  children: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
}