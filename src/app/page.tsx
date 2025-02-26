import { PrismaClient, Prisma } from "@prisma/client";
import { Logo } from "@/components/Logo";
import { PageTabs } from "./PageTabs";
import { NUMBER_OF_MATCHES_SEPARATOR, SEPARATOR_PLAYER } from "../utils";

const orderBy: Prisma.PlayerStatsOrderByWithRelationInput[] = [
  {
    winRatePercentage: "desc",
  },
  {
    gamesPlayed: "desc",
  },
  {
    kda: "desc",
  },
];

const getGeneralTabPlayers = async () => {
  const prisma = new PrismaClient();

  const playersWithMoreGamesThanSeparator = await prisma.playerStats.findMany({
    where: {
      gamesPlayed: {
        gte: NUMBER_OF_MATCHES_SEPARATOR,
      },
    },
    include: {
      weapons: true,
    },
    orderBy,
  });

  const playersWithLessGamesThanSeparator = await prisma.playerStats.findMany({
    where: {
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

const getSessionPlayers = async () => {
  const prisma = new PrismaClient();

  const sessionPlayers = await prisma.sessionPlayerStats.findMany({
    orderBy,
  });

  return sessionPlayers;
};

export default async function Home() {
  const players = await getGeneralTabPlayers();
  const sessionPlayers = await getSessionPlayers();

  return <PageTabs sessionPlayers={sessionPlayers} generalPlayers={players} />;
}
