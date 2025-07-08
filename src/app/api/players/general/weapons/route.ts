import { weaponsOrderBy } from "@/utils/order";
import { prisma } from "@/lib/prisma";
import { SEASON_MATCHES_PLAYED_SEPARATOR } from "@/utils/player";
import { WeaponName } from "@/utils/weapons";
import { PlayerTable, WeaponStats } from "@prisma/client";
import { NextResponse } from "next/server";
import superjson from "superjson";

export async function GET() {
  try {
    const generalWeaponsPlayers = await prisma.playerStats.findMany({
      where: {
        playerTable: PlayerTable.SEASON,
        gamesPlayed: {
          gte: SEASON_MATCHES_PLAYED_SEPARATOR,
        },
      },
      include: {
        weapons: true,
      },
      orderBy: weaponsOrderBy,
    });

    const transformedData = generalWeaponsPlayers.map((player) => {
      const weapons = player.weapons;

      const weaponsObject = weapons.reduce((acc, weapon) => {
        acc[weapon.name as WeaponName] = {
          id: weapon.id,
          name: weapon.name,
          kills: weapon.kills,
          killsPerGame: weapon.killsPerGame,
          deaths: weapon.deaths,
          deathsPerGame: weapon.deathsPerGame,
          playerTable: PlayerTable.SEASON,
          playerId: weapon.playerId,
        };
        return acc;
      }, {} as Record<WeaponName, WeaponStats>);

      return {
        id: player.id,
        name: player.name,
        avatar: player.avatar,
        gamesPlayed: player.gamesPlayed,
        ...weaponsObject,
      };
    });

    const serialized = superjson.stringify(transformedData);
    return new NextResponse(serialized, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching general weapons players:", error);
    return NextResponse.json(
      { error: "Failed to fetch general weapons players" },
      { status: 500 }
    );
  }
}
