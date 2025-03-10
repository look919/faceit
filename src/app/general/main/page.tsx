import { MainGrid } from "@/components/grids/main/MainGrid";
import { prisma } from "@/lib/prisma";
import { SEASON_MATCHES_PLAYED_SEPARATOR } from "@/utils/player";
import { mainOrderBy } from "@/utils/order";
import { PlayerTable } from "@prisma/client";

const getGeneralPlayersWithMoreGamesThanSeparator = async () => {
  const playersWithMoreGamesThanSeparator = await prisma.playerStats.findMany({
    where: {
      playerTable: PlayerTable.SEASON,
      gamesPlayed: {
        gte: SEASON_MATCHES_PLAYED_SEPARATOR,
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
        lt: SEASON_MATCHES_PLAYED_SEPARATOR,
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
        separator={SEASON_MATCHES_PLAYED_SEPARATOR}
      />
    </div>
  );
}
