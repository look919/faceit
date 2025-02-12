"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StatsTableRecord } from "./types";
import { renderDecimalValue, startColumns } from "./columns-utils";

const generalColumns: ColumnDef<StatsTableRecord>[] = [
  {
    accessorKey: "winRatePercentage",
    header: "Win Rate",
    cell: ({ getValue }) => `${renderDecimalValue(getValue)}%`,
    maxSize: 60,
  },
  {
    accessorKey: "gamesPlayed",
    header: "Games",
    maxSize: 60,
  },
  {
    accessorKey: "gamesWon",
    header: "Wins",
    maxSize: 60,
  },
  {
    accessorKey: "gamesLost",
    header: "Losses",
    maxSize: 60,
  },
  {
    accessorKey: "gamesDrawn",
    header: "Draws",
    maxSize: 60,
  },
  {
    accessorKey: "kda",
    header: "KDA",
    cell: ({ getValue }) => renderDecimalValue(getValue),
    maxSize: 60,
  },
  {
    accessorKey: "knifeKills",
    header: "Knife kills",
    maxSize: 60,
  },
  {
    accessorKey: "knifeDeaths",
    header: "Knife deaths",
    maxSize: 60,
  },
];

const basicAverageColumns: ColumnDef<StatsTableRecord>[] = [
  {
    accessorKey: "killsPerGame",
    header: "Kills",
    maxSize: 60,
    cell: ({ getValue }) => renderDecimalValue(getValue),
  },
  {
    accessorKey: "deathsPerGame",
    header: "Deaths",
    maxSize: 60,
    cell: ({ getValue }) => renderDecimalValue(getValue),
  },
  {
    accessorKey: "assistsPerGame",
    header: "Assists",
    maxSize: 60,
    cell: ({ getValue }) => renderDecimalValue(getValue),
  },
  {
    accessorKey: "damagePerRound",
    header: "ADR",
    cell: ({ getValue }) => renderDecimalValue(getValue),
    maxSize: 60,
  },
  {
    accessorKey: "headshotPercentage",
    header: "HS %",
    cell: ({ getValue }) => `${renderDecimalValue(getValue)}%`,
    maxSize: 60,
  },
  {
    accessorKey: "roundsWinPercentage",
    header: "Rounds Win %",
    maxSize: 60,
    cell: ({ getValue }) => `${renderDecimalValue(getValue)}%`,
  },
];

export const simpleColumns: ColumnDef<StatsTableRecord>[] = [
  ...startColumns,
  {
    accessorKey: "General",
    header: () => <div className="">General statistics</div>,
    enableSorting: false,
    columns: generalColumns,
  },
  {
    accessorKey: "average",
    header: () => (
      <div className="flex justify-center w-full col-span-full">
        Average statistics
      </div>
    ),
    enableSorting: false,
    columns: basicAverageColumns,
  },
];

export const advancedColumns: ColumnDef<StatsTableRecord>[] = [
  ...startColumns,
  {
    accessorKey: "advanced General",
    header: () => <div className="">General statistics</div>,
    enableSorting: false,
    columns: generalColumns,
  },
  {
    accessorKey: "advanced average",
    header: () => (
      <div className="flex justify-center w-full col-span-full">
        Average statistics
      </div>
    ),
    enableSorting: false,
    columns: [
      ...basicAverageColumns,
      {
        accessorKey: "headshotsPerGame",
        header: "HSs Per Game",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "roundsWonPerGame",
        header: "Rounds win per Game",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "totalRoundsPerGame",
        header: "Rounds Per Game",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "damagePerGame",
        header: "DMG per game",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
    ],
  },
  {
    accessorKey: "total",
    header: () => <div className="">Total statistics</div>,
    enableSorting: false,
    columns: [
      {
        accessorKey: "kills",
        header: "Kills",
        maxSize: 60,
      },
      {
        accessorKey: "deaths",
        header: "Deaths",
        maxSize: 60,
      },
      {
        accessorKey: "assists",
        header: "Assists",
        maxSize: 60,
      },
      {
        accessorKey: "headshots",
        header: "HS's",
        maxSize: 60,
      },

      {
        accessorKey: "damage",
        header: "DMG",
        maxSize: 60,
      },

      {
        accessorKey: "roundsWon",
        header: "Rounds Won",
        maxSize: 60,
      },
      {
        accessorKey: "totalRounds",
        header: "All Rounds",
        maxSize: 60,
      },
    ],
  },
];
