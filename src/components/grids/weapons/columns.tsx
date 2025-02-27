import { ColumnDef } from "@tanstack/react-table";
import { createStartColumns, createColumn } from "../columns-utils";
import { WeaponName } from "@/utils/weapons";
import { WeaponStats } from "@prisma/client";

export type WeaponsTableRecord = {
  id: bigint;
  name: string;
  avatar: string;
} & {
  [K in WeaponName]: WeaponStats;
};

const createWeaponColumn = (
  accessorKey: string,
  header: string,
  isAverageChosen: boolean
) => ({
  accessorKey,
  header,
  minSize: 30,
  maxSize: 100,
  enableHiding: false,
  columns: [0, 1].map((value) =>
    value === 0
      ? createColumn(
          `${accessorKey}.${isAverageChosen ? "killsPerGame" : "kills"}`,
          "K"
        )
      : createColumn(
          `${accessorKey}.${isAverageChosen ? "deathsPerGame" : "deaths"}`,
          "D"
        )
  ),
});

export const createWeaponsColumns = (
  isAverageChosen: boolean
): ColumnDef<WeaponsTableRecord>[] => [
  ...createStartColumns<WeaponsTableRecord>(),
  {
    accessorKey: "special",
    header: "Assassin",
    enableSorting: false,
    enableHiding: true,
    columns: [
      createWeaponColumn("knife", "Knife", isAverageChosen),
      createWeaponColumn("zeus", "Zeus", isAverageChosen),
    ],
  },
  {
    accessorKey: "Rifles",
    header: "Rifles",
    enableSorting: false,
    enableHiding: true,
    columns: [
      createWeaponColumn("ak47", "AK-47", isAverageChosen),
      createWeaponColumn("m4a1s", "M4a1", isAverageChosen),
      createWeaponColumn("m4a4", "M4a4", isAverageChosen),
      createWeaponColumn("famas", "Famas", isAverageChosen),
      createWeaponColumn("galil", "Galil", isAverageChosen),
      createWeaponColumn("aug", "Aug", isAverageChosen),
      createWeaponColumn("sg553", "SG553", isAverageChosen),
    ],
  },
  {
    accessorKey: "Snipers",
    header: "Snipers",
    enableSorting: false,
    enableHiding: true,
    columns: [
      createWeaponColumn("awp", "AWP", isAverageChosen),
      createWeaponColumn("scout", "Scout", isAverageChosen),
      createWeaponColumn("scar20", "Scar20", isAverageChosen),
      createWeaponColumn("g3sg1", "G3SG1", isAverageChosen),
    ],
  },
  {
    accessorKey: "Pistols",
    header: "Pistols",
    enableSorting: false,
    enableHiding: true,
    columns: [
      createWeaponColumn("glock", "Glock", isAverageChosen),
      createWeaponColumn("usp", "USP", isAverageChosen),
      createWeaponColumn("p2000", "P2000", isAverageChosen),
      createWeaponColumn("p250", "P250", isAverageChosen),
      createWeaponColumn("tec9", "Tec9", isAverageChosen),
      createWeaponColumn("fiveSeven", "Five-seveN", isAverageChosen),
      createWeaponColumn("cz75", "CZ75", isAverageChosen),
      createWeaponColumn("deagle", "Deagle", isAverageChosen),
      createWeaponColumn("revolver", "Revolver", isAverageChosen),
    ],
  },
  {
    accessorKey: "SMGs",
    header: "SMGs",
    enableSorting: false,
    enableHiding: true,
    columns: [
      createWeaponColumn("mac10", "Mac10", isAverageChosen),
      createWeaponColumn("mp9", "MP9", isAverageChosen),
      createWeaponColumn("p90", "P90", isAverageChosen),
      createWeaponColumn("bizon", "Bizon", isAverageChosen),
      createWeaponColumn("ump", "UMP", isAverageChosen),
      createWeaponColumn("mp7", "MP7", isAverageChosen),
      createWeaponColumn("mp5", "MP5", isAverageChosen),
    ],
  },
  {
    accessorKey: "Heavy",
    header: "Heavy",
    enableSorting: false,
    enableHiding: true,
    columns: [
      createWeaponColumn("nova", "Nova", isAverageChosen),
      createWeaponColumn("xm1014", "XM1014", isAverageChosen),
      createWeaponColumn("mag7", "Mag7", isAverageChosen),
      createWeaponColumn("sawedOff", "SawedOff", isAverageChosen),
      createWeaponColumn("negev", "Negev", isAverageChosen),
      createWeaponColumn("m249", "M249", isAverageChosen),
    ],
  },
  {
    accessorKey: "Grenades",
    header: "Grenades",
    enableSorting: false,
    enableHiding: true,
    columns: [
      createWeaponColumn("heGrenade", "HE", isAverageChosen),
      createWeaponColumn("molotov", "Molotov", isAverageChosen),
      createWeaponColumn("otherGrenade", "Other", isAverageChosen),
    ],
  },
];

export const createWeaponsOthersColumns = (
  isAverageChosen: boolean
): ColumnDef<WeaponsTableRecord>[] => [
  ...createStartColumns<WeaponsTableRecord>(),
  createWeaponColumn("knife", "Knife", isAverageChosen),
  createWeaponColumn("zeus", "Zeus", isAverageChosen),
  createWeaponColumn("heGrenade", "HE", isAverageChosen),
  createWeaponColumn("molotov", "Molotov", isAverageChosen),
  createWeaponColumn("otherGrenade", "Other", isAverageChosen),
];

export const createWeaponsRiflesColumns = (
  isAverageChosen: boolean
): ColumnDef<WeaponsTableRecord>[] => [
  ...createStartColumns<WeaponsTableRecord>(),
  createWeaponColumn("ak47", "AK-47", isAverageChosen),
  createWeaponColumn("m4a1s", "M4a1", isAverageChosen),
  createWeaponColumn("m4a4", "M4a4", isAverageChosen),
  createWeaponColumn("awp", "AWP", isAverageChosen),
  createWeaponColumn("g3sg1", "G3SG1", isAverageChosen),
  createWeaponColumn("famas", "Famas", isAverageChosen),
  createWeaponColumn("galil", "Galil", isAverageChosen),
  createWeaponColumn("aug", "Aug", isAverageChosen),
  createWeaponColumn("sg553", "SG553", isAverageChosen),
  createWeaponColumn("scout", "Scout", isAverageChosen),
  createWeaponColumn("scar20", "Scar20", isAverageChosen),
];

export const createWeaponsPistolsColumns = (
  isAverageChosen: boolean
): ColumnDef<WeaponsTableRecord>[] => [
  ...createStartColumns<WeaponsTableRecord>(),
  createWeaponColumn("glock", "Glock", isAverageChosen),
  createWeaponColumn("usp", "USP", isAverageChosen),
  createWeaponColumn("p2000", "P2000", isAverageChosen),
  createWeaponColumn("p250", "P250", isAverageChosen),
  createWeaponColumn("tec9", "Tec9", isAverageChosen),
  createWeaponColumn("fiveSeven", "Five-seveN", isAverageChosen),
  createWeaponColumn("cz75", "CZ75", isAverageChosen),
  createWeaponColumn("deagle", "Deagle", isAverageChosen),
  createWeaponColumn("revolver", "Revolver", isAverageChosen),
];

export const createWeaponsSecondaryColumns = (
  isAverageChosen: boolean
): ColumnDef<WeaponsTableRecord>[] => [
  ...createStartColumns<WeaponsTableRecord>(),
  createWeaponColumn("mac10", "Mac10", isAverageChosen),
  createWeaponColumn("mp9", "MP9", isAverageChosen),
  createWeaponColumn("p90", "P90", isAverageChosen),
  createWeaponColumn("bizon", "Bizon", isAverageChosen),
  createWeaponColumn("ump", "UMP", isAverageChosen),
  createWeaponColumn("mp7", "MP7", isAverageChosen),
  createWeaponColumn("mp5", "MP5", isAverageChosen),
  createWeaponColumn("nova", "Nova", isAverageChosen),
  createWeaponColumn("xm1014", "XM1014", isAverageChosen),
  createWeaponColumn("mag7", "Mag7", isAverageChosen),
  createWeaponColumn("sawedOff", "SawedOff", isAverageChosen),
  createWeaponColumn("negev", "Negev", isAverageChosen),
  createWeaponColumn("m249", "M249", isAverageChosen),
];
