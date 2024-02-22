import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getProfile } from "../modules/fetch";

const AppContext = createContext();

export function AppProvider({ children }) {
  const token = Cookies.get("token");
  const currentUser = Cookies.get("currentUser");
  const userId = Cookies.get("userId");

  const [profile, setProfile] = useState({
    username: "",
    password: "",
    full_name: "",
    email: "",
    foto: "",
    bio: "",
  });
  const fetchProfile = async () => {
    try {
      if (!token) {
        return; // Skip fetching if there is no token
      }
      const response = await getProfile();

      if (!response) {
        return "No Profile Found";
      }

      setProfile(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AppContext.Provider
      value={{
        token,
        profile,
        currentUser,
        userId,
        fetchProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}
