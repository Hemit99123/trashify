

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css'
import Header from "./components/Header";
import { AuthProvider } from "./lib/Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trashify",
  description: "Find bins near you to disgrad your trash!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <AuthProvider>          
          <body className={inter.className}>
            <Header />
            {children}
          </body>
          </AuthProvider>

      </html>
  );
}
