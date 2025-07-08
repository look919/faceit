import { weaponsOrderBy } from "@/utils/order";
import { prisma } from "@/lib/prisma";
import { ALL_TIME_MATCHES_PLAYED_SEPARATOR } from "@/utils/player";
import { WeaponName } from "@/utils/weapons";
import { PlayerTable } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allTimeWeaponsPlayers = await prisma.playerStats.findMany({
      where: {
        playerTable: PlayerTable.ALL_TIME,
        gamesPlayed: {
          gte: ALL_TIME_MATCHES_PLAYED_SEPARATOR,
        },
      },
      include: {
        weapons: true,
      },
      orderBy: weaponsOrderBy,
    });

    const transformedData = allTimeWeaponsPlayers.map((player) => {
      const weapons = player.weapons;

      const weaponsObject = weapons.reduce((acc, weapon) => {
        acc[weapon.name as WeaponName] = {
          id: weapon.id,
          name: weapon.name,
          kills: weapon.kills,
          killsPerGame: weapon.killsPerGame,
          deaths: weapon.deaths,
          deathsPerGame: weapon.deathsPerGame,
          playerTable: PlayerTable.ALL_TIME,
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
    console.error("Error fetching all-time weapons players:", error);
    return NextResponse.json(
      { error: "Failed to fetch all-time weapons players" },
      { status: 500 }
    );
  }
}
