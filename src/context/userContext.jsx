import React, { createContext, useState, useEffect, useMemo } from 'react';

// Change to capital letter
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("a");

  // Load user data from local storage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user data to local storage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Create the memoized context value
  const userProviderValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={userProviderValue}>
      {children}
    </UserContext.Provider>
  );
};

// Export with capital letter
export { UserProvider, UserContext };