import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { createTheme } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {},
  },
});
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <NextUIProvider theme={darkTheme}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </NextUIProvider>
  );
}
