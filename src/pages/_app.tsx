import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { createTheme } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/NavBar";
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
        <NavBar />
        <Component {...pageProps} />
      </SessionProvider>
    </NextUIProvider>
  );
}
