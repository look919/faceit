import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const clearSessionStats = async () => {
  await prisma.weaponStats.deleteMany({
    where: {
      isSessionWeapon: true,
    },
  });
  await prisma.mapStats.deleteMany({
    where: {
      isSessionMap: true,
    },
  });
  await prisma.playerStats.deleteMany({
    where: {
      isSessionPlayer: true,
    },
  });

  console.log("Session stats cleared.");
};

clearSessionStats()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
