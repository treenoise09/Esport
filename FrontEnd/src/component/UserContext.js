import React, { createContext, useState, useEffect, useContext } from 'react';

export const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // This useEffect will only run once when the component is mounted,
  // it will check if there is user information in localStorage and set it to state
  useEffect(() => {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
    setIsLoading(false);
  }, []);

  // This useEffect will run every time the user state changes,
  // it will update the localStorage with new user information
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);
  const signOut = () => {
    // Clear user from state
    setUser(null);
    // Remove user from localStorage
    localStorage.removeItem('user');
  };
  return (
    <UserContext.Provider value={{ user, setUser,signOut,isLoading   }}>
      {children}
    </UserContext.Provider>
  );
};
