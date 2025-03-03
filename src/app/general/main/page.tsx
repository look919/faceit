import { MainGrid } from "@/components/grids/main/MainGrid";
import { prisma } from "@/lib/prisma";
import { MATCHES_PLAYED_SEPARATOR } from "@/utils/player";
import { mainOrderBy } from "@/utils/order";
import { PlayerTable } from "@prisma/client";

const getGeneralPlayersWithMoreGamesThanSeparator = async () => {
  const playersWithMoreGamesThanSeparator = await prisma.playerStats.findMany({
    where: {
      playerTable: PlayerTable.SEASON,
      gamesPlayed: {
        gte: MATCHES_PLAYED_SEPARATOR,
      },
    },
    orderBy: mainOrderBy,
  });

  return playersWithMoreGamesThanSeparator;
};

const getGeneralPlayersWithLessGamesThanSeparator = async () => {
  const playersWithLessGamesThanSeparator = await prisma.playerStats.findMany({
    where: {
      playerTable: PlayerTable.SEASON,
      gamesPlayed: {
        lt: MATCHES_PLAYED_SEPARATOR,
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
        separator={MATCHES_PLAYED_SEPARATOR}
      />
    </div>
  );
}
