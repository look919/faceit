import { weaponsOrderBy } from "@/utils/order";
import { prisma } from "@/lib/prisma";
import { WeaponName } from "@/utils/weapons";
import { PlayerTable } from "@prisma/client";
import { NextResponse } from "next/server";

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
          deaths: weapon.deaths,
          deathsPerGame: weapon.deathsPerGame,
          playerTable: PlayerTable.SESSION,
          playerId: weapon.playerId,
        };
        return acc;
      }, {} as Record<WeaponName, unknown>);

      return {
        id: player.id,
        name: player.name,
        avatar: player.avatar,
        gamesPlayed: player.gamesPlayed,
        ...weaponsObject,
      };
    });

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("Error fetching session weapons players:", error);
    return NextResponse.json(
      { error: "Failed to fetch session weapons players" },
      { status: 500 }
    );
  }
}
