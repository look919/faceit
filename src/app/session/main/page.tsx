import { MainGrid } from "@/components/grids/main/MainGrid";
import { mainOrderBy } from "@/utils/order";
import { prisma } from "@/lib/prisma";

const getSessionPlayers = async () => {
  const sessionPlayers = await prisma.playerStats.findMany({
    where: {
      isSessionPlayer: true,
    },
    orderBy: mainOrderBy,
  });

  return sessionPlayers;
};

export default async function SessionPage() {
  const sessionPlayers = await getSessionPlayers();

  return (
    <div>
      <MainGrid primaryData={sessionPlayers} isSessionPage />
    </div>
  );
}
