import { PlayerTable, PrismaClient } from "@prisma/client";
import { revalidateAllData } from "../utils/revalidate";

const prisma = new PrismaClient();

const clearSeasonStats = async () => {
  await prisma.weaponStats.deleteMany({
    where: {
      playerTable: PlayerTable.SEASON,
    },
  });
  await prisma.mapStats.deleteMany({
    where: {
      playerTable: PlayerTable.SEASON,
    },
  });
  await prisma.playerStats.deleteMany({
    where: {
      playerTable: PlayerTable.SEASON,
    },
  });

  console.log("Seasons stats cleared.");

  // Send revalidation request to ensure fresh data is fetched
  await revalidateAllData();
};

clearSeasonStats()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
