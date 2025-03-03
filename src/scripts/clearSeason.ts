import { PlayerTable, PrismaClient } from "@prisma/client";

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
};

clearSeasonStats()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
