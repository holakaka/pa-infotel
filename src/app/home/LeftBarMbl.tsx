"use client";
import { ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import { FaChartBar, FaDatabase } from "react-icons/fa";
import { TbListDetails, TbLogout } from "react-icons/tb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { deleteLoginCookies } from "@/utils/auth/handleCookies";
import { usePathname } from "next/navigation";

export default function LeftBarMbl(): ReactElement {
  const { push } = useRouter();

  const [tabSelected, setTabSelected] = useState<number>(0);
  const handleLogout = async () => {
    try {
      await deleteLoginCookies();
      toast.success("Logout success");
      push("/");
    } catch (err) {
      toast.error("An error occurred during logout");
    }
  };
  const pathname = usePathname();
  useEffect(() => {
    switch (pathname) {
      case "/home/actualdata":
        setTabSelected(1);
        break;
      case "/home/reservationforecast":
        setTabSelected(2);
        break;
      case "/home/perioddetail":
        setTabSelected(3);
        break;
    }
  }, [pathname]);

  return (
    <div className="h-screen w-screen flex flex-col bg-pa-home-blue drop-shadow-xl ">
      <div
        className="w-full h-20  flex my-4 bg-pa-home-grey"
        onClick={() => setTabSelected(0)}
      >
        <div className="h-full w-max max-w-[350px] shrink-0">
          <Image
            src="/logo.png"
            width={300}
            height={300}
            alt="Picture of the author"
            className="h-full w-auto "
          />
        </div>
        <div className="flex-1 flex items-end justify-start">
          <div className="flex-1 text-2xl font-semibold text-pa-primary">
            P.A INFOTEL
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-y-4 px-2">
        <Link href={"/home/actualdata"}>
          <div
            className={`${
              tabSelected === 1
                ? "bg-pa-home-grey text-pa-home-blue"
                : "text-white"
            } h-16 hover:bg-pa-home-grey   hover:text-pa-home-blue  flex`}
            onClick={() => setTabSelected(1)}
          >
            <div className="h-full aspect-square p-4">
              <FaDatabase className="h-full w-full" />
            </div>
            <div className="flex-1 text-xl font-medium flex justify-start items-center">
              Actual Data
            </div>
          </div>
        </Link>
        <Link href={"/home/reservationforecast"}>
          <div
            className={`${
              tabSelected === 2
                ? "bg-pa-home-grey text-pa-home-blue"
                : "text-white"
            } h-16 hover:bg-pa-home-grey   hover:text-pa-home-blue  flex`}
            onClick={() => setTabSelected(2)}
          >
            <div className="h-full aspect-square p-4">
              <FaChartBar className="h-full w-full" />
            </div>
            <div className="flex-1 text-xl font-medium flex justify-start items-center">
              Reservation Forecast
            </div>
          </div>
        </Link>
        <Link href={"/home/perioddetail"}>
          <div
            className={`${
              tabSelected === 3
                ? "bg-pa-home-grey text-pa-home-blue"
                : "text-white"
            } h-16 hover:bg-pa-home-grey   hover:text-pa-home-blue  flex`}
            onClick={() => setTabSelected(3)}
          >
            <div className="h-full aspect-square p-4">
              <TbListDetails className="h-full w-full" />
            </div>
            <div className="flex-1 text-xl font-medium flex justify-start items-center">
              Period Detail
            </div>
          </div>
        </Link>

        <div
          className="h-16 hover:bg-pa-home-grey  text-white hover:text-pa-home-blue  flex"
          onClick={handleLogout}
        >
          <div className="h-full aspect-square p-4">
            <TbLogout className="h-full w-full" />
          </div>
          <div className="flex-1 text-xl font-medium flex justify-start items-center">
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}
