import { useEffect, useState, createContext, useContext } from "react";
import { User, Session } from "@supabase/supabase-js";

type AuthContextType = {
  user?: User;
  session?: Session;
};

const AuthContext = createContext({
  user: null,
  session: null,
} as AuthContextType);

export const AuthContextProvider = (props) => {
  const { supabaseClient } = props;
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabaseClient.auth.session();

    if (session) {
      setSession(session);
      setUser(session?.user ?? null);
    }

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        });
      }
    );

    return () => {
      authListener.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   const session = supabaseClient.auth.session();
  //   setSession(session);
  //   setUser(session?.user ?? null);
  //   const { data: authListener } = supabaseClient.auth.onAuthStateChange(
  //     async (event, session) => {
  //       setSession(session);
  //       setUser(session?.user ?? null);
  //     }
  //   );

  //   return () => {
  //     authListener.unsubscribe();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const value = {
    session,
    user,
  };
  return <AuthContext.Provider value={value} {...props} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthContextProvider.`);
  }
  return context;
};
