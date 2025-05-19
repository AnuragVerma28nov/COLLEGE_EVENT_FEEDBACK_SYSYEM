import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

interface User {
  id: string;
  email: string;
  role: 'student' | 'admin';
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, studentId: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on initial load
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Skip JWT decode for mock tokens
        if (token.startsWith('mock_token_')) {
          const [, userId, role] = token.split('_');
          const mockUsers = [
            { id: '1', email: 'student@college.edu', role: 'student', name: 'Anna Student' },
            { id: '2', email: 'admin@college.edu', role: 'admin', name: 'Admin User' },
          ];
          const mockUser = mockUsers.find(u => u.id === userId);
          if (mockUser) {
            setUser({
              id: mockUser.id,
              email: mockUser.email,
              role: mockUser.role as 'student' | 'admin',
              name: mockUser.name,
            });
          }
        } else {
          // In a real app, validate token with backend
          const decoded = jwtDecode<User & { exp: number }>(token);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp > currentTime) {
            setUser({
              id: decoded.id,
              email: decoded.email,
              role: decoded.role,
              name: decoded.name,
            });
          } else {
            localStorage.removeItem('token');
          }
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate it with mock data
      const mockUsers = [
        { id: '1', email: 'student@college.edu', password: 'password', role: 'student', name: 'Anna Student' },
        { id: '2', email: 'admin@college.edu', password: 'password', role: 'admin', name: 'Admin User' },
      ];
      
      // Normalize the email by trimming whitespace and converting to lowercase
      const normalizedEmail = email.trim().toLowerCase();
      
      const user = mockUsers.find(u => 
        u.email.toLowerCase() === normalizedEmail && 
        u.password === password
      );
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // Mock token creation
      const token = 'mock_token_' + user.id + '_' + user.role;
      localStorage.setItem('token', token);
      
      setUser({
        id: user.id,
        email: user.email,
        role: user.role as 'student' | 'admin',
        name: user.name,
      });
      
      // In the actual implementation, you would make an API call:
      // const response = await api.post('/auth/login', { email, password });
      // localStorage.setItem('token', response.data.token);
      // setUser(response.data.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, studentId: string) => {
    try {
      // In a real app, this would be an API call
      // For now, we'll simulate it
      
      // Mock registration success
      const newUser = {
        id: '3',
        email,
        role: 'student' as const,
        name,
      };
      
      // Mock token creation
      const token = 'mock_token_' + newUser.id + '_student';
      localStorage.setItem('token', token);
      
      setUser(newUser);
      
      // In the actual implementation, you would make an API call:
      // const response = await api.post('/auth/register', { name, email, password, studentId });
      // localStorage.setItem('token', response.data.token);
      // setUser(response.data.user);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};