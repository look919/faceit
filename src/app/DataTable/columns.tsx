"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRecord } from "./types";

export const columns: ColumnDef<DataTableRecord>[] = [
  {
    accessorKey: "No.",
    header: "No.",
    cell: ({ row }) => `${row.index + 1}`,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "winRatePercentage",
    header: "Win Rate",
    cell: ({ getValue }) => `${getValue<number>().toFixed(2)}%`,
  },
  {
    accessorKey: "gamesPlayed",
    header: "Games",
  },
  {
    accessorKey: "gamesWon",
    header: "Wins",
  },
  {
    accessorKey: "gamesLost",
    header: "Losses",
  },
  {
    accessorKey: "gamesDrawn",
    header: "Draws",
  },
  {
    accessorKey: "kda",
    header: "KDA",
    cell: ({ getValue }) => `${getValue<number>().toFixed(2)}`,
  },
  {
    accessorKey: "killsPerGame",
    header: "Kills",
  },
  {
    accessorKey: "deathsPerGame",
    header: "Deaths",
  },
  {
    accessorKey: "assistsPerGame",
    header: "Assists",
  },
  {
    accessorKey: "damagePerRound",
    header: "ADR",
    cell: ({ getValue }) => `${getValue<number>().toFixed(2)}`,
  },

  {
    accessorKey: "headshotPercentage",
    header: "HS %",
    cell: ({ getValue }) => `${getValue<number>().toFixed(2)}%`,
  },
  {
    accessorKey: "damagePerGame",
    header: "DPG",
  },
  {
    accessorKey: "kills",
    header: "Total kills",
    enableSorting: true,
  },
  {
    accessorKey: "deaths",
    header: "Total deaths",
  },
  {
    accessorKey: "assists",
    header: "Total assists",
  },
  {
    accessorKey: "headshots",
    header: "Total headshots",
  },
  {
    accessorKey: "roundsWon",
    header: "Rounds Won",
  },
  {
    accessorKey: "totalRounds",
    header: "Total Rounds",
  },

  {
    accessorKey: "headshotsPerGame",
    header: "Headshots Per Game",
  },
  {
    accessorKey: "roundPerGame",
    header: "Rounds Per Game",
  },
  {
    accessorKey: "totalRoundsPerGame",
    header: "Total Rounds Per Game",
  },
  {
    accessorKey: "roundsWinPercentage",
    header: "Rounds Win Percentage",
    cell: ({ getValue }) => `${getValue<number>().toFixed(2)}%`,
  },
  {
    accessorKey: "damage",
    header: "Total damage",
  },
];
