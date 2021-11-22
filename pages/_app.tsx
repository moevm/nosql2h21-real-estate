import { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { NextPage } from "next";
import { CssBaseline, ThemeProvider } from "@mui/material";
import AuthManager from "components/templates/AuthManager";
import { theme } from "theme";

import "../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ToastManager from "components/organisms/ToastManager";

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // const jssStyles = document.querySelector("#jss-server-side");
    // if (jssStyles) {
    //   jssStyles.parentElement?.removeChild(jssStyles);
    // }
  }, []);
  return (
    <>
      <Head>
        <title>NoSQL Proj</title>
      </Head>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AuthManager>
          <Component {...pageProps} />
        </AuthManager>
        <ToastManager />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
