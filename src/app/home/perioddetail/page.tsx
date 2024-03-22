"use client";
import { ReactElement } from "react";
import { IoMdDownload } from "react-icons/io";
import { PeriodDetail } from "@/app/sampledata/PeriodDetail";

const data = PeriodDetail;
export default function Page(): ReactElement {
  return (
    <div className="bg-pa-home-grey h-screen w-full relative flex flex-col">
      <div className="h-28 w-full bg-white relative z-20 flex items-center justify-center">
        <div className="h-1/2 w-36 bg-pa-home-blue text-white  rounded-xl flex items-center justify-center hover:cursor-pointer hover:bg-pa-home-blue-light">
          <IoMdDownload className="h-full w-auto p-1" />
        </div>
      </div>
      <div className="flex-1 relative">
      </div>
    </div>
  );
}
