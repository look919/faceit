import { ColumnDef } from "@tanstack/react-table";
import { WeaponsTableRecord } from "./types";
import { renderDecimalValue, startColumns } from "./columns-utils";

export const weaponsTotalKillsColumns: ColumnDef<WeaponsTableRecord>[] = [
  ...(startColumns as ColumnDef<WeaponsTableRecord>[]),
  {
    accessorKey: "special",
    header: () => <div>💀</div>,
    enableSorting: false,
    columns: [
      {
        accessorKey: "knifeKills",
        header: "Knife",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "zeusKills",
        header: "Zeus",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
    ],
  },
  {
    accessorKey: "Rifles",
    header: () => <div>Rifles</div>,
    enableSorting: false,
    columns: [
      {
        accessorKey: "ak47Kills",
        header: "AK-47",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "m4a1sKills",
        header: "M4a1",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "m4a4Kills",
        header: "M4a4",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "awpKills",
        header: "AWP",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "scoutKills",
        header: "Scout",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "famasKills",
        header: "Famas",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "galilKills",
        header: "Galil",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
    ],
  },
  {
    accessorKey: "Pistols",
    header: () => <div>Pistols</div>,
    enableSorting: false,
    columns: [
      {
        accessorKey: "glockKills",
        header: "Glock",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "uspOrP2000Kills",
        header: "USP",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "deagleKills",
        header: "Deagle",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "otherPistolsKills",
        header: "Other",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
    ],
  },
  {
    accessorKey: "SMGs",
    header: "SMGs",
    enableSorting: false,
    columns: [
      {
        accessorKey: "mac10OrMp9Kills",
        header: "Mac/MP9",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "p90Kills",
        header: "P90",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "otherSMGKills",
        header: "Other",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
    ],
  },
  {
    accessorKey: "rest",
    header: "Rest",
    enableSorting: false,
    columns: [
      {
        accessorKey: "shotgunKills",
        header: "Szymczoki",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "negevOrM249Kills",
        header: "Negev/M249",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "autocampKills",
        header: "Autokurwa",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "scopedRiflesKills",
        header: "Aug/SG",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "grenadeOrMolotovKills",
        header: "HE/Molotov",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
    ],
  },
];

export const weaponsAverageKillsColumns: ColumnDef<WeaponsTableRecord>[] = [
  ...(startColumns as ColumnDef<WeaponsTableRecord>[]),
  {
    accessorKey: "special",
    header: () => <div>💀</div>,
    enableSorting: false,
    columns: [
      {
        accessorKey: "knifeKillsPerGame",
        header: "Knife",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "zeusKillsPerGame",
        header: "Zeus",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
    ],
  },
  {
    accessorKey: "Rifles",
    header: () => <div>Rifles</div>,
    enableSorting: false,
    columns: [
      {
        accessorKey: "ak47KillsPerGame",
        header: "AK-47",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "m4a1sKillsPerGame",
        header: "M4a1",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "m4a4KillsPerGame",
        header: "M4a4",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "awpKillsPerGame",
        header: "AWP",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "scoutKillsPerGame",
        header: "Scout",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "famasKillsPerGame",
        header: "Famas",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "galilKillsPerGame",
        header: "Galil",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
    ],
  },
  {
    accessorKey: "Pistols",
    header: () => <div>Pistols</div>,
    enableSorting: false,
    columns: [
      {
        accessorKey: "glockKillsPerGame",
        header: "Glock",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "uspOrP2000KillsPerGame",
        header: "USP",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "deagleKillsPerGame",
        header: "Deagle",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "otherPistolsKillsPerGame",
        header: "Other",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
    ],
  },
  {
    accessorKey: "SMGs",
    header: "SMGs",
    enableSorting: false,
    columns: [
      {
        accessorKey: "mac10OrMp9KillsPerGame",
        header: "Mac/MP9",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "p90KillsPerGame",
        header: "P90",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "otherSMGKillsPerGame",
        header: "Other",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
    ],
  },
  {
    accessorKey: "rest",
    header: "Rest",
    enableSorting: false,
    columns: [
      {
        accessorKey: "shotgunKillsPerGame",
        header: "Szymczoki",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "negevOrM249KillsPerGame",
        header: "Negev/M249",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "autocampKillsPerGame",
        header: "Autokurwa",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "scopedRiflesKillsPerGame",
        header: "Aug/SG",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
      {
        accessorKey: "grenadeOrMolotovKillsPerGame",
        header: "HE/Molotov",
        maxSize: 60,
        cell: ({ getValue }) => renderDecimalValue(getValue),
      },
    ],
  },
];
