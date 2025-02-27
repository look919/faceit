import { MainGrid } from "@/components/grids/main/MainGrid";
import { prisma } from "@/lib/prisma";
import { defaultOrderBy } from "@/utils/order";

const getGeneralMapsPlayers = async () => {
  const generalMapsPlayers = await prisma.sessionPlayerStats.findMany({
    orderBy: defaultOrderBy,
  });

  return generalMapsPlayers;
};

export default async function GeneralMapsPage() {
  const generalMapsPlayers = await getGeneralMapsPlayers();

  return (
    <div>
      <MainGrid data={generalMapsPlayers} />
    </div>
  );
}
