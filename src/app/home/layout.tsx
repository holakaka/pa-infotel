"use client";
import { ReactElement, Suspense } from "react";
import { getLoginCookies } from "@/utils/auth/handleCookies";
import useWindowDimensions from "@/hook/useWindowDimension";
import { redirect } from "next/navigation";
import LeftBar from "./LeftBar";
import HeaderMbl from "./HeaderMbl";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  const cookies = getLoginCookies();
  const { width } = useWindowDimensions();
  if (!cookies && width > 0) redirect("/");

  return (
    <main className="relative">
      {width > 768 ? (
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex h-screen w-screen relative">
            <LeftBar />
            <div className="flex-1 overflow-y-auto bg-pa-home-grey">
              {children}
            </div>
          </div>
        </Suspense>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <div className="h-screen w-screen">
            <HeaderMbl />
            {children}
          </div>
        </Suspense>
      )}
    </main>
  );
}
