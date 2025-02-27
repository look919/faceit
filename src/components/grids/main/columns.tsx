import { ColumnDef } from "@tanstack/react-table";
import { createColumn, createStartColumns } from "../columns-utils";

export type MainGridRecord = {
  id: bigint;
  name: string;
  avatar: string;
  winRatePercentage: number;
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  gamesDrawn: number;
  kda: number;
  kd: number;
  killsPerGame: number;
  deathsPerGame: number;
  assistsPerGame: number;
  damagePerRound: number;
  damagePerGame: number;
  headshotPercentage: number;
  kills: number;
  deaths: number;
  assists: number;
  headshots: number;
  roundsWon: number;
  totalRounds: number;
  headshotsPerGame: number;
  roundsWonPerGame: number;
  totalRoundsPerGame: number;
  roundsWinPercentage: number;
  damage: number;
};

const generalColumns: ColumnDef<MainGridRecord>[] = [
  createColumn("winRatePercentage", "Win Rate", { percentageDisplay: true }),
  createColumn("gamesPlayed", "Games"),
  createColumn("gamesWon", "Wins"),
  createColumn("gamesLost", "Losses"),
  createColumn("gamesDrawn", "Draws"),
  createColumn("kda", "KDA"),
  createColumn("kd", "K/D"),
];

const basicAverageColumns: ColumnDef<MainGridRecord>[] = [
  createColumn("killsPerGame", "Kills"),
  createColumn("deathsPerGame", "Deaths"),
  createColumn("assistsPerGame", "Assists"),
  createColumn("damagePerRound", "ADR"),
  createColumn("headshotPercentage", "HS %", { percentageDisplay: true }),
  createColumn("roundsWinPercentage", "Rounds Win %", {
    percentageDisplay: true,
  }),
];

export const simpleColumns: ColumnDef<MainGridRecord>[] = [
  ...createStartColumns<MainGridRecord>(),
  {
    accessorKey: "general",
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

export const advancedColumns: ColumnDef<MainGridRecord>[] = [
  ...createStartColumns<MainGridRecord>(),
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
      createColumn("headshotsPerGame", "HSs Per Game"),
      createColumn("roundsWonPerGame", "Rounds win per Game"),
      createColumn("totalRoundsPerGame", "Rounds Per Game"),
      createColumn("damagePerGame", "DMG per game"),
    ],
  },
  {
    accessorKey: "total",
    header: () => <div className="">Total statistics</div>,
    enableSorting: false,
    columns: [
      createColumn("kills", "Kills"),
      createColumn("deaths", "Deaths"),
      createColumn("assists", "Assists"),
      createColumn("headshots", "HS's"),
      createColumn("damage", "DMG"),
      createColumn("roundsWon", "Rounds Won"),
      createColumn("totalRounds", "All Rounds"),
    ],
  },
];
