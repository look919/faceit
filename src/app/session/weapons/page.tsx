import { MainGrid } from "@/components/grids/main/MainGrid";
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
      <MainGrid data={sessionWeaponsPlayers} />
    </div>
  );
}
