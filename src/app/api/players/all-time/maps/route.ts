import { mapsOrderBy } from "@/utils/order";
import { prisma } from "@/lib/prisma";
import { ALL_TIME_MATCHES_PLAYED_SEPARATOR } from "@/utils/player";
import { MapName } from "@/utils/weapons";
import { MapStats, PlayerTable } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allTimeMapsPlayers = await prisma.playerStats.findMany({
      where: {
        playerTable: PlayerTable.ALL_TIME,
        gamesPlayed: {
          gte: ALL_TIME_MATCHES_PLAYED_SEPARATOR,
        },
      },
      include: {
        maps: true,
      },
      orderBy: mapsOrderBy,
    });

    const transformedData = allTimeMapsPlayers.map((player) => {
      const maps = player.maps;

      const mapsObject = maps.reduce((acc, map) => {
        acc[map.name as MapName] = {
          id: map.id,
          name: map.name,
          gamesPlayed: map.gamesPlayed,
          gamesWon: map.gamesWon,
          gamesLost: map.gamesLost,
          gamesDrawn: map.gamesDrawn,
          winRatePercentage: map.winRatePercentage,
          totalGamesLength: map.totalGamesLength,
          averageGameLength: map.averageGameLength / 60,
          totalRounds: map.totalRounds,
          roundsWon: map.roundsWon,
          roundsPerGame: map.roundsPerGame,
          roundsWonPerGame: map.roundsWonPerGame,
          roundsWinPercentage: map.roundsWinPercentage,
          playerTable: PlayerTable.ALL_TIME,
          playerId: map.playerId,
        };
        return acc;
      }, {} as Record<MapName, MapStats>);

      return {
        id: player.id,
        name: player.name,
        avatar: player.avatar,
        color: player.color,
        ...mapsObject,
        maps,
      };
    });

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("Error fetching all-time maps players:", error);
    return NextResponse.json(
      { error: "Failed to fetch all-time maps players" },
      { status: 500 }
    );
  }
}
