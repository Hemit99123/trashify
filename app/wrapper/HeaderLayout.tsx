"use client";

import Header from "../components/Header";
import { usePathname } from "next/navigation";

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isManageRoute = pathname === "/manage/update";

  return (
    <>
      {!isManageRoute && <Header />}
      {children}
    </>
  );
}
