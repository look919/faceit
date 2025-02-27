import { StatsTableContainer } from "@/components/grids/main/StatsTableContainer";
import { prisma } from "@/lib/prisma";
import { NUMBER_OF_MATCHES_SEPARATOR, SEPARATOR_PLAYER } from "@/utils";
import { defaultOrderBy } from "@/utils/order";

const getGeneralPlayers = async () => {
  const playersWithMoreGamesThanSeparator = await prisma.playerStats.findMany({
    where: {
      isSessionPlayer: false,
      gamesPlayed: {
        gte: NUMBER_OF_MATCHES_SEPARATOR,
      },
    },
    orderBy: defaultOrderBy,
  });

  const playersWithLessGamesThanSeparator = await prisma.playerStats.findMany({
    where: {
      isSessionPlayer: false,
      gamesPlayed: {
        lt: NUMBER_OF_MATCHES_SEPARATOR,
      },
    },
    include: {
      weapons: true,
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
      <StatsTableContainer data={generalPlayers} />
    </div>
  );
}
