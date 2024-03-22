import { ReactElement, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import ListAttributeForecast from "./ListAttributeForecast";
import ListForecastPeriod from "./ListForecastPeriod";
import { useAppSelector } from "@/redux/hook";

interface Props {}
export default function HeaderSelectionForecast({}: Props): ReactElement {
  const [showListAttributeForecast, setShowListAttributeForecast] =
    useState<boolean>(false);
  const [showListForecastPeriod, setShowListForecastPeriod] =
    useState<boolean>(false);
    const forecast = useAppSelector((state) => state.forecast);


  return (
    // <div className="h-max w-screen md:h-28 md:w-full bg-white relative z-20 flex flex-col lg:flex-row items-center justify-center md:justify-normal	">

    <div className="h-max w-screen md:h-28 md:w-full bg-white relative z-20 flex flex-col lg:flex-row items-center justify-center md:justify-normal	">
      <div
        className={`h-max w-max p-2 flex rounded-3xl mb-4 md:mb-0 md:ml-10  border-2 hover:bg-pa-home-grey hover:cursor-pointer relative`}
        onClick={() => {
          setShowListAttributeForecast(!showListAttributeForecast);
          if (showListForecastPeriod) {
            setShowListForecastPeriod(false);
          }
        }}
      >
        <div className="flex-1 px-4 text-2xl m-auto border-r-2 border-pa-home-grey">
          Select attribute
        </div>
        <div className="h-full aspect-square flex justify-start items-center">
          <FaAngleDown className="h-full w-full p-2" />
        </div>
      </div>

      <div
        className={`h-max w-max p-2 rounded-3xl mb-4 md:mb-0 md:ml-10 hover:bg-pa-home-grey hover:cursor-pointer border-2 flex px-2 relative`}
        onClick={() => {
          setShowListForecastPeriod(!showListForecastPeriod);
          if (showListAttributeForecast) {
            setShowListAttributeForecast(false);
          }
        }}
      >
        <div className="flex-1 min-w-64 px-4 text-2xl m-auto border-r-2 border-pa-home-grey">
          {forecast.forecastPeriodSelected === ""
              ? "Select forecast period"
              : forecast.forecastPeriodSelected}
        </div>
        <div className="h-full aspect-square flex justify-start items-center">
          <FaAngleDown className="h-full w-full p-2" />
        </div>
      </div>
      {showListAttributeForecast && <ListAttributeForecast />}
      {showListForecastPeriod && <ListForecastPeriod />}
    </div>
  );
}
