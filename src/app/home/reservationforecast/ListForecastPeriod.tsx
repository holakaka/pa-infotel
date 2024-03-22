import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setForecastPeriodSelected } from "@/redux/slices/forecastSlice";
import { ReactElement } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

interface Props {}

const listForecastPeriod: string[] = [
  "This month",
  "3 months",
  "6 months",
];
export default function ListForecastPeriod({}: Props): ReactElement {
  const dispatch = useAppDispatch();
  const forecast = useAppSelector((state) => state.forecast);

  const handleShowMenu = (attribute: string) => {
    dispatch(setForecastPeriodSelected(attribute));
  };

  return (
    <div className="bg-white  h-max w-max min-w-[250px] absolute top-[7.5rem] md:top-20 ml-4 md:ml-[22.25rem] overflow-y-auto mt-2 drop-shadow-md rounded-lg pr-1">
      {listForecastPeriod.map((period: string) => (
        <div
          key={period}
          className={`text-xl flex h-14 hover:cursor-pointer items-center hover:bg-pa-home-grey my-2 ${
            forecast.forecastPeriodSelected.includes(period)
              ? "bg-pa-home-blue-light text-white rounded "
              : ""
          }`}
          onClick={() => handleShowMenu(period)}
        >
          <div className="h-full aspect-square flex justify-center items-center">
            {forecast.forecastPeriodSelected.includes(period) ? (
              <FaCheckSquare className="text-pa-home-blue" />
            ) : (
              <MdOutlineCheckBoxOutlineBlank />
            )}
          </div>

          <span className="font-semibold">{period}</span>
        </div>
      ))}
    </div>
  );
}
