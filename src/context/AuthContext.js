import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthState = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token"); // Wir haben noch kein TOKEN

    const verifySession = async () => {
      const options = {
        headers: {
          token
        }
      };
      const res = await fetch(
        `${process.env.REACT_APP_API}/auth/verify-session`, // .env haben wir nicht und auch kein api
        options
      );
      const { error } = await res.json();
      if (error) {
        setIsAuthenticated(false);
        return localStorage.removeItem("token");
      }
      setIsAuthenticated(true);
    };

    verifySession();
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, error, setError, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthState as default, AuthContext };
