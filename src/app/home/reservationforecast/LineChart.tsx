import React, { useEffect, useState } from "react";
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
} from "@visx/xychart";

import "tailwindcss/tailwind.css";
import { ReservationForecast } from "@/app/sampledata/ReservationForecast";
import { useAppSelector } from "@/redux/hook";

const tickLabelOffset = 10;

interface DataPoint {
  x: string;
  y: number;
}

interface Props {
  height: number;
  dataTotalOcc: DataPoint[];
  dataArrRooms: DataPoint[];
  dataDepRooms: DataPoint[];
}
const LineChart = ({
  height,
  dataTotalOcc,
  dataArrRooms,
  dataDepRooms,
}: Props) => {
  const forecast = useAppSelector((state) => state.forecast);

  const accessors = {
    xAccessor: (d: DataPoint) => new Date(`${d.x}T00:00:00`),
    yAccessor: (d: DataPoint) => d.y,
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <XYChart
        height={height}
        margin={{ left: 60, top: 35, bottom: 38, right: 27 }}
        xScale={{ type: "time" }}
        yScale={{ type: "linear" }}
      >
        <AnimatedGrid
          columns={false}
          numTicks={4}
          lineStyle={{
            stroke: "#e1e1e1",
            strokeLinecap: "round",
            strokeWidth: 1,
          }}
          strokeDasharray="0, 4"
        />
        <AnimatedAxis
          hideAxisLine
          hideTicks
          orientation="bottom"
          tickLabelProps={() => ({ dy: tickLabelOffset })}
          left={30}
          numTicks={4}
        />
        <AnimatedAxis
          hideAxisLine
          hideTicks
          orientation="left"
          numTicks={4}
          tickLabelProps={() => ({ dx: -10 })}
        />
        {/* Line chart for data_total_occ */}
        {forecast.attributeSelected.includes("Total Occ") && (
          <AnimatedLineSeries
            stroke="#E95CFF"
            dataKey="primary_line"
            data={dataTotalOcc}
            {...accessors}
          />
        )}

        {/* Line chart for data_arr_rooms */}
        {forecast.attributeSelected.includes("Arr. Rooms") && (
          <AnimatedLineSeries
            stroke="#FFB429"
            dataKey="secondary_line"
            data={dataArrRooms}
            {...accessors}
          />
        )}

        {/* Line chart for data_dep_rooms */}
        {forecast.attributeSelected.includes("Dep. Rooms") && (
          <AnimatedLineSeries
            stroke="#4095E6"
            dataKey="tertiary_line"
            data={dataDepRooms}
            {...accessors}
          />
        )}
      </XYChart>
    </div>
  );
};

export default LineChart;
