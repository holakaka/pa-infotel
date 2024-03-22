import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setAttributeSelected } from "@/redux/slices/forecastSlice";
import { ReactElement } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

interface Props {}

const listAttributeForecast: string[] = [
  "Total Occ",
  "Arr. Rooms",
  "Dep. Rooms",
];
export default function ListAttributeForecast({}: Props): ReactElement {
  const dispatch = useAppDispatch();
  const forecast = useAppSelector((state) => state.forecast);

  const handleShowMenu = (attribute: string) => {
    const isOpen = forecast.attributeSelected.includes(attribute);
    if (isOpen) {
      dispatch(
        setAttributeSelected(
          forecast.attributeSelected.filter(
            (optionId: string) => optionId !== attribute
          )
        )
      );
    } else {
      dispatch(
        setAttributeSelected([...forecast.attributeSelected, attribute])
      );
    }
  };

  return (
    <div className="bg-white  h-max w-max min-w-[250px]  absolute top-14 md:top-20 ml-4  md:ml-11 overflow-y-auto mt-2 drop-shadow-md rounded-lg px-1">
      {listAttributeForecast.map((attribute: string) => (
        <div
          key={attribute}
          className={`text-xl flex h-14 hover:cursor-pointer items-center hover:bg-pa-home-grey my-2 ${
            forecast.attributeSelected.includes(attribute)
              ? "bg-pa-home-blue-light text-white rounded "
              : ""
          }`}
          onClick={() => handleShowMenu(attribute)}
        >
          <div className="h-full aspect-square flex justify-center items-center">
            {forecast.attributeSelected.includes(attribute) ? (
              <FaCheckSquare className="text-pa-home-blue" />
            ) : (
              <MdOutlineCheckBoxOutlineBlank />
            )}
          </div>

          <span className="font-semibold">{attribute}</span>
        </div>
      ))}
    </div>
  );
}
