import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('shopease_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists
    const existingUsers = JSON.parse(localStorage.getItem('shopease_users') || '[]');
    const existingUser = existingUsers.find((user: User) => user.email === email);
    
    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem('shopease_user', JSON.stringify(existingUser));
      setIsLoading(false);
      return true;
    } else {
      setIsLoading(false);
      return false; // User not found
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('shopease_users') || '[]');
    const userExists = existingUsers.some((user: User) => user.email === email);
    
    if (userExists) {
      setIsLoading(false);
      return false; // User already exists
    }
    
    // Mock successful registration
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      phone: undefined
    };
    
    // Store new user
    existingUsers.push(mockUser);
    localStorage.setItem('shopease_users', JSON.stringify(existingUsers));
    
    setUser(mockUser);
    localStorage.setItem('shopease_user', JSON.stringify(mockUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shopease_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
