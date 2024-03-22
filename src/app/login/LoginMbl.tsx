import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import checkValidPassword from "../../utils/auth/Auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setLoginCookies } from "@/utils/auth/handleCookies";

export default function LoginMbl() {
  const [isHiddenPassword, setIsHiddenPassword] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>("admin");
  const [userPassword, setUserPassword] = useState<string>("admin");
  const { push } = useRouter();

  const handleEmailLogin = (event: any) => {
    setUserEmail(event.target.value);
  };
  const handlePasswordLogin = (event: any) => {
    setUserPassword(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };
  const handleLogin = async () => {
    try {
      const isValid = await checkValidPassword(userEmail, userPassword);
      if (isValid) {
        setLoginCookies(userEmail);
        setUserEmail("");
        setUserPassword("");
        toast.success("Login success");
        push("/home");
      } else {
        toast.warn("Invalid user name or password");
      }
    } catch (err) {
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-white to-pa-primary flex flex-col justify-center items-center">
      <div className="h-max w-max max-w-[80dvw] flex flex-col justify-center items-center mt-10">
        <Image
          src="./logo.png"
          width={150}
          height={150}
          alt="Picture of the author"
          className="animate-fade-up animate-duration-[1500ms]"
        />
        <div className="font-bold text-white text-xl text-center my-4 animate-fade-up animate-duration-[1500ms] animate-delay-500">
          P.A INFOTEL COMPANY LIMITED
        </div>
      </div>
      <div className="h-full w-max max-w-[80dvw]  flex justify-center items-start ">
        <div className="h-[255px] w-[395px] bg-white drop-shadow-md rounded-r-lg flex flex-col px-4 pt-4 animate-fade-up animate-duration-[1500ms]">
          <div className="flex-1 flex flex-col justify-evenly items-center min-w-0">
            <div className="h-[50px] w-full  border border-pa-primary  rounded-xl  overflow-hidden">
              <input
                type="text"
                className="outline-0 text-pa-primary	h-full w-full px-4"
                placeholder="Tài khoản"
                onChange={handleEmailLogin}
                value={userEmail}
              />
            </div>
            <div className="h-[50px] w-full  border border-pa-primary  rounded-xl  overflow-hidden flex justify-center items-center">
              <input
                type={!isHiddenPassword ? "text" : "password"}
                className="outline-0 text-pa-primary	flex-1 px-4"
                placeholder="Mật khẩu"
                onChange={handlePasswordLogin}
                value={userPassword}
                onKeyDown={handleKeyDown}
              />
              <div
                className="h-max aspect-square rounded-full p-2 hover:bg-pa-primary-hover"
                onClick={() => setIsHiddenPassword(!isHiddenPassword)}
              >
                {isHiddenPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <div
              className="h-[50px] w-full  border-pa-primary rounded-xl flex justify-center items-center text-xl font-bold text-white bg-pa-primary hover:bg-opacity-80 hover: cursor-pointer"
              onClick={handleLogin}
            >
              <button>Đăng nhập</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
