import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setPropertyCodeSelected } from "@/redux/slices/actualdataSlice";
import { setListProperty } from "@/redux/slices/propertySlice";
import { ReactElement } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

interface Props {
  listPropertyCode: string[];
}

export default function ListPropertyCode({
  listPropertyCode,
}: Props): ReactElement {
  const dispatch = useAppDispatch();
  const actualData = useAppSelector((state) => state.actualdata);

  const handleShowMenu = (code: string) => {
    const isOpen = actualData.propertyCodeSelected.includes(code);
    if (isOpen) {
      dispatch(
        setPropertyCodeSelected(
          actualData.propertyCodeSelected.filter(
            (optionId: string) => optionId !== code
          )
        )
      );
    } else {
      dispatch(
        setPropertyCodeSelected([...actualData.propertyCodeSelected, code])
      );
    }
  };

  return (
    // <div className="bg-white  h-[300px] w-[315px] absolute top-20 ml-10 overflow-y-auto mt-2 drop-shadow-md rounded-lg pr-1">
    <div className="bg-white  h-[300px] w-[315px] absolute top-1/2 md:top-20 left-1/2 md:left-0  md:ml-10 -translate-x-1/2	 md:translate-x-0	 overflow-y-auto mt-2 drop-shadow-md rounded-lg pr-1">
      {listPropertyCode.map((code: string) => (
        <div
          key={code}
          className={`text-xl flex h-14 hover:cursor-pointer items-center hover:bg-pa-home-grey my-2 ${
            actualData.propertyCodeSelected.includes(code)
              ? "bg-pa-home-blue-light text-white rounded "
              : ""
          }`}
          onClick={() => handleShowMenu(code)}
        >
          <div className="h-full aspect-square flex justify-center items-center">
            {actualData.propertyCodeSelected.includes(code) ? (
              <FaCheckSquare className="text-pa-home-blue" />
            ) : (
              <MdOutlineCheckBoxOutlineBlank />
            )}
          </div>

          <span className="font-semibold">{code}</span>
        </div>
      ))}
    </div>
  );
}
