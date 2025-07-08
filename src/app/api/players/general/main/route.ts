import { mainOrderBy } from "@/utils/order";
import { prisma } from "@/lib/prisma";
import { SEASON_MATCHES_PLAYED_SEPARATOR } from "@/utils/player";
import { PlayerStats, PlayerTable } from "@prisma/client";
import { NextResponse } from "next/server";
import superjson from "superjson";

export interface GeneralMainResponse {
  playersWithMoreGamesThanSeparator: PlayerStats[];
  playersWithLessGamesThanSeparator: PlayerStats[];
}

export async function GET() {
  try {
    const playersWithMoreGamesThanSeparator = await prisma.playerStats.findMany(
      {
        where: {
          playerTable: PlayerTable.SEASON,
          gamesPlayed: {
            gte: SEASON_MATCHES_PLAYED_SEPARATOR,
          },
        },
        orderBy: mainOrderBy,
      }
    );

    const playersWithLessGamesThanSeparator = await prisma.playerStats.findMany(
      {
        where: {
          playerTable: PlayerTable.SEASON,
          gamesPlayed: {
            lt: SEASON_MATCHES_PLAYED_SEPARATOR,
          },
        },
        orderBy: [
          {
            gamesPlayed: "desc",
          },
          {
            winRatePercentage: "desc",
          },
          {
            kda: "desc",
          },
        ],
      }
    );

    const data = {
      playersWithMoreGamesThanSeparator,
      playersWithLessGamesThanSeparator,
    } as GeneralMainResponse;

    const serialized = superjson.stringify(data);
    return new NextResponse(serialized, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching general players:", error);
    return NextResponse.json(
      { error: "Failed to fetch general players" },
      { status: 500 }
    );
  }
}
