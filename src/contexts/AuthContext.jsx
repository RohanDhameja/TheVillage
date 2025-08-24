import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('village_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock authentication - replace with real auth service
    const mockUser = {
      id: '1',
      email,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      children: [
        {
          id: '1',
          name: 'Emma',
          age: 7,
          needs: ['Autism', 'Sensory Processing'],
          interests: ['Art', 'Music', 'Animals']
        }
      ],
      location: 'San Francisco, CA',
      verified: true,
      joinedDate: '2024-01-15'
    };
    
    localStorage.setItem('village_user', JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  };

  const signup = async (userData) => {
    // Mock signup - replace with real auth service
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      verified: false,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    
    localStorage.setItem('village_user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('village_user');
    setUser(null);
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('village_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};