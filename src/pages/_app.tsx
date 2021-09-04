import { useRouter } from "next/router";
import { useState } from "react";
import { Menu } from "../components/Menu";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();
  const isLoginPage = asPath === "/login" ? true : false;
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className={!toggleMenu ? "mainContainer" : "mainContainerMobile"}>
      {!isLoginPage && (
        <Menu toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      )}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
