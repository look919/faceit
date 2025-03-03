import { MainGrid } from "@/components/grids/main/MainGrid";
import { prisma } from "@/lib/prisma";
import { NUMBER_OF_MATCHES_SEPARATOR } from "@/utils/dummy-record";
import { mainOrderBy } from "@/utils/order";

const getGeneralPlayersWithMoreGamesThanSeparator = async () => {
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

const getGeneralPlayersWithLessGamesThanSeparator = async () => {
  const playersWithLessGamesThanSeparator = await prisma.playerStats.findMany({
    where: {
      isSessionPlayer: false,
      gamesPlayed: {
        lt: NUMBER_OF_MATCHES_SEPARATOR,
      },
    },

    orderBy: [
      {
        gamesPlayed: "desc",
      },
      {
        winRatePercentage: "desc",
      },
      {
        kda: "desc",
      },
    ],
  });

  return playersWithLessGamesThanSeparator;
};

export default async function GeneralPage() {
  const playersWithMoreGamesThanSeparator =
    await getGeneralPlayersWithMoreGamesThanSeparator();
  const playersWithLessGamesThanSeparator =
    await getGeneralPlayersWithLessGamesThanSeparator();

  return (
    <div>
      <MainGrid
        primaryData={playersWithMoreGamesThanSeparator}
        secondaryData={playersWithLessGamesThanSeparator}
      />
    </div>
  );
}
