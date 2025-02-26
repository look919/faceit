import { StatsTableContainer } from "@/components/grids/main/StatsTableContainer";
import { defaultOrderBy } from "@/utils/order";
import { prisma } from "@/lib/prisma";

const getSessionWeaponsPlayers = async () => {
  const sessionWeaponsPlayers = await prisma.playerStats.findMany({
    orderBy: defaultOrderBy,
  });

  return sessionWeaponsPlayers;
};

export default async function SessionWeaponsPage() {
  const sessionWeaponsPlayers = await getSessionWeaponsPlayers();

  return (
    <div>
      <StatsTableContainer data={sessionWeaponsPlayers} />
    </div>
  );
}
