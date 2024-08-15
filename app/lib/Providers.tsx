"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

interface ProvidersProp {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<ProvidersProp> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
};
