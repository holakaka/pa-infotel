import React from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';

interface BarChartProps {
  data: { x: string; y: number }[];
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  width,
  height,
  margin = { top: 20, right: 20, bottom: 50, left: 50 },
}) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // Define scales
  const xScale = scaleBand<string>({
    range: [0, xMax],
    domain: data.map((d) => d.x),
    padding: 0.4,
  });

  const yScale = scaleLinear<number>({
    range: [yMax, 0],
    domain: [0, Math.max(...data.map((d) => d.y))],
  });

  return (
    <svg width={width} height={height}>
      <Group top={margin.top} left={margin.left}>
        {data.map((d) => (
          <Bar
            key={d.x}
            x={xScale(d.x)!}
            y={yScale(d.y)}
            width={xScale.bandwidth()}
            height={yMax - yScale(d.y)}
            fill="#FFB429"
          />
        ))}
        <AxisLeft scale={yScale} />
        <AxisBottom scale={xScale} top={yMax} />
      </Group>
    </svg>
  );
};

export default BarChart;
