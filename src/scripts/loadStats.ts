import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { StatsFromJson } from "../utils/player";
import { revalidateAllData } from "../utils/revalidate";
import { countClutchesWinPercentage, countKd, countKda } from "./utils";

const prisma = new PrismaClient();

const playerAvatarsMap = {
  Arturek: "artur.jpg",
  "♣†Blady▲Miś†♣": "blady_mis.jpg",
  Cashotto: "cashotto.jpg",
  "Cpt. Chicken": "chicken.gif",
  "fy_pool_day enjoyer": "czarek.jpg",
  DeiDaRa: "deidara.jpg",
  EMUNIA: "emunia.jpg",
  "777jajsko": "jajsko.jpg",
  "☢K0di☢": "kodi.jpg",
  Blazeoon: "spectral.jpg",
  Tomi: "tomi.jpg",
  VEGETAble: "vegetable.jpg",
  vinicjusz: "vinicjusz.jpg",
  Hitari: "hitari.jpg",
} as const;

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

    const impactFactor =
      countableStats.entryKillRating +
      1.25 * countableStats.mvpsPerGame +
      5 * countableStats.acesPerGame +
      (countableStats.clutches1v1WinPercentage +
        countableStats.clutches1v2WinPercentage +
        countableStats.clutches1v3WinPercentage +
        countableStats.clutches1v4WinPercentage +
        countableStats.clutches1v5WinPercentage) /
        100;

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
                collectableStats.gamesPlayed,
              deaths: existingWeapon.deaths + weaponStats.deaths,
              deathsPerGame:
                (existingWeapon.deaths + weaponStats.deaths) /
                collectableStats.gamesPlayed,
            },
          });
        } else {
          // Create new weapon if it doesn't exist
          return prisma.weaponStats.create({
            data: {
              playerTable: data.players_table,
              name: weaponName,
              kills: weaponStats.kills,
              killsPerGame: weaponStats.kills / collectableStats.gamesPlayed,
              deaths: weaponStats.deaths,
              deathsPerGame: weaponStats.deaths / collectableStats.gamesPlayed,
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
