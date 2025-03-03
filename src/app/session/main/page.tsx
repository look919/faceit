import { MainGrid } from "@/components/grids/main/MainGrid";
import { mainOrderBy } from "@/utils/order";
import { prisma } from "@/lib/prisma";
import { PlayerTable } from "@prisma/client";

const getSessionPlayers = async () => {
  const sessionPlayers = await prisma.playerStats.findMany({
    where: {
      playerTable: PlayerTable.SESSION,
    },
    orderBy: mainOrderBy,
  });

  return sessionPlayers;
};

export default async function SessionPage() {
  const sessionPlayers = await getSessionPlayers();

  return (
    <div>
      <MainGrid primaryData={sessionPlayers} />
    </div>
  );
}
