import { weaponsOrderBy } from "@/utils/order";
import { prisma } from "@/lib/prisma";
import { WeaponsGrid } from "@/components/grids/weapons/WeaponsGrid";
import { WeaponName } from "@/utils/weapons";
import { PlayerTable, WeaponStats } from "@prisma/client";
import { ALL_TIME_MATCHES_PLAYED_SEPARATOR } from "@/utils/player";

const getAllTimeWeaponsPlayers = async () => {
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

  return allTimeWeaponsPlayers.map((player) => {
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
    }, {} as Record<WeaponName, WeaponStats>);

    return {
      id: player.id,
      name: player.name,
      avatar: player.avatar,
      gamesPlayed: player.gamesPlayed,
      ...weaponsObject,
    };
  });
};

export default async function AllTimeWeaponsPage() {
  const allTimeWeaponsPlayers = await getAllTimeWeaponsPlayers();

  return (
    <div>
      <WeaponsGrid data={allTimeWeaponsPlayers} />
    </div>
  );
}
