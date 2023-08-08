import type { AppProps } from "next/app";
import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { createTheme } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/NavBar";
import { ToastContainer } from "react-toastify";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      //make a palette with colors brown
      secondary: "#862B0D",
      secondaryLightContrast: "#862B0D",
      text: "#65451F",
      foreground: "#65451F",
      white: "#EAC696",
      backgroundAlpha: "#C8AE7D",
      linkColor: "#65451F",
      link: "#65451F",
      accents2: "#65451F",
      accents6: "#862B0D",
    },
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      linkColor: "white",
      link: "white",
      primary: "var(--nextui-colors-secondary)",
      primarySolidHover: "var(--nextui-colors-secondarySolidHover)",
      primaryShadow: "var(--nextui-colors-secondaryShadow)",
    },
  },
});
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <SessionProvider session={session}>
          <NavBar />
          <ToastContainer />
          <Component {...pageProps} />
        </SessionProvider>
      </NextUIProvider>
    </NextThemesProvider>
  );
}
