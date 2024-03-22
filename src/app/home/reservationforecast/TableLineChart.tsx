import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import LineChart from "./LineChart";
import { useAppSelector } from "@/redux/hook";
import { ReservationForecast } from "@/app/sampledata/ReservationForecast";
import { addMonths, format, parse } from "date-fns";
import { IReservationForecast } from "@/types/ReservationForecast";

interface DataPoint {
  x: string;
  y: number;
}
export default function TableLineChart(): ReactElement {
  const divTableChartLineRef = useRef<HTMLDivElement>(null);
  const [heightTableChartLine, setHeightTableChartLine] = useState<number>(0);
  const forecast = useAppSelector((state) => state.forecast);
  const [dataTotalOcc, setDataTotalOcc] = useState<DataPoint[]>([]);
  const [dataArrRooms, setDataArrRooms] = useState<DataPoint[]>([]);
  const [dataDepRooms, setDataDepRooms] = useState<DataPoint[]>([]);
  const [splitDataToMonth, setSplitDataToMonth] = useState<Record<string, IReservationForecast[]>>({});

  useEffect(() => {
    // Split data by month
    const splitDataToMonth: Record<string, IReservationForecast[]> = {};

    ReservationForecast.forEach((item) => {
      const month = format(
        parse(item.date, "dd-MMM-yyyy", new Date()),
        "yyyy-MM"
      );
      if (!splitDataToMonth[month]) {
        splitDataToMonth[month] = [];
      }
      splitDataToMonth[month].push(item);
    });
    setSplitDataToMonth(splitDataToMonth)

    const data: IReservationForecast[] = splitDataToMonth["2020-02"];
    const data_total_occ: DataPoint[] = [];
    const data_arr_rooms: DataPoint[] = [];
    const data_dep_rooms: DataPoint[] = [];

    data.forEach((item) => {
      const formattedDate = format(new Date(item.date), "yyyy-MM-dd");
      data_total_occ.push({ x: formattedDate, y: item.total_occ });
      data_arr_rooms.push({ x: formattedDate, y: item.arr_rooms });
      data_dep_rooms.push({ x: formattedDate, y: item.dep_rooms });
    });


    setDataTotalOcc(data_total_occ);
    setDataArrRooms(data_arr_rooms);
    setDataDepRooms(data_dep_rooms);
  }, []);

  useEffect(() => {
    const startMonth: Date = new Date("2020-02");
    let combinedData: IReservationForecast[] = [];
    if (forecast.forecastPeriodSelected === "This month") {
      const endMonth: Date = new Date("2020-02");
      for (
        let currentDate = startMonth;
        currentDate <= endMonth;
        currentDate = addMonths(currentDate, 1)
      ) {
        // Format the current month
        const currentMonth = format(currentDate, "yyyy-MM");

        // Retrieve the data for the current month and concatenate it with the combined data
        combinedData = combinedData.concat(
          splitDataToMonth[currentMonth] || []
        );
      }
    }
    if (forecast.forecastPeriodSelected === "3 months") {
      const endMonth: Date = new Date("2020-04");
      for (
        let currentDate = startMonth;
        currentDate <= endMonth;
        currentDate = addMonths(currentDate, 1)
      ) {
        // Format the current month
        const currentMonth = format(currentDate, "yyyy-MM");

        // Retrieve the data for the current month and concatenate it with the combined data
        combinedData = combinedData.concat(
          splitDataToMonth[currentMonth] || []
        );
      }
    }
    if (forecast.forecastPeriodSelected === "6 months") {
      const endMonth: Date = new Date("2020-07");
      for (
        let currentDate = startMonth;
        currentDate <= endMonth;
        currentDate = addMonths(currentDate, 1)
      ) {
        // Format the current month
        const currentMonth = format(currentDate, "yyyy-MM");

        // Retrieve the data for the current month and concatenate it with the combined data
        combinedData = combinedData.concat(
          splitDataToMonth[currentMonth] || []
        );
      }
    }
    const data_total_occ: DataPoint[] = [];
    const data_arr_rooms: DataPoint[] = [];
    const data_dep_rooms: DataPoint[] = [];
    combinedData.forEach((item) => {
      const formattedDate = format(new Date(item.date), "yyyy-MM-dd");
      data_total_occ.push({ x: formattedDate, y: item.total_occ });
      data_arr_rooms.push({ x: formattedDate, y: item.arr_rooms });
      data_dep_rooms.push({ x: formattedDate, y: item.dep_rooms });
    });

    setDataTotalOcc(data_total_occ);
    setDataArrRooms(data_arr_rooms);
    setDataDepRooms(data_dep_rooms);
    
  }, [forecast.forecastPeriodSelected, splitDataToMonth]);

  // Tính width & height cho TableChartLine dựa vào div contain
  useLayoutEffect(() => {
    const handleWindowResize = () => {
      if (divTableChartLineRef.current) {
        setHeightTableChartLine(divTableChartLineRef.current.clientHeight);
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
      ref={divTableChartLineRef}
    >
      {forecast.attributeSelected.length === 0 && (
        <div className="text-center h-full w-full flex justify-center items-center text-3xl md:text-5xl	font-semibold text-pa-home-grey">
          Select attribute and forecast period to display line chart!
        </div>
      )}

      <LineChart
        height={heightTableChartLine}
        dataArrRooms={dataArrRooms}
        dataDepRooms={dataDepRooms}
        dataTotalOcc={dataTotalOcc}
      />
    </div>
  );
}
