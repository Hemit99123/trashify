import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import HeaderLayout from "./wrapper/HeaderLayout"; // Import the new client component
import { AuthProvider } from "./lib/Providers";

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
      <AuthProvider>
      <body className={inter.className}>
        <HeaderLayout> {/* Render the client component */}
          {children}
        </HeaderLayout>
      </body>
      </AuthProvider>

    </html>
  );
}
