
import React, { createContext, useContext, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // These are mock functions for now
  const login = async (email: string, password: string) => {
    // In a real app, this would call an API
    console.log("Logging in with:", email, password);
    
    // Mock successful login
    setUser({
      id: "1",
      name: "Demo User",
      email: email,
      avatarUrl: "https://ui-avatars.com/api/?name=Demo+User&background=random",
    });
  };

  const loginWithGoogle = async () => {
    // In a real app, this would initiate Google OAuth
    console.log("Logging in with Google");
    
    // Mock successful Google login
    setUser({
      id: "2",
      name: "Google User",
      email: "user@gmail.com",
      avatarUrl: "https://ui-avatars.com/api/?name=Google+User&background=random",
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    // In a real app, this would call an API to create a user
    console.log("Signing up:", name, email, password);
    
    // Mock successful signup
    setUser({
      id: "3",
      name: name,
      email: email,
      avatarUrl: `https://ui-avatars.com/api/?name=${name.replace(" ", "+")}&background=random`,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
