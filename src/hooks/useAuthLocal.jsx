import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "@/lib/api";

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} email
 * @property {string|null} full_name
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User|null} user
 * @property {boolean} loading
 * @property {boolean} isAuthenticated
 * @property {(email: string, password: string) => Promise<{error: Error|null}>} signIn
 * @property {(email: string, password: string, fullName: string) => Promise<{error: Error|null}>} signUp
 * @property {() => Promise<void>} signOut
 */

/** @type {React.Context<AuthContextType|undefined>} */
const AuthContext = createContext(undefined);

/**
 * @param {{ children: React.ReactNode }} props
 */
export function AuthProvider({ children }) {
  /** @type {[User|null, React.Dispatch<React.SetStateAction<User|null>>]} */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        const currentUser = await authApi.getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  /**
   * @param {string} email
   * @param {string} password
   */
  const signIn = async (email, password) => {
    try {
      const data = await authApi.signIn(email, password);
      setUser(data.user);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  /**
   * @param {string} email
   * @param {string} password
   * @param {string} fullName
   */
  const signUp = async (email, password, fullName) => {
    try {
      const data = await authApi.signUp(email, password, fullName);
      setUser(data.user);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    await authApi.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthenticated: !!user,
      signIn, 
      signUp, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * @returns {AuthContextType}
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
