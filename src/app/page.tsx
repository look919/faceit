import { PrismaClient, Prisma } from "@prisma/client";
import { RandomizeTeams } from "./RandomizeTeams";
import { Logo } from "./Logo";
import { DataCategory } from "./DataTable/DataCategory";
import { DataTable } from "./DataTable/DataTable";
import { columns } from "./DataTable/columns";

const orderBy: Prisma.PlayerStatsOrderByWithRelationInput[] = [
  {
    winRatePercentage: "desc", // Order by winRatePercentage (descending)
  },
  {
    gamesPlayed: "desc", // Order by gamesPlayed (descending)
  },
  {
    kda: "desc", // Order by KDA (descending)
  },
];

const getGeneralTabPlayers = async () => {
  const prisma = new PrismaClient();

  const playersWithFiveOrMoreGames = await prisma.playerStats.findMany({
    where: {
      gamesPlayed: {
        gte: 5,
      },
    },
    orderBy,
  });

  const playersWithLessThanFiveGames = await prisma.playerStats.findMany({
    where: {
      gamesPlayed: {
        lt: 5,
      },
    },
    orderBy,
  });

  return [...playersWithFiveOrMoreGames, ...playersWithLessThanFiveGames];
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
        {sessionPlayers.length === 0 ? (
          <DataTable data={players} columns={columns} />
        ) : (
          <DataCategory
            sessionPlayers={sessionPlayers}
            generalPlayers={players}
          />
        )}

        <RandomizeTeams />
      </main>
      <footer className="row-start-3 text-center text-sm text-gray-500">
        Wirkus.pro 2025
      </footer>
    </div>
  );
}
