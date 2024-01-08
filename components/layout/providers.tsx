"use client";
import React from "react";
import ThemeProvider from "./ThemeToggle/theme-provider";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import { PersistGate } from 'redux-persist/integration/react'
export default function Providers({
  session,
  children,
}: {
  session: SessionProviderProps["session"];
  children: React.ReactNode;
}) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SessionProvider session={session}>{children}</SessionProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
