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
import { MapsTableRecord } from "./columns";

type ChartData = {
  map: string;
  [playerName: string]: unknown;
};

type MapStrengthChartProps = {
  data: MapsTableRecord[];
};

export const MapStrengthChart = (props: MapStrengthChartProps) => {
  // Transform data for the chart
  const chartData = props.data[0].maps.map((map, index) => {
    const mapData: ChartData = {
      map: map.name,
    };

    // Add win rate for each player
    props.data.forEach((player) => {
      mapData[player.name] = player.maps[index].winRatePercentage;
    });

    return mapData;
  });

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer>
        <RadarChart outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="map" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Tooltip />
          <Legend />
          {props.data.map((player, index) => (
            <Radar
              key={player.id}
              name={player.name}
              dataKey={player.name}
              stroke={`hsl(${index * 60}, 70%, 50%)`} // Use a unique color for each player
              fill={`hsl(${index * 60}, 70%, 50%)`}
              fillOpacity={0.6}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
