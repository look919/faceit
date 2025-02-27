import { MainGrid } from "@/components/grids/main/MainGrid";
import { defaultOrderBy } from "@/utils/order";
import { prisma } from "@/lib/prisma";

const getSessionPlayers = async () => {
  const sessionPlayers = await prisma.playerStats.findMany({
    where: {
      isSessionPlayer: true,
    },
    orderBy: defaultOrderBy,
  });

  return sessionPlayers;
};

export default async function SessionPage() {
  const sessionPlayers = await getSessionPlayers();

  return (
    <div>
      <MainGrid data={sessionPlayers} isSessionPage />
    </div>
  );
}
