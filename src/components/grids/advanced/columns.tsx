import { ColumnDef } from "@tanstack/react-table";
import { createColumn, createStartColumns } from "../columns-utils";

export type AdvancedGridRecord = {
  id: bigint;
  name: string;
  avatar: string;

  knifeKills: number | undefined;
  knifeDeaths: number | undefined;
  zeusKills: number | undefined;
  zeusDeaths: number | undefined;

  mvps: number;
  aces: number;
  entryFrags: number;
  killsTroughSmoke: number;
  killsOnFlash: number;
  killsTroughWall: number;
  killsInJump: number;

  acesPerGame: number;
  mvpsPerGame: number;
  entryFragsPerGame: number;
  entryKillRating: number;
  killsInJumpPerGame: number;
  killsTroughWallPerGame: number;
  killsOnFlashPerGame: number;
  killsTroughSmokePerGame: number;

  clutches1v1Played: number;
  clutches1v1Won: number;
  clutches1v2Played: number;
  clutches1v2Won: number;
  clutches1v3Played: number;
  clutches1v3Won: number;
  clutches1v4Played: number;
  clutches1v4Won: number;
  clutches1v5Played: number;
  clutches1v5Won: number;
  clutches1v1WinPercentage: number;
  clutches1v2WinPercentage: number;
  clutches1v3WinPercentage: number;
  clutches1v4WinPercentage: number;
  clutches1v5WinPercentage: number;
};

export const createImpactFactorColumns = (
  shouldDisplayAdvancedData: boolean
): ColumnDef<AdvancedGridRecord>[] => {
  const columns = [
    ...createStartColumns<AdvancedGridRecord>(),
    {
      accessorKey: "Average",
      header: "Average per game",
      enableSorting: false,
      columns: [
        createColumn("impactFactor", "Impact Factor"),
        createColumn("entryFragsPerGame", "Entry Frags"),
        createColumn("entryKillRating", "Entry K/D"),
        createColumn("mvpsPerGame", "MVPs"),
        createColumn("acesPerGame", "Aces"),
        createColumn("damagePerRound", "ADR"),
        createColumn("bombPlantsPerGame", "Bomb Plants"),
        createColumn("bombDefusesPerGame", "Bomb Defuses"),
      ],
    },
    {
      accessorKey: "Clutches",
      header: "Clutches",
      enableSorting: false,
      columns: [
        createColumn("clutches1v1WinPercentage", "1v1 Win %", {
          percentageDisplay: true,
        }),
        createColumn("clutches1v2WinPercentage", "1v2 Win %", {
          percentageDisplay: true,
        }),
        createColumn("clutches1v3WinPercentage", "1v3 Win %", {
          percentageDisplay: true,
        }),
        createColumn("clutches1v4WinPercentage", "1v4 Win %", {
          percentageDisplay: true,
        }),
        createColumn("clutches1v5WinPercentage", "1v5 Win %", {
          percentageDisplay: true,
        }),
      ],
    },
    {
      accessorKey: "Total",
      header: "Total",
      enableSorting: false,
      columns: [
        createColumn("mvps", "MVPs"),
        createColumn("aces", "Aces"),
        createColumn("bombPlants", "Bomb Plants"),
        createColumn("bombDefuses", "Bomb Defuses"),
        createColumn("entryFrags", "Entry Frags"),
        createColumn("entryDeaths", "Entry Deaths"),
        createColumn("clutches1v1Played", "1v1 Played"),
        createColumn("clutches1v1Won", "1v1 Won"),
        createColumn("clutches1v2Played", "1v2 Played"),
        createColumn("clutches1v2Won", "1v2 Won"),
        createColumn("clutches1v3Played", "1v3 Played"),
        createColumn("clutches1v3Won", "1v3 Won"),
        createColumn("clutches1v4Played", "1v4 Played"),
        createColumn("clutches1v4Won", "1v4 Won"),
        createColumn("clutches1v5Played", "1v5 Played"),
        createColumn("clutches1v5Won", "1v5 Won"),
      ],
    },
  ];

  if (shouldDisplayAdvancedData) {
    return columns;
  }

  return columns.slice(0, -1);
};

export const createAdvancedColumns = (
  shouldDisplayAdvancedData: boolean
): ColumnDef<AdvancedGridRecord>[] => {
  const columns = [
    ...createStartColumns<AdvancedGridRecord>(),
    {
      accessorKey: "gen",
      header: "💀",
      enableSorting: false,
      columns: [
        createColumn("knifeKills", "Knife Kills"),
        createColumn("knifeDeaths", "Knife Deaths"),
        createColumn("zeusKills", "Zeus Kills"),
        createColumn("zeusDeaths", "Zeus Deaths"),
      ],
    },
    {
      accessorKey: "Average",
      header: "Average per game",
      enableSorting: false,
      columns: [
        createColumn("killsOnFlashPerGame", "Kills on Flashes"),
        createColumn("killsTroughWallPerGame", "Kills through Wall"),
        createColumn("killsTroughSmokePerGame", "Kills through Smoke"),
        createColumn("killsInJumpPerGame", "Kills in Jump"),
        createColumn("grenadeDamagePerGame", "Grenade Damage"),
        createColumn("enemiesFlashedPerGame", "Enemies Flashed"),
        createColumn("flashesThrownPerGame", "Flashes Thrown"),
        createColumn("smokesThrownPerGame", "Smokes Thrown"),
        createColumn("heGrenadesThrownPerGame", "HE Grenades Thrown"),
        createColumn("molotovsThrownPerGame", "Molotovs Thrown"),
        createColumn("decoysThrownPerGame", "Decoys Thrown"),
      ],
    },
    {
      accessorKey: "Total",
      header: "Total",
      enableSorting: false,
      columns: [
        createColumn("killsOnFlash", "Kills on flash"),
        createColumn("killsTroughWall", "Kills trough wall"),
        createColumn("killsTroughSmoke", "Kills trough smoke"),
        createColumn("killsInJump", "Kills in jump"),
        createColumn("grenadeDamage", "Grenade Damage"),
        createColumn("enemiesFlashed", "Enemies Flashed"),
        createColumn("flashesThrown", "Flashes Thrown"),
        createColumn("smokesThrown", "Smokes Thrown"),
        createColumn("heGrenadesThrown", "HE Grenades Thrown"),
        createColumn("molotovsThrown", "Molotovs Thrown"),
        createColumn("decoysThrown", "Decoys Thrown"),
      ],
    },
  ];

  if (shouldDisplayAdvancedData) {
    return columns;
  }

  return columns.slice(0, -1);
};
