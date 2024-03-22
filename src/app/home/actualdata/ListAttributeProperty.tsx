import { HeaderActualData } from "@/app/sampledata/ActualData";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setPropertyAttributeSelected } from "@/redux/slices/actualdataSlice";
import { ReactElement, useEffect, useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

interface Props {}

export default function ListAttributeProperty({}: Props): ReactElement {
  const [listHeader, setListHeader] = useState<string[]>([]);
  useEffect(() => {
    const header = HeaderActualData;
    setListHeader(header);
  }, []);

  const dispatch = useAppDispatch();
  const actualData = useAppSelector((state) => state.actualdata);

  const handleShowMenu = (attribute: string) => {
    dispatch(setPropertyAttributeSelected(attribute));
  };

  return (
    // <div className="bg-white  h-[300px] w-[315px] absolute top-1/2 md:top-20 left-1/2 md:ml-10 -translate-x-1/2	 md:translate-x-0	 overflow-y-auto mt-2 drop-shadow-md rounded-lg pr-1">

    <div className="bg-white h-[300px] w-[315px] absolute top-1/2 md:top-20 left-1/2 -translate-x-1/2	md:left-0 md:translate-x-0	 md:ml-[42rem] overflow-y-auto mt-28 md:mt-2 drop-shadow-md rounded-lg pr-1">
      {listHeader.map(
        (attribute: string) =>
          attribute !== "Property" && (
            <div
              key={attribute}
              className={`text-xl flex h-14 hover:cursor-pointer items-center hover:bg-pa-home-grey my-2 ${
                actualData.propertyAttributeSelected === attribute
                  ? "bg-pa-home-blue-light text-white rounded "
                  : ""
              }`}
              onClick={() => handleShowMenu(attribute)}
            >
              <div className="h-full aspect-square flex justify-center items-center">
                {actualData.propertyAttributeSelected === attribute ? (
                  <FaCheckSquare className="text-pa-home-blue" />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank />
                )}
              </div>

              <span className="font-semibold">{attribute}</span>
            </div>
          )
      )}
    </div>
  );
}
