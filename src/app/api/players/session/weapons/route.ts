import { weaponsOrderBy } from "@/utils/order";
import { prisma } from "@/lib/prisma";
import { WeaponName } from "@/utils/weapons";
import { PlayerTable, WeaponStats } from "@prisma/client";
import { NextResponse } from "next/server";
import superjson from "superjson";

export async function GET() {
  try {
    const sessionWeaponsPlayers = await prisma.playerStats.findMany({
      where: {
        playerTable: PlayerTable.SESSION,
      },
      include: {
        weapons: true,
      },
      orderBy: weaponsOrderBy,
    });

    const transformedData = sessionWeaponsPlayers.map((player) => {
      const weapons = player.weapons;

      const weaponsObject = weapons.reduce((acc, weapon) => {
        acc[weapon.name as WeaponName] = {
          id: weapon.id,
          name: weapon.name,
          kills: weapon.kills,
          killsPerGame: weapon.killsPerGame,
          deathsWith: weapon.deathsWith,
          deathsWithPerGame: weapon.deathsWithPerGame,
          kd: weapon.kd,
          deaths: weapon.deaths,
          deathsPerGame: weapon.deathsPerGame,
          playerTable: PlayerTable.SESSION,
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
    console.error("Error fetching session weapons players:", error);
    return NextResponse.json(
      { error: "Failed to fetch session weapons players" },
      { status: 500 }
    );
  }
}
