import { useState, useContext, createContext, useEffect } from "react";
const AuthContext = createContext();
import { getUser, logout } from "../services/auth.services";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const token = localStorage.getItem("token");
  const fetchUser = async () => {
    const response = await getUser();
    setUser(response.data.user);
  };
  const signOut = async () => {
    logout();
    setUser(undefined);
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, []);
  const valuesToBeShared = { user, setUser, signOut };
  return (
    <AuthContext.Provider value={valuesToBeShared}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
