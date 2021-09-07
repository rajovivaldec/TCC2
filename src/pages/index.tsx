import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { supabase } from "../lib/initSupabase";
import Login from "./login";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const [showResetPass, setShowResetPass] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event);
        if (event === "PASSWORD_RECOVERY") setShowResetPass(true);
        if (event === "USER_UPDATED")
          setTimeout(() => {
            setShowResetPass(false);
            Router.push("/login");
          }, 1300);
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <>
      {user && showResetPass ? (
        <Login.UpdatePassword supabase={supabase} />
      ) : (
        <div>
          <h1>Olá Mundoo!</h1>
        </div>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user } = await supabase.auth.api.getUserByCookie(ctx.req);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
