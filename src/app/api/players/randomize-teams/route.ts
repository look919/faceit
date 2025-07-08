import { prisma } from "@/lib/prisma";
import { MapStats, PlayerTable } from "@prisma/client";
import { randomizePageOrderBy } from "@/utils/order";
import { NextResponse } from "next/server";
import superjson from "superjson";

export interface RandomizeTeamsPlayer {
  id: bigint;
  name: string;
  avatar: string;
  color: string;
  maps: MapStats[];
}

export async function GET() {
  try {
    const players = await prisma.playerStats.findMany({
      where: {
        playerTable: PlayerTable.ALL_TIME,
      },
      include: {
        maps: true,
      },
      orderBy: randomizePageOrderBy,
    });

    const transformedData = players.map((player) => {
      return {
        id: player.id,
        name: player.name,
        avatar: player.avatar,
        color: player.color,
        maps: player.maps,
      };
    });

    const serialized = superjson.stringify(
      transformedData as RandomizeTeamsPlayer[]
    );
    return new NextResponse(serialized, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching players for randomize teams:", error);
    return NextResponse.json(
      { error: "Failed to fetch players for randomize teams" },
      { status: 500 }
    );
  }
}
