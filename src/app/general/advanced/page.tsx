import { MainGrid } from "@/components/grids/main/MainGrid";
import { prisma } from "@/lib/prisma";
import { defaultOrderBy } from "@/utils/order";

const getGeneralAdvancedPlayers = async () => {
  const generalAdvancedPlayers = await prisma.sessionPlayerStats.findMany({
    orderBy: defaultOrderBy,
  });

  return generalAdvancedPlayers;
};

export default async function GeneralAdvancedPage() {
  const generalAdvancedPlayers = await getGeneralAdvancedPlayers();

  return (
    <div>
      <MainGrid data={generalAdvancedPlayers} />
    </div>
  );
}
