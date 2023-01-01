import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/sit-layout/layout";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { arEG } from "@mui/material/locale";
import { SessionProvider } from "next-auth/react";
import { store } from '../store'
import { Provider } from 'react-redux'

const theme = createTheme(
  {
    typography: {
      fontFamily: "harmattanB",
    },
    palette: {
      primary: {
        main: "#BE3F3F",
      },
      secondary: {
        main: "#FFFFFF",
      },
      error: {
        main: "#D1AA2C",
      },
    },
  },
  arEG
);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
