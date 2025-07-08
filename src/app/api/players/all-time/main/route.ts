import { mainOrderBy } from "@/utils/order";
import { prisma } from "@/lib/prisma";
import { ALL_TIME_MATCHES_PLAYED_SEPARATOR } from "@/utils/player";
import { PlayerTable } from "@prisma/client";
import { NextResponse } from "next/server";
import superjson from "superjson";

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

    const serialized = superjson.stringify(players);
    return new NextResponse(serialized, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching all-time players:", error);
    return NextResponse.json(
      { error: "Failed to fetch all-time players" },
      { status: 500 }
    );
  }
}
