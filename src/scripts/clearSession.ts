import { PlayerTable, PrismaClient } from "@prisma/client";
import { revalidateAllData } from "../utils/revalidate";

const prisma = new PrismaClient();

const clearSessionStats = async () => {
  // First, find players that meet the deletion criteria
  const playersToDelete = await prisma.playerStats.findMany({
    where: {
      playerTable: PlayerTable.SESSION,
      OR: [{ id: 0 }, { gamesPlayed: { lte: 1 } }],
    },
    select: { id: true },
  });

  const playerIdsToDelete = playersToDelete.map((player) => player.id);

  // Delete weapon stats for players meeting criteria or all session weapon stats
  await prisma.weaponStats.deleteMany({
    where: {
      OR: [
        { playerTable: PlayerTable.SESSION },
        { playerId: { in: playerIdsToDelete } },
      ],
    },
  });

  // Delete map stats for players meeting criteria or all session map stats
  await prisma.mapStats.deleteMany({
    where: {
      OR: [
        { playerTable: PlayerTable.SESSION },
        { playerId: { in: playerIdsToDelete } },
      ],
    },
  });

  // Delete all session player stats
  await prisma.playerStats.deleteMany({
    where: {
      playerTable: PlayerTable.SESSION,
    },
  });

  // Also delete players with gamesPlayed <= 1 or name === "Operator" from any table
  await prisma.weaponStats.deleteMany({
    where: {
      player: {
        OR: [{ id: 0 }, { gamesPlayed: { lte: 1 } }],
      },
    },
  });

  await prisma.mapStats.deleteMany({
    where: {
      player: {
        OR: [{ id: 0 }, { gamesPlayed: { lte: 1 } }],
      },
    },
  });

  await prisma.playerStats.deleteMany({
    where: {
      OR: [{ id: 0 }, { gamesPlayed: { lte: 1 } }],
    },
  });

  console.log("Session stats cleared");

  // Send revalidation request to ensure fresh data is fetched
  await revalidateAllData();
};

clearSessionStats()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
