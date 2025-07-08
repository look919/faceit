import { mainOrderBy } from "@/utils/order";
import { prisma } from "@/lib/prisma";
import { ALL_TIME_MATCHES_PLAYED_SEPARATOR } from "@/utils/player";
import { PlayerTable } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const players = await prisma.playerStats.findMany({
      where: {
        playerTable: PlayerTable.ALL_TIME,
        gamesPlayed: {
          gte: ALL_TIME_MATCHES_PLAYED_SEPARATOR,
        },
      },
      orderBy: mainOrderBy,
    });

    return NextResponse.json(players);
  } catch (error) {
    console.error("Error fetching all-time players:", error);
    return NextResponse.json(
      { error: "Failed to fetch all-time players" },
      { status: 500 }
    );
  }
}
