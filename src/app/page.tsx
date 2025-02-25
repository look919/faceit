import { PrismaClient, Prisma } from "@prisma/client";
import { Logo } from "./Logo";
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

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen gap-16 pb-4 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Logo />

        <PageTabs sessionPlayers={sessionPlayers} generalPlayers={players} />
      </main>
      <footer className="row-start-3 text-center text-sm text-gray-500">
        Wirkus.pro 2025
      </footer>
    </div>
  );
}
