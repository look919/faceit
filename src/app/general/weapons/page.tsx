import { weaponsOrderBy } from "@/utils/order";
import { prisma } from "@/lib/prisma";
import { WeaponsGrid } from "@/components/grids/weapons/WeaponsGrid";
import { WeaponName } from "@/utils/weapons";
import { WeaponStats } from "@prisma/client";
import { NUMBER_OF_MATCHES_SEPARATOR } from "@/utils/dummy-record";

const getGeneralWeaponsPlayers = async () => {
  const generalWeaponsPlayers = await prisma.playerStats.findMany({
    where: {
      isSessionPlayer: false,
      gamesPlayed: {
        gte: NUMBER_OF_MATCHES_SEPARATOR,
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
        isSessionWeapon: false,
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
