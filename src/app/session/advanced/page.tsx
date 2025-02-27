import { MainGrid } from "@/components/grids/main/MainGrid";
import { prisma } from "@/lib/prisma";
import { defaultOrderBy } from "@/utils/order";

const getSessionAdvancedPlayers = async () => {
  const sessionAdvancedPlayers = await prisma.sessionPlayerStats.findMany({
    orderBy: defaultOrderBy,
  });

  return sessionAdvancedPlayers;
};

export default async function SessionAdvancedPage() {
  const sessionAdvancedPlayers = await getSessionAdvancedPlayers();

  return (
    <div>
      <MainGrid data={sessionAdvancedPlayers} />
    </div>
  );
}
