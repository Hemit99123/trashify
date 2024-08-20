import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import {UserProvider} from '@auth0/nextjs-auth0/client'
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trashify",
  description: "Find bins near you to discard your trash!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <UserProvider>
        <body className={inter.className}>
          <Header />
            {children}
        </body>
        </UserProvider>

    </html>
  );
}
