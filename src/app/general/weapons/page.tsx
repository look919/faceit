import { weaponsOrderBy } from "@/utils/order";
import { prisma } from "@/lib/prisma";
import { WeaponsGrid } from "@/components/grids/weapons/WeaponsGrid";
import { WeaponName } from "@/utils/weapons";
import { PlayerTable, WeaponStats } from "@prisma/client";
import { SEASON_MATCHES_PLAYED_SEPARATOR } from "@/utils/player";

const getGeneralWeaponsPlayers = async () => {
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

  return generalWeaponsPlayers.map((player) => {
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
};

export default async function GeneralWeaponsPage() {
  const generalWeaponsPlayers = await getGeneralWeaponsPlayers();

  return (
    <div>
      <WeaponsGrid data={generalWeaponsPlayers} />
    </div>
  );
}
