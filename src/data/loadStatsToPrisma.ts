import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { Stats } from "../app/DataTable/types";

const prisma = new PrismaClient();

const countKda = (kills: number, deaths: number, assists: number) => {
  return (kills + assists * 0.5) / Math.max(1, deaths);
};

const main = async () => {
  const rawData = readFileSync("./src/data/stats.json", "utf8");
  const stats = JSON.parse(rawData) as Stats[];

  for (const [steamId, data] of Object.entries(stats)) {
    const existingPlayer = await prisma.playerStats.findUnique({
      where: { id: Number(steamId) },
    });

    const collectableStats = {
      gamesPlayed: existingPlayer ? existingPlayer.gamesPlayed + 1 : 1,
      name: data.name,
      kills: existingPlayer ? existingPlayer.kills + data.kills : data.kills,
      deaths: existingPlayer
        ? existingPlayer.deaths + data.deaths
        : data.deaths,
      assists: existingPlayer
        ? existingPlayer.assists + data.assists
        : data.assists,
      headshots: existingPlayer
        ? existingPlayer.headshots + data.headshots
        : data.headshots,
      damage: existingPlayer
        ? existingPlayer.damage + data.damage
        : data.damage,

      totalRounds: existingPlayer
        ? existingPlayer.totalRounds + data.total_rounds
        : data.total_rounds,
      roundsWon: existingPlayer
        ? existingPlayer.roundsWon + data.rounds_won
        : data.rounds_won,
    };

    const resultDeterminedStats = existingPlayer
      ? {
          gamesWon:
            data.match_outcome === "Win"
              ? existingPlayer.gamesWon + 1
              : existingPlayer.gamesWon,
          gamesLost:
            data.match_outcome === "Loss"
              ? existingPlayer.gamesLost + 1
              : existingPlayer.gamesLost,
          gamesDrawn:
            data.match_outcome === "Draw"
              ? existingPlayer.gamesDrawn + 1
              : existingPlayer.gamesDrawn,
        }
      : {
          gamesWon: data.match_outcome === "Win" ? 1 : 0,
          gamesLost: data.match_outcome === "Loss" ? 1 : 0,
          gamesDrawn: data.match_outcome === "Draw" ? 1 : 0,
        };

    const countableStats = {
      kda: countKda(
        collectableStats.kills,
        collectableStats.deaths,
        collectableStats.assists
      ),
      killsPerGame: collectableStats.kills / collectableStats.gamesPlayed,
      deathsPerGame: collectableStats.deaths / collectableStats.gamesPlayed,
      assistsPerGame: collectableStats.assists / collectableStats.gamesPlayed,
      damagePerRound: collectableStats.damage / collectableStats.totalRounds,
      damagePerGame: collectableStats.damage / collectableStats.gamesPlayed,
      headshotPercentage:
        (collectableStats.headshots / collectableStats.kills) * 100,
      winRatePercentage:
        (resultDeterminedStats.gamesWon / collectableStats.gamesPlayed) * 100,
      headshotsPerGame:
        collectableStats.headshots / collectableStats.gamesPlayed,
      roundsWonPerGame:
        collectableStats.roundsWon / collectableStats.gamesPlayed,
      totalRoundsPerGame:
        collectableStats.totalRounds / collectableStats.gamesPlayed,
      roundsWinPercentage:
        (collectableStats.roundsWon / collectableStats.totalRounds) * 100,
    };

    await prisma.playerStats.upsert({
      where: { id: Number(steamId) },
      create: {
        id: Number(steamId),
        ...collectableStats,
        ...resultDeterminedStats,
        ...countableStats,
      },
      update: {
        ...collectableStats,
        ...resultDeterminedStats,
        ...countableStats,
      },
    });
  }

  console.log("Stats updated in the database.");
};

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
