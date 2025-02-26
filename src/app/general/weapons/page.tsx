import { StatsTableContainer } from "@/components/grids/main/StatsTableContainer";
import { defaultOrderBy } from "@/utils/order";
import { prisma } from "@/lib/prisma";

const getGeneralWeaponsPlayers = async () => {
  const generalWeaponsPlayers = await prisma.sessionPlayerStats.findMany({
    orderBy: defaultOrderBy,
  });

  return generalWeaponsPlayers;
};

export default async function GeneralWeaponsPage() {
  const generalWeaponsPlayers = await getGeneralWeaponsPlayers();

  return (
    <div>
      <StatsTableContainer data={generalWeaponsPlayers} />
    </div>
  );
}
