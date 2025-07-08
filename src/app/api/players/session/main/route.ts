import { prisma } from "@/lib/prisma";
import { mainOrderBy } from "@/utils/order";
import { PlayerTable } from "@prisma/client";
import { NextResponse } from "next/server";
import superjson from "superjson";

export async function GET() {
  try {
    const sessionPlayers = await prisma.playerStats.findMany({
      where: {
        playerTable: PlayerTable.SESSION,
      },
      orderBy: mainOrderBy,
    });

    const serialized = superjson.stringify(sessionPlayers);
    return new NextResponse(serialized, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching session players:", error);
    return NextResponse.json(
      { error: "Failed to fetch session players" },
      { status: 500 }
    );
  }
}
