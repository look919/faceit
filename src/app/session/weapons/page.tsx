import { weaponsOrderBy } from "@/utils/order";
import { prisma } from "@/lib/prisma";
import { WeaponName } from "@/utils/weapons";
import { PlayerTable, WeaponStats } from "@prisma/client";
import { WeaponsGrid } from "@/components/grids/weapons/WeaponsGrid";

const getSessionWeaponsPlayers = async () => {
  const sessionWeaponsPlayers = await prisma.playerStats.findMany({
    where: {
      playerTable: PlayerTable.SESSION,
    },
    include: {
      weapons: true,
    },
    orderBy: weaponsOrderBy,
  });

  return sessionWeaponsPlayers.map((player) => {
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

export default async function SessionWeaponsPage() {
  const sessionWeaponsPlayers = await getSessionWeaponsPlayers();

  return (
    <div>
      <WeaponsGrid data={sessionWeaponsPlayers} />
    </div>
  );
}
