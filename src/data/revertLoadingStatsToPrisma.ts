import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { Stats } from "../app/DataTable/types";

const prisma = new PrismaClient();

const countKda = (kills: number, deaths: number, assists: number) => {
  return (kills + assists * 0.5) / Math.max(1, deaths);
};

const main = async () => {
  const rawData = readFileSync("./stats.json", "utf8");
  const stats = JSON.parse(rawData) as Stats[];

  for (const [steamId, data] of Object.entries(stats)) {
    const existingPlayer = await prisma.playerStats.findUnique({
      where: { id: Number(steamId) },
    });

    if (!existingPlayer) {
      console.log(`Skipping player ${steamId} (not found in DB).`);
      continue;
    }

    // If this was the first game, remove the player from the database
    if (existingPlayer.gamesPlayed === 1) {
      await prisma.playerStats.delete({ where: { id: Number(steamId) } });
      console.log(`Removed player ${steamId} (first game undone).`);
      continue;
    }

    // Otherwise, subtract stats, ensuring they don't go below zero
    const collectableStats = {
      gamesPlayed: existingPlayer.gamesPlayed - 1,
      kills: Math.max(0, existingPlayer.kills - data.kills),
      deaths: Math.max(0, existingPlayer.deaths - data.deaths),
      assists: Math.max(0, existingPlayer.assists - data.assists),
      headshots: Math.max(0, existingPlayer.headshots - data.headshots),
      damage: Math.max(0, existingPlayer.damage - data.damage),
      totalRounds: Math.max(0, existingPlayer.totalRounds - data.total_rounds),
      roundsWon: Math.max(0, existingPlayer.roundsWon - data.rounds_won),
      knifeKills: Math.max(0, existingPlayer.knifeKills - data.knife_kills),
    };

    const resultDeterminedStats = {
      gamesWon:
        data.match_outcome === "Win"
          ? Math.max(0, existingPlayer.gamesWon - 1)
          : existingPlayer.gamesWon,
      gamesLost:
        data.match_outcome === "Loss"
          ? Math.max(0, existingPlayer.gamesLost - 1)
          : existingPlayer.gamesLost,
      gamesDrawn:
        data.match_outcome === "Draw"
          ? Math.max(0, existingPlayer.gamesDrawn - 1)
          : existingPlayer.gamesDrawn,
    };

    // Recalculate derived stats
    const countableStats = {
      kda: countKda(
        collectableStats.kills,
        collectableStats.deaths,
        collectableStats.assists
      ),
      killsPerGame: collectableStats.kills / collectableStats.gamesPlayed,
      deathsPerGame: collectableStats.deaths / collectableStats.gamesPlayed,
      assistsPerGame: collectableStats.assists / collectableStats.gamesPlayed,
      damagePerRound: collectableStats.totalRounds
        ? collectableStats.damage / collectableStats.totalRounds
        : 0,
      damagePerGame: collectableStats.damage / collectableStats.gamesPlayed,
      headshotPercentage: collectableStats.kills
        ? (collectableStats.headshots / collectableStats.kills) * 100
        : 0,
      winRatePercentage:
        (resultDeterminedStats.gamesWon / collectableStats.gamesPlayed) * 100,
      headshotsPerGame:
        collectableStats.headshots / collectableStats.gamesPlayed,
      roundsWonPerGame:
        collectableStats.roundsWon / collectableStats.gamesPlayed,
      totalRoundsPerGame:
        collectableStats.totalRounds / collectableStats.gamesPlayed,
      roundsWinPercentage: collectableStats.totalRounds
        ? (collectableStats.roundsWon / collectableStats.totalRounds) * 100
        : 0,
    };

    await prisma.playerStats.update({
      where: { id: Number(steamId) },
      data: {
        ...collectableStats,
        ...resultDeterminedStats,
        ...countableStats,
      },
    });

    console.log(`Reverted stats for player ${steamId}.`);
  }

  console.log("Stats reverted in the database.");
};

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
