import { useEffect, useState } from "react";
import Router from "next/router";
import Link from "next/link";
import { supabase } from "../lib/initSupabase";
import { useAuth } from "../contexts/AuthContext";
import { ResetPassword } from "../components/ResetPassword";

export default function Dashboard() {
  const [showResetPass, setShowResetPass] = useState(false);
  const [messageRedirect, setMessageRedirect] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setShowResetPass(true);
      if (event === "USER_UPDATED") {
        setMessageRedirect(true);
        setTimeout(() => {
          setShowResetPass(false);
          setMessageRedirect(false);
          Router.push("/");
        }, 2000);
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  if (!user) {
    return (
      <div style={{ width: "300px" }}>
        <h2 style={{ marginBottom: "1.5rem" }}>
          Necessário estar logado para acessar essa página
        </h2>
        <Link href="/login">
          <a
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              color: "#9b9e00",
            }}
          >
            Logar aqui
          </a>
        </Link>
      </div>
    );
  }

  return (
    <>
      {showResetPass ? (
        <>
          <ResetPassword />
          {messageRedirect && (
            <p style={{ marginTop: "1rem" }}>
              Redirecionando para o Dashboard..
            </p>
          )}
        </>
      ) : (
        <div>
          <h1>Olá Mundoo!</h1>
        </div>
      )}
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { user } = await supabase.auth.api.getUserByCookie(ctx.req);

//   if (!user) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };
