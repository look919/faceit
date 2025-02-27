import { MainGrid } from "@/components/grids/main/MainGrid";
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
      <MainGrid data={generalWeaponsPlayers} />
    </div>
  );
}
