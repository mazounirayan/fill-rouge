import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setIsAuthenticated(true);
    }
  }, []);
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`http://localhost:5000/employees?email=${email}&password=${password}`);
      const data = await response.json();
  
      if (data.length > 0) {
        const user = data[0];
        if (user.password === password) {
          setIsAuthenticated(true);
          localStorage.setItem('email', email);
          Toastify({
            text: 'Connexion réussie !',
            duration: 3000,
            backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
          }).showToast();
        } else {
          throw new Error('Invalid email or password');
        }
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      Toastify({
        text: 'Email ou mot de passe invalide.',
        duration: 3000,
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
      }).showToast();
  
      throw new Error('Invalid email or password');
    }
  };
  

  const logout = () => {
    setIsAuthenticated(false);
    Toastify({
      text: 'Déconnexion réussie !',
      duration: 3000,
      backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
    }).showToast();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
