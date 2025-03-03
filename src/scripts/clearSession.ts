import { PlayerTable, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const clearSessionStats = async () => {
  await prisma.weaponStats.deleteMany({
    where: {
      playerTable: PlayerTable.SESSION,
    },
  });
  await prisma.mapStats.deleteMany({
    where: {
      playerTable: PlayerTable.SESSION,
    },
  });
  await prisma.playerStats.deleteMany({
    where: {
      playerTable: PlayerTable.SESSION,
    },
  });

  console.log("Session stats cleared.");
};

clearSessionStats()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
