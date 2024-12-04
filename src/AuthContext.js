import React, { createContext, useState, useContext, useEffect } from "react";
import AuthService from "./services/AuthService";

// Create context
const AuthContext = createContext();

// AuthProvider component to manage auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [athleteId, setAthleteId] = useState(null); // Define athleteId state

  const login = async (credentials) => {
    try {
      const userData = await AuthService.login(credentials);

      if (userData) {
        setUser(userData);
        setRoles(userData.roles || []);
        setAthleteId(userData.athleteId || null); // Set athleteId from login response
        return userData;
      } else {
        throw new Error("User data is not available in response.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setRoles([]);
    setAthleteId(null); // Clear athleteId on logout
  };

  const isAuthenticated = () => !!user; // Returns true if user is not null

  const hasRole = (role) => roles.includes(role);

  const fetchUser = async () => {
    try {
      const storedUser = await AuthService.getUser();
      if (storedUser) {
        setUser(storedUser);
        setRoles(storedUser.roles || []);
        setAthleteId(storedUser.athleteId || null); // Set athleteId from response
      } else {
        setUser(null);
        setRoles([]);
        setAthleteId(null); // Clear athleteId if no user
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
      setRoles([]);
      setAthleteId(null); // Clear athleteId on error
    }
  };

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      fetchUser(); // Fetch user details on mount if authenticated
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        roles,
        athleteId, // Provide athleteId to the context
        login,
        logout,
        isAuthenticated,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the Auth context
export const useAuth = () => useContext(AuthContext);
