import { prisma } from "@/lib/prisma";
import { RandomizeTeams } from "./RandomizeTeams";
import { PlayerTable } from "@prisma/client";
import { randomizePageOrderBy } from "@/utils/order";

const getAllPlayers = async () => {
  const players = await prisma.playerStats.findMany({
    where: {
      playerTable: PlayerTable.ALL_TIME,
    },
    include: {
      maps: true,
    },
    orderBy: randomizePageOrderBy,
  });

  return players.map((player) => {
    return {
      id: player.id,
      name: player.name,
      avatar: player.avatar,
      color: player.color,
      maps: player.maps,
    };
  });
};

export default async function RandomizeTeamsPage() {
  const players = await getAllPlayers();

  return <RandomizeTeams players={players} />;
}
