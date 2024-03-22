import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import BarChart from "./BarChart";
import { useAppSelector } from "@/redux/hook";

interface Props {}
interface DataChart {
  x: string;
  y: number;
}

export default function TableChart(): ReactElement {
  const divTableChartRef = useRef<HTMLDivElement>(null);
  const [heightTableChart, setHeightTableChart] = useState<number>(0);
  const [widthTableChart, setWidthTableChart] = useState<number>(0);
  const actualData = useAppSelector((state) => state.actualdata);
  const property = useAppSelector((state) => state.property);
  const [dataChart, setDataChart] = useState<DataChart[]>([]);

  useEffect(() => {
    if (!property.setListSelectedProperty) return;

    switch (actualData.propertyAttributeSelected) {
      case "Total Room in Hotel":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.total_room,
        }));
        break;
      case "Room Revenue":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.revenue?.room_revenue ?? 0,
        }));
        break;
      case "F&B Revenue":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.revenue?.fb_revenue ?? 0,
        }));
        break;
      case "Other Revenue":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.revenue?.other_revenue ?? 0,
        }));
        break;
      case "Total Revenue":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.revenue?.total_revenue ?? 0,
        }));
        break;
      case "Occ %":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.occ ?? 0,
        }));
        break;
      case "ADR":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.adr ?? 0,
        }));
        break;
      case "Hotel Room":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.hotel_rooms,
        }));
        break;
      case "Available Rooms":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.available_rooms,
        }));
        break;
      case "Rev_Occupied Room":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.detail_rev?.occupied_room ?? 0,
        }));
        break;
      case "Rev_Group Rooms":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.detail_rev?.group_rooms ?? 0,
        }));
        break;
      case "Rev_Transient Rooms":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.detail_rev?.transient_rooms ?? 0,
        }));
        break;
      case "RN_Occupied Room":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.detail_rn?.occupied_room ?? 0,
        }));
        break;
      case "RN_Group Rooms":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.detail_rn?.group_rooms ?? 0,
        }));
        break;
      case "RN_Transient Rooms":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.detail_rn?.transient_rooms ?? 0,
        }));
        break;
      case "OCC_Occupied Room":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.detail_occ?.occupied_room ?? 0,
        }));
        break;
      case "OCC_Group Rooms":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.detail_occ?.group_rooms ?? 0,
        }));
        break;
      case "OCC_Transient Rooms":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.detail_occ?.transient_rooms ?? 0,
        }));
        break;
      case "ADR_Occupied Room":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.detail_adr?.occupied_room ?? 0,
        }));
        break;
      case "ADR_Group Rooms":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.detail_adr?.group_rooms ?? 0,
        }));
        break;
      case "ADR_Transient Rooms":
        var data = property.setListSelectedProperty.map((item) => ({
          x: item._property_code,
          y: item.detail_adr?.transient_rooms ?? 0,
        }));
        break;
      default:
        var data = property.setListSelectedProperty.map((item) => ({
          x: "",
          y: 0,
        }));
    }
    setDataChart(data);
  }, [
    property.setListSelectedProperty,
    actualData.propertyCodeSelected,
    actualData.propertyAttributeSelected,
  ]);

  // Tính width & height cho TableChart dựa vào div contain
  useLayoutEffect(() => {
    const handleWindowResize = () => {
      if (divTableChartRef.current) {
        setHeightTableChart(divTableChartRef.current.clientHeight);
        setWidthTableChart(divTableChartRef.current.clientWidth);
      }
    };
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div
      className={` h-[98dvh] md:h-[calc(100dvh-9rem)] min-h-56 w-[95%] mt-4 bg-white absolute left-1/2 -translate-x-1/2 rounded-t-lg overflow-hidden`}
      ref={divTableChartRef}
    >
      {property.setListSelectedProperty.length === 0 && (
        <div className="h-full w-full flex justify-center items-center text-3xl md:text-5xl	text-center font-semibold text-pa-home-grey">
          Select property code to display bar chart!
        </div>
      )}
      <BarChart
        data={dataChart}
        width={widthTableChart}
        height={heightTableChart}
      />
    </div>
  );
}
