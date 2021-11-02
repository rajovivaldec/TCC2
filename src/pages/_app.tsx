import { useRouter } from "next/router";
import { useState } from "react";
import { Menu } from "../components/Menu";
import { AuthContextProvider } from "../contexts/AuthContext";
import { supabase } from "../lib/initSupabase";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();
  const isLoginPage = asPath === "/login" ? true : false;
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className={!toggleMenu ? "mainContainer" : "mainContainerMobile"}>
      {isLoginPage ? (
        <AuthContextProvider supabaseClient={supabase}>
          <Component {...pageProps} />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </AuthContextProvider>
      ) : (
        <AuthContextProvider supabaseClient={supabase}>
          <Menu toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
          <div className="mainWrapper">
            <Component {...pageProps} />
          </div>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </AuthContextProvider>
      )}
    </div>
  );
}

export default MyApp;
