import { createContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase/firebase';

const AuthContext = createContext();

const AuthState = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser();
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const signIn = () => auth.signInWithPopup(googleProvider);
  const signOut = () => auth.signOut();

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthState as default, AuthContext };
