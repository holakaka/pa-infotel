"use client";
import { ReactElement, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { MdOutlineArrowBackIosNew } from "react-icons/md";


const HeaderMbl = (): ReactElement => {
  const pathname = usePathname();
  const { push } = useRouter();

  const [isDisplayHeader, setIsDisplayHeader] = useState<boolean>(false);
  useEffect(() => {
    if (pathname !== "/home") {
      setIsDisplayHeader(true);
    } else {
      setIsDisplayHeader(false);
    }
  }, [pathname]);
  return (
    <div
      className={`bg-pa-home-blue h-16 mb-4 w-screen ${
        isDisplayHeader ? "block" : "hidden"
      }`}
      onClick={() => {
        push("/home");
      }}
    >
        <MdOutlineArrowBackIosNew className="h-full aspect-square text-4xl text-white ml-4"/>

    </div>
  );
};

export default HeaderMbl;
