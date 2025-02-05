"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRecord } from "./types";

export const columns: ColumnDef<DataTableRecord>[] = [
  {
    accessorKey: "General",
    header: () => <div className="">General statistics</div>,
    columns: [
      {
        accessorKey: "No.",
        header: "No.",
        cell: ({ row }) => `${row.index + 1}`,
        maxSize: 40,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="text-left">{row.getValue<number>("name")}</div>
        ),
        minSize: 240,
      },
      {
        accessorKey: "winRatePercentage",
        header: "Win Rate",
        cell: ({ getValue }) => `${getValue<number>().toFixed(2)}%`,
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
    ],
  },
  {
    accessorKey: "average",
    header: () => (
      <div className="flex justify-center w-full col-span-full">
        Average statistics
      </div>
    ),
    columns: [
      {
        accessorKey: "kda",
        header: "KDA",
        cell: ({ getValue }) => `${getValue<number>().toFixed(2)}`,
        maxSize: 60,
      },
      {
        accessorKey: "killsPerGame",
        header: "Kills",
        maxSize: 60,
      },
      {
        accessorKey: "deathsPerGame",
        header: "Deaths",
        maxSize: 60,
      },
      {
        accessorKey: "assistsPerGame",
        header: "Assists",
        maxSize: 60,
      },
      {
        accessorKey: "damagePerRound",
        header: "ADR",
        cell: ({ getValue }) => `${getValue<number>().toFixed(2)}`,
        maxSize: 60,
      },
      {
        accessorKey: "headshotPercentage",
        header: "HS %",
        cell: ({ getValue }) => `${getValue<number>().toFixed(2)}%`,
        maxSize: 60,
      },
      {
        accessorKey: "headshotsPerGame",
        header: "HSs Per Game",
        maxSize: 60,
      },
      {
        accessorKey: "roundsWonPerGame",
        header: "Rounds win per Game",
        maxSize: 60,
      },
      {
        accessorKey: "totalRoundsPerGame",
        header: "Rounds Per Game",
        maxSize: 60,
      },
      {
        accessorKey: "roundsWinPercentage",
        header: "Rounds Win %",
        maxSize: 60,
        cell: ({ getValue }) => `${getValue<number>().toFixed(2)}%`,
      },
      {
        accessorKey: "damagePerGame",
        header: "DMG per game",
        maxSize: 60,
      },
    ],
  },
  {
    accessorKey: "total",
    header: () => <div className="">Total statistics</div>,
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
