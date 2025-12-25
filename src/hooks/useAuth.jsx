import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client-safe";

/**
 * @typedef {import('@supabase/supabase-js').User} User
 * @typedef {import('@supabase/supabase-js').Session} Session
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User|null} user
 * @property {Session|null} session
 * @property {boolean} loading
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
  /** @type {[Session|null, React.Dispatch<React.SetStateAction<Session|null>>]} */
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * @param {string} email
   * @param {string} password
   */
  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  /**
   * @param {string} email
   * @param {string} password
   * @param {string} fullName
   */
  const signUp = async (email, password, fullName) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAuthenticated: !!user, signIn, signUp, signOut }}>
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
