import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { MapStats } from "@prisma/client";

type ChartData = {
  map: string;
  [playerName: string]: unknown;
};

type MapStrengthChartProps = {
  data: {
    id: bigint;
    name: string;
    avatar: string;
    color: string;
    maps: MapStats[];
  }[];
};

export const MapStrengthChart = (props: MapStrengthChartProps) => {
  // Transform data for the chart
  const chartData = props.data[0].maps.map((map, index) => {
    const mapData: ChartData = {
      map: map.name,
    };

    // Add win rate for each player
    props.data.forEach((player) => {
      if (player.maps[index]) {
        mapData[player.name] = player.maps[index].winRatePercentage;
      }
    });

    return mapData;
  });

  return (
    <div className="w-full h-96 mt-8 overflow-visible">
      <ResponsiveContainer style={{ overflow: "visible" }}>
        <RadarChart outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="map" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Tooltip />
          <Legend />
          {props.data.map((player) => (
            <Radar
              key={player.id}
              name={player.name}
              dataKey={player.name}
              stroke={player.color}
              fill={player.color}
              fillOpacity={0.6}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
