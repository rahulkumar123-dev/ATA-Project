// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const access = localStorage.getItem('access_token');
    const refresh = localStorage.getItem('refresh_token');

    if (access && refresh) {
      setAuthTokens({ access, refresh });

      try {
        const decodedUser = jwtDecode(access);
        setUser(decodedUser);
      } catch (err) {
        console.error('Failed to decode access token', err);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);