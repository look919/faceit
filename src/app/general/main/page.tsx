import { StatsTableContainer } from "@/components/grids/main/StatsTableContainer";
import { prisma } from "@/lib/prisma";
import { defaultOrderBy } from "@/utils/order";

const getGeneralPlayers = async () => {
  const generalPlayers = await prisma.sessionPlayerStats.findMany({
    orderBy: defaultOrderBy,
  });

  return generalPlayers;
};

export default async function GeneralPage() {
  const generalPlayers = await getGeneralPlayers();

  return (
    <div>
      <StatsTableContainer data={generalPlayers} />
    </div>
  );
}
