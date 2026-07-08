import { useState, useContext, createContext, useEffect } from "react";
const AuthContext = createContext();
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setUser(jwtDecode(token));
    }
  }, []);
  const valuesToBeShared = { user, setUser };
  return (
    <AuthContext.Provider value={valuesToBeShared}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
