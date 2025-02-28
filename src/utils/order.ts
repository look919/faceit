import { Prisma } from "@prisma/client";

export const mainOrderBy: Prisma.PlayerStatsOrderByWithRelationInput[] = [
  {
    winRatePercentage: "desc",
  },
  {
    gamesPlayed: "desc",
  },
  {
    kda: "desc",
  },
];

export const weaponsOrderBy: Prisma.PlayerStatsOrderByWithRelationInput[] = [
  {
    name: "asc",
  },
];

export const advancedOrderBy: Prisma.PlayerStatsOrderByWithRelationInput[] = [
  {
    name: "asc",
  },
];

export const mapsOrderBy: Prisma.PlayerStatsOrderByWithRelationInput[] = [
  {
    name: "asc",
  },
];
