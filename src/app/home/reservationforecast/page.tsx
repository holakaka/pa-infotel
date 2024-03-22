"use client";
import { ReactElement } from "react";
import LineChart from "./LineChart";
import HeaderSelectionForecast from "./HeaderSelectionForecast";
import TableLineChart from "./TableLineChart";

export default function Page(): ReactElement {
  return (
    <div className=" h-screen w-full relative flex flex-col">
      <HeaderSelectionForecast />
      <div className="flex-1 bg-pa-home-grey">
        <TableLineChart/>
      </div>
    </div>
    
  );
}
