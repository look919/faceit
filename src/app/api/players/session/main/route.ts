import { mainOrderBy } from "@/utils/order";
import { prisma } from "@/lib/prisma";
import { PlayerTable } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sessionPlayers = await prisma.playerStats.findMany({
      where: {
        playerTable: PlayerTable.SESSION,
      },
      orderBy: mainOrderBy,
    });

    return NextResponse.json(sessionPlayers);
  } catch (error) {
    console.error("Error fetching session players:", error);
    return NextResponse.json(
      { error: "Failed to fetch session players" },
      { status: 500 }
    );
  }
}
