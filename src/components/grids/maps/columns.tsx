import { ColumnDef } from "@tanstack/react-table";
import {
  createStartColumns,
  createColumn,
  createIndexColumn,
  createNameColumn,
} from "../columns-utils";
import { MapStats } from "@prisma/client";
import { MapName } from "@/utils/weapons";

export type MapsTableRecord = {
  id: bigint;
  name: string;
  avatar: string;
  color: string;
  maps: MapStats[];
} & {
  [K in MapName]: MapStats;
};

const createStandardColumns = (accessorKey?: string) => {
  if (!accessorKey) {
    return [
      createColumn("gamesPlayed", "Games"),
      createColumn("gamesWon", "Wins"),
      createColumn("gamesLost", "Losses"),
      createColumn("gamesDrawn", "Draws"),
      createColumn("winRatePercentage", "Win Rate", {
        percentageDisplay: true,
      }),
      createColumn("roundsWinPercentage", "Rounds Win Rate", {
        percentageDisplay: true,
      }),
    ];
  }

  return [
    createColumn(`${accessorKey}.gamesPlayed`, "Games"),
    createColumn(`${accessorKey}.gamesWon`, "Wins"),
    createColumn(`${accessorKey}.gamesLost`, "Losses"),
    createColumn(`${accessorKey}.gamesDrawn`, "Draws"),
    createColumn(`${accessorKey}.winRatePercentage`, "Win Rate", {
      percentageDisplay: true,
    }),
    createColumn(`${accessorKey}.roundsWinPercentage`, "Rounds Win Rate", {
      percentageDisplay: true,
    }),
  ];
};
const createAdvancedColumns = (accessorKey?: string) => {
  if (!accessorKey) {
    return [
      createColumn("totalGamesLength", "Total games length"),
      createColumn("averageGameLength", "AVG Game Length"),
      createColumn("roundsPerGame", "Rounds per game"),
      createColumn("roundsWonPerGame", "Rounds won per game"),
      createColumn("totalRounds", "Total rounds"),
    ];
  }
  return [
    createColumn(`${accessorKey}.averageGameLength`, "AVG Game Length"),
    createColumn(`${accessorKey}.roundsPerGame`, "Rounds per game"),
    createColumn(`${accessorKey}.roundsWonPerGame`, "Rounds won per game"),
    createColumn(`${accessorKey}.totalRounds`, "Total rounds"),
  ];
};

const createMapColumn = (
  accessorKey: string,
  header: string,
  isAdvancedDataChosen: boolean
) => ({
  accessorKey,
  header,
  minSize: 30,
  maxSize: 100,
  enableHiding: false,
  columns: isAdvancedDataChosen
    ? [
        ...createStandardColumns(accessorKey),
        ...createAdvancedColumns(accessorKey),
      ]
    : createStandardColumns(accessorKey),
});

export const createMapsPullOneColumns = (
  isAdvancedDataChosen: boolean
): ColumnDef<MapsTableRecord>[] => [
  ...createStartColumns<MapsTableRecord>({ shouldHideGamesPlayed: true }),
  createMapColumn("de_inferno", "Inferno", isAdvancedDataChosen),
  createMapColumn("de_nuke", "Nuke", isAdvancedDataChosen),
];

export const createMapsPullTwoColumns = (
  isAdvancedDataChosen: boolean
): ColumnDef<MapsTableRecord>[] => [
  ...createStartColumns<MapsTableRecord>({ shouldHideGamesPlayed: true }),
  createMapColumn("de_mirage", "Mirage", isAdvancedDataChosen),
  createMapColumn("de_dust2", "Dust II", isAdvancedDataChosen),
];
export const createMapsPullThreeColumns = (
  isAdvancedDataChosen: boolean
): ColumnDef<MapsTableRecord>[] => [
  ...createStartColumns<MapsTableRecord>({ shouldHideGamesPlayed: true }),
  createMapColumn("de_ancient", "Ancient", isAdvancedDataChosen),
  createMapColumn("de_anubis", "Anubis", isAdvancedDataChosen),
];

export const createMapsPullFourColumns = (
  isAdvancedDataChosen: boolean
): ColumnDef<MapsTableRecord>[] => [
  ...createStartColumns<MapsTableRecord>({ shouldHideGamesPlayed: true }),
  createMapColumn("de_train", "Train", isAdvancedDataChosen),
  createMapColumn("de_overpass", "Overpass", isAdvancedDataChosen),
];

export const createMapColumnsForSpecificPlayer = (): ColumnDef<MapStats>[] => {
  return [
    createIndexColumn(),
    createNameColumn(),
    createColumn("gamesPlayed", "Games"),
    createColumn("gamesWon", "Wins"),
    createColumn("gamesLost", "Losses"),
    createColumn("gamesDrawn", "Draws"),
    createColumn("winRatePercentage", "Win Rate", {
      percentageDisplay: true,
    }),
    createColumn("roundsWinPercentage", "Rounds Win Rate", {
      percentageDisplay: true,
    }),
    createColumn("totalGamesLength", "Total games length"),
    createColumn("averageGameLength", "AVG Game Length"),
    createColumn("roundsPerGame", "Rounds per game"),
    createColumn("roundsWonPerGame", "Rounds win per game"),
    createColumn("totalRounds", "Total rounds"),
  ];
};
