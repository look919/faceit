import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const clearSessionStats = async () => {
  await prisma.sessionPlayerStats.deleteMany();
  console.log("Session stats cleared.");
};

clearSessionStats()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
