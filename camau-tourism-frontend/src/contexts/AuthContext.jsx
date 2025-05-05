import React, { createContext, useContext, useState, useEffect } from "react";
import { getInfoUser } from '../api/user_api';
import Cookies from 'js-cookie';

const authContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("authUser");
    return userData ? JSON.parse(userData) : null;
  });

  const [clientProfile, setClientProfile] = useState(() => {
    const profileData = localStorage.getItem("clientProfile");
    return profileData ? JSON.parse(profileData) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("authUser", JSON.stringify(user));
    else localStorage.removeItem("authUser");
  }, [user]);

  useEffect(() => {
    if (clientProfile) localStorage.setItem("clientProfile", JSON.stringify(clientProfile));
    else localStorage.removeItem("clientProfile");
  }, [clientProfile]);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) {
        setClientProfile(null);
        return;
      }
      try {
        const profile = await getInfoUser();
        setClientProfile(profile);
      } catch {
        setClientProfile(null);
      }
    }
    fetchProfile();
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    setClientProfile(null); 
  };

  const updateProfile = (profileData) => {
    setClientProfile(profileData);
    localStorage.setItem("clientProfile", JSON.stringify(profileData));
  };

  const logout = () => {
    setUser(null);
    setClientProfile(null);
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    localStorage.removeItem("authUser");
    localStorage.removeItem("clientProfile");
  };

  return (
    <authContext.Provider value={{ user, clientProfile, login, logout, updateProfile }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}