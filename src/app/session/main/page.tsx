import { StatsTableContainer } from "@/components/grids/main/StatsTableContainer";
import { defaultOrderBy } from "@/utils/order";
import { prisma } from "@/lib/prisma";

const getSessionPlayers = async () => {
  const sessionPlayers = await prisma.sessionPlayerStats.findMany({
    orderBy: defaultOrderBy,
  });

  return sessionPlayers;
};

export default async function SessionPage() {
  const sessionPlayers = await getSessionPlayers();

  return (
    <div>
      <StatsTableContainer data={sessionPlayers} />
    </div>
  );
}
