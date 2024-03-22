import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React, { ReactElement, useEffect, useState } from "react";
import { FaChartLine } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import ListAttributeProperty from "./ListAttributeProperty";
import ListPropertyCode from "./ListPropertyCode";
import { setIsShowChart } from "@/redux/slices/actualdataSlice";
interface Props {}
export default function HeaderSelection({}: Props): ReactElement {
  const [listPropertyCode, setListPropertyCode] = useState<string[]>([]);
  const [showListPropertyCode, setShowListPropertyCode] =
    useState<boolean>(false);
  const [showListAttributeProperty, setShowListAttributeProperty] =
    useState<boolean>(false);
  const property = useAppSelector((state) => state.property);
  const actualData = useAppSelector((state) => state.actualdata);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!property.setListProperty) return;
    const propertyCodes = property.setListProperty.map(
      (property) => property.property_code
    );
    setListPropertyCode(propertyCodes);
  }, [property.setListProperty]);

  return (
    // <div className="h-28 w-full bg-white relative z-20 flex items-center">
    <div className="h-max w-screen md:h-28 md:w-full bg-white relative z-20 flex flex-col lg:flex-row items-center justify-center md:justify-normal	">
      <div
        className={`h-max w-max p-2 flex rounded-3xl mb-4 md:mb-0 md:ml-10  border-2 hover:bg-pa-home-grey hover:cursor-pointer relative${
          showListPropertyCode ? "bg-pa-home-blue-light" : ""
        }`}
        onClick={() => {
          if (showListAttributeProperty) {
            setShowListAttributeProperty(false);
          }
          setShowListPropertyCode(!showListPropertyCode);
        }}
      >
        <div className="flex-1 px-4 text-2xl m-auto border-r-2 border-pa-home-grey">
          Select property code
        </div>
        <div className="h-full aspect-square flex justify-start items-center">
          <FaAngleDown className="h-full w-full p-2" />
        </div>
      </div>
      <div
        className={`h-max w-max p-2 rounded-3xl mb-4 md:mb-0 md:ml-10 hover:bg-pa-home-grey hover:cursor-pointer border-2 flex px-2 ${
          actualData.isShowChart ? "bg-pa-home-yellow" : ""
        }`}
        onClick={() => {
          if (showListPropertyCode) {
            setShowListPropertyCode(false);
          }
          dispatch(setIsShowChart(!actualData.isShowChart));

          if (actualData.isShowChart) {
            setShowListAttributeProperty(false);
          }
        }}
      >
        <div className="flex-1 px-4 text-2xl m-auto border-r-2 border-pa-home-grey">
          Show chart
        </div>
        <div className="h-full aspect-square flex justify-start items-center">
          <FaChartLine className="h-full w-full p-2" />
        </div>
      </div>
      {actualData.isShowChart && (
        <div
          className={`h-max w-max p-2 rounded-3xl mb-4 md:mb-0 md:ml-10 hover:bg-pa-home-grey hover:cursor-pointer border-2 flex px-2 relative`}
          onClick={() => {
            if (showListPropertyCode) {
              setShowListPropertyCode(false);
            }
            setShowListAttributeProperty(!showListAttributeProperty);
          }}
        >
          <div className="flex-1 min-w-64 px-4 text-2xl m-auto border-r-2 border-pa-home-grey">
            {actualData.propertyAttributeSelected === ""
              ? "Select property attribute"
              : actualData.propertyAttributeSelected}
          </div>
          <div className="h-full aspect-square flex justify-start items-center">
            <FaAngleDown className="h-full w-full p-2" />
          </div>
        </div>
      )}

      {showListPropertyCode && (
        <ListPropertyCode listPropertyCode={listPropertyCode} />
      )}
      {showListAttributeProperty && <ListAttributeProperty />}
    </div>
  );
}
