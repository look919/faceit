import { MainGrid } from "@/components/grids/main/MainGrid";
import { prisma } from "@/lib/prisma";
import {
  NUMBER_OF_MATCHES_SEPARATOR,
  SEPARATOR_PLAYER,
} from "@/utils/dummy-record";
import { mainOrderBy } from "@/utils/order";

const getGeneralPlayers = async () => {
  const playersWithMoreGamesThanSeparator = await prisma.playerStats.findMany({
    where: {
      isSessionPlayer: false,
      gamesPlayed: {
        gte: NUMBER_OF_MATCHES_SEPARATOR,
      },
    },
    orderBy: mainOrderBy,
  });

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

  return [
    ...playersWithMoreGamesThanSeparator,
    SEPARATOR_PLAYER,
    ...playersWithLessGamesThanSeparator,
  ];
};

export default async function GeneralPage() {
  const generalPlayers = await getGeneralPlayers();

  return (
    <div>
      <MainGrid data={generalPlayers} />
    </div>
  );
}
