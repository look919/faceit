import { advancedOrderBy } from "@/utils/order";
import { prisma } from "@/lib/prisma";
import { SEASON_MATCHES_PLAYED_SEPARATOR } from "@/utils/player";
import { PlayerTable } from "@prisma/client";
import { NextResponse } from "next/server";
import superjson from "superjson";

export async function GET() {
  try {
    const generalAdvancedPlayers = await prisma.playerStats.findMany({
      orderBy: advancedOrderBy,
      include: { weapons: true },
      where: {
        playerTable: PlayerTable.SEASON,
        gamesPlayed: {
          gte: SEASON_MATCHES_PLAYED_SEPARATOR,
        },
      },
    });

    const weaponStats = generalAdvancedPlayers.map((player) => {
      const knife = player.weapons.find((weapon) => weapon.name === "knife");
      const zeus = player.weapons.find((weapon) => weapon.name === "zeus");

      return {
        id: player.id,
        knife,
        zeus,
      };
    });

    const transformedData = generalAdvancedPlayers.map((player, index) => {
      return {
        id: player.id,
        name: player.name,
        avatar: player.avatar,
        gamesPlayed: player.gamesPlayed,

        mvps: player.mvps,
        aces: player.aces,
        entryFrags: player.entryFrags,
        entryDeaths: player.entryDeaths,
        killsTroughSmoke: player.killsThroughSmoke,
        killsOnFlash: player.killsOnFlash,
        killsTroughWall: player.killsThroughWall,
        killsInJump: player.killsInJump,

        acesPerGame: player.acesPerGame,
        mvpsPerGame: player.mvpsPerGame,
        entryFragsPerGame: player.entryFragsPerGame,
        entryKillRating: player.entryKillRating,
        impactFactor: player.impactFactor,
        killsInJumpPerGame: player.killsInJumpPerGame,
        killsTroughWallPerGame: player.killsThroughSmokePerGame,
        killsOnFlashPerGame: player.killsOnFlashPerGame,
        killsTroughSmokePerGame: player.killsThroughSmokePerGame,

        clutches1v1Played: player.clutches1v1Played,
        clutches1v1Won: player.clutches1v1Won,
        clutches1v2Played: player.clutches1v2Played,
        clutches1v2Won: player.clutches1v1Won,
        clutches1v3Played: player.clutches1v3Played,
        clutches1v3Won: player.clutches1v3Won,
        clutches1v4Played: player.clutches1v4Played,
        clutches1v4Won: player.clutches1v4Won,
        clutches1v5Played: player.clutches1v5Played,
        clutches1v5Won: player.clutches1v5Won,
        clutches1v1WinPercentage: player.clutches1v1WinPercentage,
        clutches1v2WinPercentage: player.clutches1v2WinPercentage,
        clutches1v3WinPercentage: player.clutches1v3WinPercentage,
        clutches1v4WinPercentage: player.clutches1v4WinPercentage,
        clutches1v5WinPercentage: player.clutches1v5WinPercentage,

        knifeKills: weaponStats[index]!.knife?.kills,
        knifeDeaths: weaponStats[index].knife?.deaths,
        zeusKills: weaponStats[index].zeus?.kills,
        zeusDeaths: weaponStats[index].zeus?.deaths,
      };
    });

    const serialized = superjson.stringify(transformedData);
    return new NextResponse(serialized, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching general advanced players:", error);
    return NextResponse.json(
      { error: "Failed to fetch general advanced players" },
      { status: 500 }
    );
  }
}
