import {
  countImpactFactor,
  countKd,
  countKda,
  countWinPercentage,
  divideResult,
} from "../utils/math";
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { playerAvatarsMap, StatsFromJson } from "../utils/player";
import { revalidateAllData } from "./../utils/revalidate";

const prisma = new PrismaClient();

const main = async () => {
  const rawData = readFileSync("./src/scripts/stats.json", "utf8");
  const stats = JSON.parse(rawData) as Record<string, StatsFromJson>;
  let mapPlayed = "";

  // Target player configuration
  const TARGET_STEAM_ID = "76561198137842758";
  const TARGET_NICKNAME = "Tomi";

  // Find Tomi's data to determine his team characteristics
  let tomiData: StatsFromJson | null = null;

  // First pass: find Tomi in the stats
  for (const [steamId, data] of Object.entries(stats)) {
    if (steamId === TARGET_STEAM_ID) {
      tomiData = data;
      break;
    }
  }

  if (!tomiData) {
    console.log(
      `Target player ${TARGET_NICKNAME} (SteamID: ${TARGET_STEAM_ID}) not found in stats.json`
    );
    return;
  }

  // Identify teammates based on Tomi's match data
  const teammateIds = new Set<string>();
  if (tomiData) {
    // Add Tomi himself
    teammateIds.add(TARGET_STEAM_ID);

    // Find teammates: players with same map, same match outcome, and similar rounds won
    for (const [steamId, data] of Object.entries(stats)) {
      if (steamId === TARGET_STEAM_ID) continue; // Skip Tomi himself

      // Teammates should have:
      // 1. Same map
      // 2. Same match outcome (Win/Loss/Draw)
      // 3. Same total rounds played
      if (
        data.map_played === tomiData.map_played &&
        data.match_outcome === tomiData.match_outcome &&
        data.total_rounds === tomiData.total_rounds
      ) {
        teammateIds.add(steamId);
        console.log(`Identified teammate: ${data.name} (SteamID: ${steamId})`);
      }
    }
  }

  let processedPlayers = 0;
  let skippedPlayers = 0;

  for (const [steamId, data] of Object.entries(stats)) {
    // Filter: only process Tomi and his teammates
    if (tomiData && !teammateIds.has(steamId)) {
      console.log(`Skipping enemy player: ${data.name} (SteamID: ${steamId})`);
      skippedPlayers++;
      continue;
    }

    console.log(`Processing player: ${data.name} (SteamID: ${steamId})`);
    processedPlayers++;

    const existingPlayer = await prisma.playerStats.findUnique({
      where: { id: Number(steamId) },
      include: { weapons: true, maps: true },
    });
    mapPlayed = data.map_played;
    const lastFiveMatchesOutcome = existingPlayer?.lastFiveMatchesOutcome || "";

    const collectableStats = {
      gamesPlayed: existingPlayer ? existingPlayer.gamesPlayed + 1 : 1,
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
      winRatePercentage: countWinPercentage(
        resultDeterminedStats.gamesWon,
        collectableStats.gamesPlayed
      ),
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
        collectableStats.gamesPlayed
      ),
      smokesThrownPerGame: divideResult(
        collectableStats.smokesThrown,
        collectableStats.gamesPlayed
      ),
      heGrenadesThrownPerGame: divideResult(
        collectableStats.heGrenadesThrown,
        collectableStats.gamesPlayed
      ),
      molotovsThrownPerGame: divideResult(
        collectableStats.molotovsThrown,
        collectableStats.gamesPlayed
      ),
      decoysThrownPerGame: divideResult(
        collectableStats.decoysThrown,
        collectableStats.gamesPlayed
      ),
      enemiesFlashedPerGame: divideResult(
        collectableStats.enemiesFlashed,
        collectableStats.gamesPlayed
      ),
      grenadeDamagePerGame: divideResult(
        collectableStats.grenadeDamage,
        collectableStats.gamesPlayed
      ),
      bombPlantsPerGame: divideResult(
        collectableStats.bombPlants,
        collectableStats.gamesPlayed
      ),
      bombDefusesPerGame: divideResult(
        collectableStats.bombDefuses,
        collectableStats.gamesPlayed
      ),

      headshotPercentage: countWinPercentage(
        collectableStats.headshots,
        collectableStats.kills
      ),
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
      roundsWinPercentage: countWinPercentage(
        collectableStats.roundsWon,
        collectableStats.totalRounds
      ),
      mvpsPerGame: divideResult(
        collectableStats.mvps,
        collectableStats.gamesPlayed
      ),
      entryFragsPerGame: divideResult(
        collectableStats.entryFrags,
        collectableStats.gamesPlayed
      ),
      acesPerGame: divideResult(
        collectableStats.aces,
        collectableStats.gamesPlayed
      ),
      entryKillRating: divideResult(
        collectableStats.entryFrags,
        collectableStats.entryDeaths
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
              killsPerGame: divideResult(
                existingWeapon.kills + weaponStats.kills,
                collectableStats.gamesPlayed
              ),
              deathsWith: existingWeapon.deathsWith + weaponStats.deaths_with,
              deathsWithPerGame: divideResult(
                existingWeapon.deathsWith + weaponStats.deaths_with,
                collectableStats.gamesPlayed
              ),
              kd: countKd(
                existingWeapon.kills + weaponStats.kills,
                existingWeapon.deathsWith + weaponStats.deaths_with
              ),
              deaths: existingWeapon.deaths + weaponStats.deaths_from,
              deathsPerGame: divideResult(
                existingWeapon.deaths + weaponStats.deaths_from,
                collectableStats.gamesPlayed
              ),
            },
          });
        } else {
          // Create new weapon if it doesn't exist
          return prisma.weaponStats.create({
            data: {
              playerTable: data.players_table,
              name: weaponName,
              kills: weaponStats.kills,
              killsPerGame: divideResult(
                weaponStats.kills,
                collectableStats.gamesPlayed
              ),
              deathsWith: weaponStats.deaths_with,
              deathsWithPerGame: divideResult(
                weaponStats.deaths_with,
                collectableStats.gamesPlayed
              ),
              kd: countKd(weaponStats.kills, weaponStats.deaths_with),
              deaths: weaponStats.deaths_from,
              deathsPerGame: divideResult(
                weaponStats.deaths_from,
                collectableStats.gamesPlayed
              ),
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
        winRatePercentage: countWinPercentage(
          mapCollectableStats.gamesWon,
          mapCollectableStats.gamesPlayed
        ),
        roundsWonPerGame: divideResult(
          mapCollectableStats.roundsWon,
          mapCollectableStats.gamesPlayed
        ),
        roundsPerGame: divideResult(
          mapCollectableStats.totalRounds,
          mapCollectableStats.gamesPlayed
        ),
        roundsWinPercentage: countWinPercentage(
          mapCollectableStats.roundsWon,
          mapCollectableStats.totalRounds
        ),
        averageGameLength: divideResult(
          mapCollectableStats.totalGamesLength,
          mapCollectableStats.gamesPlayed
        ),
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

  console.log(`\n=== SUMMARY ===`);
  console.log(`Processed players: ${processedPlayers}`);
  console.log(`Skipped enemy players: ${skippedPlayers}`);
  console.log(`Loaded stats from map: ${mapPlayed}.`);

  // Send revalidation request to ensure fresh data is fetched
  await revalidateAllData();
};

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
