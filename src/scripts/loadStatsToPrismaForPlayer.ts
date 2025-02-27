import { StatsFromJson } from "../utils/types";
import { PlayerStats, PrismaClient, WeaponStats } from "@prisma/client";
import { readFileSync } from "fs";

const prisma = new PrismaClient();

const countKda = (kills: number, deaths: number, assists: number) => {
  return (kills + assists * 0.5) / Math.max(1, deaths);
};

// Get player name from command-line arguments
const args = process.argv.slice(2);
const playerNameArg = args.find((arg) => arg.startsWith("--name="));
const playerName = playerNameArg ? playerNameArg.split("=")[1] : null;

const main = async () => {
  const rawData = readFileSync("./src/scripts/stats.json", "utf8");
  const stats = JSON.parse(rawData) as StatsFromJson[];

  for (const [steamId, data] of Object.entries(stats)) {
    if (playerName && data.name !== playerName) continue; // Skip players that don't match

    for (const model of ["playerStats", "sessionPlayerStats"] as const) {
      const existingPlayer =
        model === "playerStats"
          ? await prisma[model].findUnique({
              where: { id: Number(steamId) },
              include: { weapons: model === "playerStats" },
            })
          : await prisma[model].findUnique({ where: { id: Number(steamId) } });

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
        knifeKills: existingPlayer
          ? existingPlayer.knifeKills + data.knife_kills
          : data.knife_kills,
        knifeDeaths: existingPlayer
          ? existingPlayer.knifeDeaths + data.knife_deaths
          : data.knife_deaths,
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

      // 1. Update or create player stats
      await prisma[model as "playerStats"].upsert({
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

      if (model === "playerStats") {
        // 2. Handle weapon stats separately
        const weaponStats = Object.entries(data.weapons).map(
          ([weapon, kills]) => {
            const existingWeapon = (
              existingPlayer as PlayerStats & { weapons: WeaponStats[] }
            ).weapons?.find((weaponStat) => weaponStat.name === weapon);

            if (existingWeapon) {
              // Update existing weapon stats
              return prisma.weaponStats.update({
                where: { id: existingWeapon.id },
                data: {
                  totalKills: existingWeapon.totalKills + kills,
                  averageKillsPerGame:
                    (existingWeapon.totalKills + kills) /
                    collectableStats.gamesPlayed,
                },
              });
            } else {
              // Create new weapon if it doesn't exist
              return prisma.weaponStats.create({
                data: {
                  name: weapon,
                  totalKills: kills,
                  averageKillsPerGame: kills / collectableStats.gamesPlayed,
                  playerId: Number(steamId),
                },
              });
            }
          }
        );
        // 3. Await all weapon updates/insertions
        await Promise.all(weaponStats);
      }
    }
  }

  console.log(
    playerName
      ? `Stats updated for ${playerName}.`
      : "Stats updated for all players."
  );
};

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
