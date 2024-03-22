"use client";

import Login from "./login/Login";
import { getLoginCookies } from "@/utils/auth/handleCookies";
import useWindowDimensions from "@/hook/useWindowDimension";
import { useRouter } from "next/navigation";
import LoginMbl from "./login/LoginMbl";

export default function Page() {
  const cookies = getLoginCookies();
  const { width } = useWindowDimensions();
  const { push } = useRouter();


  if (cookies && width > 0) push("/home");

  return (
    <div className="h-screen w-screen">
      {width > 768 ? <Login /> : <LoginMbl />}
      
    </div>
  );
}
