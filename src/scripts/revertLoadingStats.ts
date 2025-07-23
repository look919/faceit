import {
  countWinPercentage,
  countKd,
  countKda,
  divideResult,
} from "./../utils/math";
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { StatsFromJson } from "../utils/player";
import { revalidateAllData } from "../utils/revalidate";

const prisma = new PrismaClient();

const main = async () => {
  const rawData = readFileSync("./src/scripts/stats.json", "utf8");
  const stats = JSON.parse(rawData) as StatsFromJson[];

  for (const [steamId, data] of Object.entries(stats)) {
    const existingPlayer = await prisma.playerStats.findUnique({
      where: { id: Number(steamId) },
      include: { weapons: true, maps: true },
    });

    if (!existingPlayer) {
      console.log(`Player with ID ${steamId} not found in database. Skipping.`);
      continue;
    }

    if (existingPlayer.gamesPlayed <= 1) {
      // Delete all associated weapon stats first
      if (existingPlayer.weapons && existingPlayer.weapons.length > 0) {
        console.log(
          `Deleting ${existingPlayer.weapons.length} weapon stats for player ${existingPlayer.name}`
        );
        await prisma.weaponStats.deleteMany({
          where: { playerId: Number(steamId) },
        });
      }

      // Delete all associated map stats
      if (existingPlayer.maps && existingPlayer.maps.length > 0) {
        console.log(
          `Deleting ${existingPlayer.maps.length} map stats for player ${existingPlayer.name}`
        );
        await prisma.mapStats.deleteMany({
          where: { playerId: Number(steamId) },
        });
      }

      // Now delete the player
      console.log(
        `Removing player ${existingPlayer.name} as this was their only game.`
      );
      await prisma.playerStats.delete({
        where: { id: Number(steamId) },
      });
      continue;
    }

    const lastFiveMatchesOutcome = existingPlayer.lastFiveMatchesOutcome;

    // Subtract collectable stats
    const collectableStats = {
      gamesPlayed: existingPlayer.gamesPlayed - 1,
      gamesPlayedSinceSeason3Start:
        existingPlayer.gamesPlayedSinceSeason3Start - 1,
      name: data.name,
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

      // New grenade-related fields
      flashesThrown:
        existingPlayer.flashesThrown - data.grenades_thrown.flashbangs,
      smokesThrown: existingPlayer.smokesThrown - data.grenades_thrown.smokes,
      heGrenadesThrown:
        existingPlayer.heGrenadesThrown - data.grenades_thrown.he_grenades,
      molotovsThrown:
        existingPlayer.molotovsThrown - data.grenades_thrown.molotovs,
      decoysThrown: existingPlayer.decoysThrown - data.grenades_thrown.decoys,
      enemiesFlashed: existingPlayer.enemiesFlashed - data.enemies_flashed,
      grenadeDamage: existingPlayer.grenadeDamage - data.grenade_damage,
      bombPlants: existingPlayer.bombPlants - data.bomb_plants,
      bombDefuses: existingPlayer.bombDefuses - data.bomb_defuses,

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

    // Recalculate countable stats
    const countableStats = {
      kda: countKda(
        collectableStats.kills,
        collectableStats.deaths,
        collectableStats.assists
      ),
      kd: countKd(collectableStats.kills, collectableStats.deaths),
      winRatePercentage:
        divideResult(
          resultDeterminedStats.gamesWon,
          collectableStats.gamesPlayed
        ) * 100,
      killsPerGame: divideResult(
        collectableStats.kills,
        collectableStats.gamesPlayed
      ),
      deathsPerGame: divideResult(
        collectableStats.deaths,
        collectableStats.gamesPlayed
      ),
      assistsPerGame: divideResult(
        collectableStats.assists,
        collectableStats.gamesPlayed
      ),
      damagePerRound: divideResult(
        collectableStats.damage,
        collectableStats.totalRounds
      ),
      damagePerGame: divideResult(
        collectableStats.damage,
        collectableStats.gamesPlayed
      ),
      killsThroughSmokePerGame: divideResult(
        collectableStats.killsThroughSmoke,
        collectableStats.gamesPlayed
      ),
      killsOnFlashPerGame: divideResult(
        collectableStats.killsOnFlash,
        collectableStats.gamesPlayed
      ),
      killsInJumpPerGame: divideResult(
        collectableStats.killsInJump,
        collectableStats.gamesPlayed
      ),
      killsThroughWallPerGame: divideResult(
        collectableStats.killsThroughWall,
        collectableStats.gamesPlayed
      ),

      // New grenade-related per-game calculations
      flashesThrownPerGame: divideResult(
        collectableStats.flashesThrown,
        collectableStats.gamesPlayedSinceSeason3Start
      ),
      smokesThrownPerGame: divideResult(
        collectableStats.smokesThrown,
        collectableStats.gamesPlayedSinceSeason3Start
      ),
      heGrenadesThrownPerGame: divideResult(
        collectableStats.heGrenadesThrown,
        collectableStats.gamesPlayedSinceSeason3Start
      ),
      molotovsThrownPerGame: divideResult(
        collectableStats.molotovsThrown,
        collectableStats.gamesPlayedSinceSeason3Start
      ),
      decoysThrownPerGame: divideResult(
        collectableStats.decoysThrown,
        collectableStats.gamesPlayedSinceSeason3Start
      ),
      enemiesFlashedPerGame: divideResult(
        collectableStats.enemiesFlashed,
        collectableStats.gamesPlayedSinceSeason3Start
      ),
      grenadeDamagePerGame: divideResult(
        collectableStats.grenadeDamage,
        collectableStats.gamesPlayedSinceSeason3Start
      ),
      bombPlantsPerGame: divideResult(
        collectableStats.bombPlants,
        collectableStats.gamesPlayedSinceSeason3Start
      ),
      bombDefusesPerGame: divideResult(
        collectableStats.bombDefuses,
        collectableStats.gamesPlayedSinceSeason3Start
      ),

      headshotPercentage:
        divideResult(collectableStats.headshots, collectableStats.kills) * 100,
      headshotsPerGame: divideResult(
        collectableStats.headshots,
        collectableStats.gamesPlayed
      ),
      roundsWonPerGame: divideResult(
        collectableStats.roundsWon,
        collectableStats.gamesPlayed
      ),
      totalRoundsPerGame: divideResult(
        collectableStats.totalRounds,
        collectableStats.gamesPlayed
      ),
      roundsWinPercentage:
        divideResult(collectableStats.roundsWon, collectableStats.totalRounds) *
        100,
      mvpsPerGame: divideResult(
        collectableStats.mvps,
        collectableStats.gamesPlayed
      ),
      entryFragsPerGame: divideResult(
        collectableStats.entryFrags,
        collectableStats.gamesPlayed
      ),
      entryKillRating:
        collectableStats.entryDeaths > 0
          ? divideResult(
              collectableStats.entryFrags,
              collectableStats.entryDeaths
            )
          : 0,
      acesPerGame: divideResult(
        collectableStats.aces,
        collectableStats.gamesPlayed
      ),
      clutches1v1WinPercentage: countWinPercentage(
        collectableStats.clutches1v1Won,
        collectableStats.clutches1v1Played
      ),
      clutches1v2WinPercentage: countWinPercentage(
        collectableStats.clutches1v2Won,
        collectableStats.clutches1v2Played
      ),
      clutches1v3WinPercentage: countWinPercentage(
        collectableStats.clutches1v3Won,
        collectableStats.clutches1v3Played
      ),
      clutches1v4WinPercentage: countWinPercentage(
        collectableStats.clutches1v4Won,
        collectableStats.clutches1v4Played
      ),
      clutches1v5WinPercentage: countWinPercentage(
        collectableStats.clutches1v5Won,
        collectableStats.clutches1v5Played
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
            deaths: existingWeapon.deaths - weaponStats.deaths_from,
            deathsWith: existingWeapon.deathsWith - weaponStats.deaths_with,
            kd: countKd(
              existingWeapon.kills - weaponStats.kills,
              existingWeapon.deathsWith - weaponStats.deaths_with
            ),
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

  console.log("Stats reverted in the database.");

  // Send revalidation request to ensure fresh data is fetched
  await revalidateAllData();
};

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
