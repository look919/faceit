import { MainGrid } from "@/components/grids/main/MainGrid";
import { prisma } from "@/lib/prisma";
import { ALL_TIME_MATCHES_PLAYED_SEPARATOR } from "@/utils/player";
import { mainOrderBy } from "@/utils/order";
import { PlayerTable } from "@prisma/client";

const getAllTimePlayers = async () => {
  const players = await prisma.playerStats.findMany({
    where: {
      playerTable: PlayerTable.ALL_TIME,
      gamesPlayed: {
        gte: ALL_TIME_MATCHES_PLAYED_SEPARATOR,
      },
    },
    orderBy: mainOrderBy,
  });

  return players;
};

export default async function AllTimePage() {
  const allTimePlayers = await getAllTimePlayers();

  console.log("allTimePlayers", allTimePlayers);

  return (
    <div>
      <MainGrid
        primaryData={allTimePlayers}
        separator={ALL_TIME_MATCHES_PLAYED_SEPARATOR}
      />
    </div>
  );
}
