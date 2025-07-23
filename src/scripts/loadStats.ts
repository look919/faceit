import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { playerAvatarsMap, StatsFromJson } from "../utils/player";
import { revalidateAllData } from "../utils/revalidate";
import { countClutchesWinPercentage, countKd, countKda } from "./utils";

const prisma = new PrismaClient();

const countImpactFactor = (stats: {
  entryKillRating: number;
  mvpsPerGame: number;
  bombPlantsPerGame: number;
  bombDefusesPerGame: number;
  damagePerGame: number;
  acesPerGame: number;
  clutches1v1WinPercentage: number;
  clutches1v2WinPercentage: number;
  clutches1v3WinPercentage: number;
  clutches1v4WinPercentage: number;
  clutches1v5WinPercentage: number;
}) => {
  let points = 0;

  // Entry Kill Rating points (max 2 points: 1.25 × entryKd, but maximum 2)
  points += Math.min(1.25 * stats.entryKillRating, 2);

  // MVPs per game points (max 0.5 points)
  if (stats.mvpsPerGame >= 3) {
    points += 0.5;
  } else if (stats.mvpsPerGame >= 2.75) {
    points += 0.4;
  } else if (stats.mvpsPerGame >= 2.25) {
    points += 0.3;
  } else if (stats.mvpsPerGame >= 1.75) {
    points += 0.2;
  } else if (stats.mvpsPerGame >= 1) {
    points += 0.1;
  }

  // Bomb plants per game (0.1 point if >= 1)
  if (stats.bombPlantsPerGame >= 1) {
    points += 0.1;
  }

  // Bomb defuses per game (0.1 point if >= 0.3)
  if (stats.bombDefusesPerGame >= 0.3) {
    points += 0.1;
  }

  // Damage per game points
  if (stats.damagePerGame > 85) {
    points += 0.2;
  } else if (stats.damagePerGame > 75) {
    points += 0.1;
  }

  // Aces per game (0.1 point if >= 0.03)
  if (stats.acesPerGame >= 0.03) {
    points += 0.1;
  }

  // Clutch win percentages (convert to decimal for comparison)
  const clutch1v1 = stats.clutches1v1WinPercentage / 100;
  const clutch1v2 = stats.clutches1v2WinPercentage / 100;
  const clutch1v3 = stats.clutches1v3WinPercentage / 100;
  const clutch1v4 = stats.clutches1v4WinPercentage / 100;
  const clutch1v5 = stats.clutches1v5WinPercentage / 100;

  // 1v1 clutches
  if (clutch1v1 > 0.75) {
    points += 0.7;
  } else if (clutch1v1 > 0.65) {
    points += 0.5;
  } else if (clutch1v1 > 0.6) {
    points += 0.3;
  } else if (clutch1v1 > 0.55) {
    points += 0.2;
  } else if (clutch1v1 > 0.5) {
    points += 0.1;
  }

  // 1v2 clutches
  if (clutch1v2 > 0.25) {
    points += 0.7;
  } else if (clutch1v2 > 0.2) {
    points += 0.5;
  } else if (clutch1v2 > 0.15) {
    points += 0.3;
  } else if (clutch1v2 > 0.1) {
    points += 0.2;
  } else if (clutch1v2 > 0.05) {
    points += 0.1;
  }

  // 1v3 clutches
  if (clutch1v3 > 0.1) {
    points += 0.4;
  } else if (clutch1v3 > 0.07) {
    points += 0.3;
  } else if (clutch1v3 > 0.05) {
    points += 0.2;
  } else if (clutch1v3 > 0.02) {
    points += 0.1;
  }

  // 1v4 clutches (0.1 if any above 0)
  if (clutch1v4 > 0) {
    points += 0.1;
  }

  // 1v5 clutches (0.1 if any above 0)
  if (clutch1v5 > 0) {
    points += 0.1;
  }

  // Return total points divided by 5
  return points / 5;
};

const main = async () => {
  const rawData = readFileSync("./src/scripts/stats.json", "utf8");
  const stats = JSON.parse(rawData) as StatsFromJson[];
  let mapPlayed = "";

  for (const [steamId, data] of Object.entries(stats)) {
    const existingPlayer = await prisma.playerStats.findUnique({
      where: { id: Number(steamId) },
      include: { weapons: true, maps: true },
    });
    mapPlayed = data.map_played;
    const lastFiveMatchesOutcome = existingPlayer?.lastFiveMatchesOutcome || "";

    const collectableStats = {
      gamesPlayed: existingPlayer ? existingPlayer.gamesPlayed + 1 : 1,
      gamesPlayedSinceSeason3Start: existingPlayer
        ? existingPlayer.gamesPlayedSinceSeason3Start + 1
        : 1,
      name: data.name,
      playerTable: data.players_table,
      avatar:
        playerAvatarsMap[data.name as keyof typeof playerAvatarsMap] ||
        "default.jpg",
      kills: existingPlayer ? existingPlayer.kills + data.kills : data.kills,
      deaths: existingPlayer
        ? existingPlayer.deaths + data.deaths
        : data.deaths,
      assists: existingPlayer
        ? existingPlayer.assists + data.assists
        : data.assists,
      killsOnFlash: existingPlayer
        ? existingPlayer.killsOnFlash + data.kills_on_flash
        : data.kills_on_flash,
      killsThroughSmoke: existingPlayer
        ? existingPlayer.killsThroughSmoke + data.kills_through_smoke
        : data.kills_through_smoke,
      killsInJump: existingPlayer
        ? existingPlayer.killsInJump + data.kills_in_jump
        : data.kills_in_jump,
      killsThroughWall: existingPlayer
        ? existingPlayer.killsThroughWall + data.kills_through_wall
        : data.kills_through_wall,
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
      entryFrags: existingPlayer
        ? existingPlayer.entryFrags + data.entry_frags
        : data.entry_frags,
      entryDeaths: existingPlayer
        ? existingPlayer.entryDeaths + data.entry_deaths
        : data.entry_deaths,
      aces: existingPlayer ? existingPlayer.aces + data.aces : data.aces,
      mvps: existingPlayer ? existingPlayer.mvps + data.mvp : data.mvp,
      clutches1v1Played: existingPlayer
        ? existingPlayer.clutches1v1Played + data.clutches_1v1_played
        : data.clutches_1v1_played,
      clutches1v1Won: existingPlayer
        ? existingPlayer.clutches1v1Won + data.clutches_1v1_won
        : data.clutches_1v1_won,
      clutches1v2Played: existingPlayer
        ? existingPlayer.clutches1v2Played + data.clutches_1v2_played
        : data.clutches_1v2_played,
      clutches1v2Won: existingPlayer
        ? existingPlayer.clutches1v2Won + data.clutches_1v2_won
        : data.clutches_1v2_won,
      clutches1v3Played: existingPlayer
        ? existingPlayer.clutches1v3Played + data.clutches_1v3_played
        : data.clutches_1v3_played,
      clutches1v3Won: existingPlayer
        ? existingPlayer.clutches1v3Won + data.clutches_1v3_won
        : data.clutches_1v3_won,
      clutches1v4Played: existingPlayer
        ? existingPlayer.clutches1v4Played + data.clutches_1v4_played
        : data.clutches_1v4_played,
      clutches1v4Won: existingPlayer
        ? existingPlayer.clutches1v4Won + data.clutches_1v4_won
        : data.clutches_1v4_won,
      clutches1v5Played: existingPlayer
        ? existingPlayer.clutches1v5Played + data.clutches_1v5_played
        : data.clutches_1v5_played,
      clutches1v5Won: existingPlayer
        ? existingPlayer.clutches1v5Won + data.clutches_1v5_won
        : data.clutches_1v5_won,

      // New grenade-related fields
      flashesThrown: existingPlayer
        ? existingPlayer.flashesThrown + data.grenades_thrown.flashbangs
        : data.grenades_thrown.flashbangs,
      smokesThrown: existingPlayer
        ? existingPlayer.smokesThrown + data.grenades_thrown.smokes
        : data.grenades_thrown.smokes,
      heGrenadesThrown: existingPlayer
        ? existingPlayer.heGrenadesThrown + data.grenades_thrown.he_grenades
        : data.grenades_thrown.he_grenades,
      molotovsThrown: existingPlayer
        ? existingPlayer.molotovsThrown + data.grenades_thrown.molotovs
        : data.grenades_thrown.molotovs,
      decoysThrown: existingPlayer
        ? existingPlayer.decoysThrown + data.grenades_thrown.decoys
        : data.grenades_thrown.decoys,
      enemiesFlashed: existingPlayer
        ? existingPlayer.enemiesFlashed + data.enemies_flashed
        : data.enemies_flashed,
      grenadeDamage: existingPlayer
        ? existingPlayer.grenadeDamage + data.grenade_damage
        : data.grenade_damage,
      bombPlants: existingPlayer
        ? existingPlayer.bombPlants + data.bomb_plants
        : data.bomb_plants,
      bombDefuses: existingPlayer
        ? existingPlayer.bombDefuses + data.bomb_defuses
        : data.bomb_defuses,

      lastFiveMatchesOutcome: `${lastFiveMatchesOutcome.slice(-4)}${
        data.match_outcome === "Win"
          ? "W"
          : data.match_outcome === "Loss"
          ? "L"
          : "D"
      }`,
    } as const;

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

      // New grenade-related per-game calculations
      flashesThrownPerGame:
        collectableStats.flashesThrown /
        collectableStats.gamesPlayedSinceSeason3Start,
      smokesThrownPerGame:
        collectableStats.smokesThrown /
        collectableStats.gamesPlayedSinceSeason3Start,
      heGrenadesThrownPerGame:
        collectableStats.heGrenadesThrown /
        collectableStats.gamesPlayedSinceSeason3Start,
      molotovsThrownPerGame:
        collectableStats.molotovsThrown /
        collectableStats.gamesPlayedSinceSeason3Start,
      decoysThrownPerGame:
        collectableStats.decoysThrown /
        collectableStats.gamesPlayedSinceSeason3Start,
      enemiesFlashedPerGame:
        collectableStats.enemiesFlashed /
        collectableStats.gamesPlayedSinceSeason3Start,
      grenadeDamagePerGame:
        collectableStats.grenadeDamage /
        collectableStats.gamesPlayedSinceSeason3Start,
      bombPlantsPerGame:
        collectableStats.bombPlants /
        collectableStats.gamesPlayedSinceSeason3Start,
      bombDefusesPerGame:
        collectableStats.bombDefuses /
        collectableStats.gamesPlayedSinceSeason3Start,

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
      acesPerGame: collectableStats.aces / collectableStats.gamesPlayed,
      entryKillRating:
        collectableStats.entryFrags / Math.max(1, collectableStats.entryDeaths),

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

    const impactFactor = countImpactFactor(countableStats);

    await prisma.playerStats.upsert({
      where: { id: Number(steamId) },
      create: {
        id: Number(steamId),
        ...collectableStats,
        ...resultDeterminedStats,
        ...countableStats,
        impactFactor,
      },
      update: {
        ...collectableStats,
        ...resultDeterminedStats,
        ...countableStats,
        impactFactor,
      },
    });

    // 2. Handle weapon stats separately
    const weaponStats = Object.entries(data.weapons).map(
      ([weaponName, weaponStats]) => {
        const existingWeapon = (existingPlayer?.weapons || []).find(
          (weaponStat) => weaponStat.name === weaponName
        );

        if (existingWeapon) {
          // Update existing weapon stats
          return prisma.weaponStats.update({
            where: { id: existingWeapon.id },
            data: {
              kills: existingWeapon.kills + weaponStats.kills,
              killsPerGame:
                (existingWeapon.kills + weaponStats.kills) /
                collectableStats.gamesPlayedSinceSeason3Start,
              deathsWith: existingWeapon.deathsWith + weaponStats.deaths_with,
              deathsWithPerGame:
                (existingWeapon.deathsWith + weaponStats.deaths_with) /
                collectableStats.gamesPlayedSinceSeason3Start,
              kd: countKd(
                existingWeapon.kills + weaponStats.kills,
                existingWeapon.deathsWith + weaponStats.deaths_with
              ),
              deaths: existingWeapon.deaths + weaponStats.deaths_from,
              deathsPerGame:
                (existingWeapon.deaths + weaponStats.deaths_from) /
                collectableStats.gamesPlayedSinceSeason3Start,
            },
          });
        } else {
          // Create new weapon if it doesn't exist
          return prisma.weaponStats.create({
            data: {
              playerTable: data.players_table,
              name: weaponName,
              kills: weaponStats.kills,
              killsPerGame:
                weaponStats.kills /
                collectableStats.gamesPlayedSinceSeason3Start,
              deathsWith: weaponStats.deaths_with,
              deathsWithPerGame:
                weaponStats.deaths_with /
                collectableStats.gamesPlayedSinceSeason3Start,
              kd: countKd(weaponStats.kills, weaponStats.deaths_with),
              deaths: weaponStats.deaths_from,
              deathsPerGame:
                weaponStats.deaths_from /
                collectableStats.gamesPlayedSinceSeason3Start,
              playerId: Number(steamId),
            },
          });
        }
      }
    );
    await Promise.all(weaponStats);

    // 3. Handle map stats separately
    const existingMapForPlayer = (existingPlayer?.maps || []).find(
      (mapStat) => mapStat.name === data.map_played
    );

    if (existingMapForPlayer) {
      const mapCollectableStats = {
        gamesPlayed: existingMapForPlayer.gamesPlayed + 1,
        gamesWon:
          data.match_outcome === "Win"
            ? existingMapForPlayer.gamesWon + 1
            : existingMapForPlayer.gamesWon,
        gamesLost:
          data.match_outcome === "Loss"
            ? existingMapForPlayer.gamesLost + 1
            : existingMapForPlayer.gamesLost,
        gamesDrawn:
          data.match_outcome === "Draw"
            ? existingMapForPlayer.gamesDrawn + 1
            : existingMapForPlayer.gamesDrawn,
        totalGamesLength:
          existingMapForPlayer.totalGamesLength + data.map_duration_seconds,
        roundsWon: existingMapForPlayer.roundsWon + data.rounds_won,
        totalRounds: existingMapForPlayer.totalRounds + data.total_rounds,
      };

      const mapCountableStats = {
        winRatePercentage:
          (mapCollectableStats.gamesWon / mapCollectableStats.gamesPlayed) *
          100,
        roundsWonPerGame:
          mapCollectableStats.roundsWon / mapCollectableStats.gamesPlayed,
        roundsPerGame:
          mapCollectableStats.totalRounds / mapCollectableStats.gamesPlayed,
        roundsWinPercentage:
          (mapCollectableStats.roundsWon / mapCollectableStats.totalRounds) *
          100,
        averageGameLength:
          mapCollectableStats.totalGamesLength /
          mapCollectableStats.gamesPlayed,
      };

      await prisma.mapStats.update({
        where: { id: existingMapForPlayer.id },
        data: {
          ...mapCollectableStats,
          ...mapCountableStats,
        },
      });
    } else {
      await prisma.mapStats.create({
        data: {
          playerTable: data.players_table,
          name: data.map_played,
          gamesPlayed: 1,
          gamesWon: data.match_outcome === "Win" ? 1 : 0,
          gamesLost: data.match_outcome === "Loss" ? 1 : 0,
          gamesDrawn: data.match_outcome === "Draw" ? 1 : 0,
          totalGamesLength: data.map_duration_seconds,
          roundsWon: data.rounds_won,
          totalRounds: data.total_rounds,
          winRatePercentage: data.match_outcome === "Win" ? 100 : 0,
          roundsWonPerGame: data.rounds_won,
          roundsPerGame: data.total_rounds,
          roundsWinPercentage: (data.rounds_won / data.total_rounds) * 100,
          averageGameLength: data.map_duration_seconds,
          playerId: Number(steamId),
        },
      });
    }
  }

  console.log(`Loaded stats from map: ${mapPlayed}.`);

  // Send revalidation request to ensure fresh data is fetched
  await revalidateAllData();
};

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
