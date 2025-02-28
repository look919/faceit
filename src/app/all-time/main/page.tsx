import { MainGrid } from "@/components/grids/main/MainGrid";
import { prisma } from "@/lib/prisma";
import { NUMBER_OF_MATCHES_SEPARATOR } from "@/utils/dummy-record";
import { mainOrderBy } from "@/utils/order";

const getAllTimePlayers = async () => {
  const playersWithMoreGamesThanSeparator = await prisma.playerStats.findMany({
    where: {
      isSessionPlayer: false,
      gamesPlayed: {
        gte: NUMBER_OF_MATCHES_SEPARATOR,
      },
    },
    orderBy: mainOrderBy,
  });

  return playersWithMoreGamesThanSeparator;
};

export default async function AllTimePage() {
  const allTimePlayers = await getAllTimePlayers();

  return (
    <div>
      <MainGrid data={allTimePlayers} />
    </div>
  );
}
