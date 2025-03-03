import { StatsFromJson } from "../utils/player";
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { countClutchesWinPercentage, countKd, countKda } from "./utils";

const prisma = new PrismaClient();

// Get player name from command-line arguments
const args = process.argv.slice(2);
const playerNameArg = args.find((arg) => arg.startsWith("--name="));
const playerName = playerNameArg ? playerNameArg.split("=")[1] : null;

const main = async () => {
  const rawData = readFileSync("./src/scripts/stats.json", "utf8");
  const stats = JSON.parse(rawData) as StatsFromJson[];

  for (const [steamId, data] of Object.entries(stats)) {
    if (!playerName) {
      console.log("No player name provided", playerName, playerNameArg);
      return;
    }
    if (data.name !== playerName) {
      continue; // Skip players that don't match
    }

    const existingPlayer = await prisma.playerStats.findUnique({
      where: { id: Number(steamId) },
      include: { weapons: true, maps: true },
    });

    if (!existingPlayer) {
      // If the player doesn't exist, skip (or delete if it was newly added)
      await prisma.playerStats.delete({
        where: { id: Number(steamId) },
      });
      continue;
    }

    const lastFiveMatchesOutcome = existingPlayer.lastFiveMatchesOutcome;

    // Subtract collectable stats
    const collectableStats = {
      gamesPlayed: existingPlayer.gamesPlayed - 1,
      name: existingPlayer.name, // Keep the name unchanged
      playerTable: data.players_table,
      avatar: existingPlayer.avatar, // Keep the avatar unchanged
      kills: existingPlayer.kills - data.kills,
      deaths: existingPlayer.deaths - data.deaths,
      assists: existingPlayer.assists - data.assists,
      killsOnFlash: existingPlayer.killsOnFlash - data.kills_on_flash,
      killsThroughSmoke:
        existingPlayer.killsThroughSmoke - data.kills_through_smoke,
      killsInJump: existingPlayer.killsInJump - data.kills_in_jump,
      killsThroughWall:
        existingPlayer.killsThroughWall - data.kills_through_wall,
      headshots: existingPlayer.headshots - data.headshots,
      damage: existingPlayer.damage - data.damage,
      totalRounds: existingPlayer.totalRounds - data.total_rounds,
      roundsWon: existingPlayer.roundsWon - data.rounds_won,
      entryFrags: existingPlayer.entryFrags - data.entry_frags,
      entryDeaths: existingPlayer.entryDeaths - data.entry_deaths,
      aces: existingPlayer.aces - data.aces,
      mvps: existingPlayer.mvps - data.mvp,
      clutches1v1Played:
        existingPlayer.clutches1v1Played - data.clutches_1v1_played,
      clutches1v1Won: existingPlayer.clutches1v1Won - data.clutches_1v1_won,
      clutches1v2Played:
        existingPlayer.clutches1v2Played - data.clutches_1v2_played,
      clutches1v2Won: existingPlayer.clutches1v2Won - data.clutches_1v2_won,
      clutches1v3Played:
        existingPlayer.clutches1v3Played - data.clutches_1v3_played,
      clutches1v3Won: existingPlayer.clutches1v3Won - data.clutches_1v3_won,
      clutches1v4Played:
        existingPlayer.clutches1v4Played - data.clutches_1v4_played,
      clutches1v4Won: existingPlayer.clutches1v4Won - data.clutches_1v4_won,
      clutches1v5Played:
        existingPlayer.clutches1v5Played - data.clutches_1v5_played,
      clutches1v5Won: existingPlayer.clutches1v5Won - data.clutches_1v5_won,
      lastFiveMatchesOutcome: lastFiveMatchesOutcome.slice(0, -1), // Remove the last match outcome
    };

    // Subtract result-determined stats
    const resultDeterminedStats = {
      gamesWon:
        data.match_outcome === "Win"
          ? existingPlayer.gamesWon - 1
          : existingPlayer.gamesWon,
      gamesLost:
        data.match_outcome === "Loss"
          ? existingPlayer.gamesLost - 1
          : existingPlayer.gamesLost,
      gamesDrawn:
        data.match_outcome === "Draw"
          ? existingPlayer.gamesDrawn - 1
          : existingPlayer.gamesDrawn,
    };

    const impactFactor =
      collectableStats.entryFrags -
      collectableStats.entryDeaths +
      2 * collectableStats.mvps +
      ((2 * collectableStats.aces) / collectableStats.gamesPlayed) *
        (collectableStats.clutches1v1Won / 100 +
          collectableStats.clutches1v2Won / 100 +
          collectableStats.clutches1v3Won / 100 +
          collectableStats.clutches1v4Won / 100 +
          collectableStats.clutches1v5Won / 100);

    // Recalculate countable stats
    const countableStats = {
      kda: countKda(
        collectableStats.kills,
        collectableStats.deaths,
        collectableStats.assists
      ),
      kd: countKd(collectableStats.kills, collectableStats.deaths),
      winRatePercentage:
        (resultDeterminedStats.gamesWon / collectableStats.gamesPlayed) * 100,
      killsPerGame: collectableStats.kills / collectableStats.gamesPlayed,
      deathsPerGame: collectableStats.deaths / collectableStats.gamesPlayed,
      assistsPerGame: collectableStats.assists / collectableStats.gamesPlayed,
      damagePerRound: collectableStats.damage / collectableStats.totalRounds,
      damagePerGame: collectableStats.damage / collectableStats.gamesPlayed,
      killsThroughSmokePerGame:
        collectableStats.killsThroughSmoke / collectableStats.gamesPlayed,
      killsOnFlashPerGame:
        collectableStats.killsOnFlash / collectableStats.gamesPlayed,
      killsInJumpPerGame:
        collectableStats.killsInJump / collectableStats.gamesPlayed,
      killsThroughWallPerGame:
        collectableStats.killsThroughWall / collectableStats.gamesPlayed,
      headshotPercentage:
        (collectableStats.headshots / collectableStats.kills) * 100,
      headshotsPerGame:
        collectableStats.headshots / collectableStats.gamesPlayed,
      roundsWonPerGame:
        collectableStats.roundsWon / collectableStats.gamesPlayed,
      totalRoundsPerGame:
        collectableStats.totalRounds / collectableStats.gamesPlayed,
      roundsWinPercentage:
        (collectableStats.roundsWon / collectableStats.totalRounds) * 100,
      mvpsPerGame: collectableStats.mvps / collectableStats.gamesPlayed,
      entryFragsPerGame:
        collectableStats.entryFrags / collectableStats.gamesPlayed,
      entryKillRating:
        collectableStats.entryFrags / collectableStats.entryDeaths,
      impactFactor,
      acesPerGame: collectableStats.aces / collectableStats.gamesPlayed,
      clutches1v1WinPercentage: countClutchesWinPercentage(
        collectableStats.clutches1v1Played,
        collectableStats.clutches1v1Won
      ),
      clutches1v2WinPercentage: countClutchesWinPercentage(
        collectableStats.clutches1v2Played,
        collectableStats.clutches1v2Won
      ),
      clutches1v3WinPercentage: countClutchesWinPercentage(
        collectableStats.clutches1v3Played,
        collectableStats.clutches1v3Won
      ),
      clutches1v4WinPercentage: countClutchesWinPercentage(
        collectableStats.clutches1v4Played,
        collectableStats.clutches1v4Won
      ),
      clutches1v5WinPercentage: countClutchesWinPercentage(
        collectableStats.clutches1v5Played,
        collectableStats.clutches1v5Won
      ),
    };

    // Update the player stats
    await prisma.playerStats.update({
      where: { id: Number(steamId) },
      data: {
        ...collectableStats,
        ...resultDeterminedStats,
        ...countableStats,
      },
    });

    // Subtract weapon stats
    for (const [weaponName, weaponStats] of Object.entries(data.weapons)) {
      const existingWeapon = existingPlayer.weapons.find(
        (weapon) => weapon.name === weaponName
      );

      if (existingWeapon) {
        await prisma.weaponStats.update({
          where: { id: existingWeapon.id },
          data: {
            kills: existingWeapon.kills - weaponStats.kills,
            deaths: existingWeapon.deaths - weaponStats.deaths,
          },
        });
      }
    }

    // Subtract map stats
    const existingMap = existingPlayer.maps.find(
      (map) => map.name === data.map_played
    );

    if (existingMap) {
      await prisma.mapStats.update({
        where: { id: existingMap.id },
        data: {
          gamesPlayed: existingMap.gamesPlayed - 1,
          gamesWon:
            data.match_outcome === "Win"
              ? existingMap.gamesWon - 1
              : existingMap.gamesWon,
          gamesLost:
            data.match_outcome === "Loss"
              ? existingMap.gamesLost - 1
              : existingMap.gamesLost,
          gamesDrawn:
            data.match_outcome === "Draw"
              ? existingMap.gamesDrawn - 1
              : existingMap.gamesDrawn,
          totalGamesLength:
            existingMap.totalGamesLength - data.map_duration_seconds,
          roundsWon: existingMap.roundsWon - data.rounds_won,
          totalRounds: existingMap.totalRounds - data.total_rounds,
        },
      });
    }
  }

  console.log(
    playerName
      ? `Stats reverted for ${playerName}.`
      : "No player name provided for rollback."
  );
};

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
