import { columns } from "./DataTable/columns";
import { DataTable } from "./DataTable/DataTable";
import { PrismaClient, Prisma } from "@prisma/client";

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

const getAllPlayers = async () => {
  const prisma = new PrismaClient();

  const playersWithThreeOrMoreGames = await prisma.playerStats.findMany({
    where: {
      gamesPlayed: {
        gte: 3,
      },
    },
    orderBy,
  });

  const playersWithLessThan3Games = await prisma.playerStats.findMany({
    where: {
      gamesPlayed: {
        lt: 3,
      },
    },
    orderBy,
  });

  return [...playersWithThreeOrMoreGames, ...playersWithLessThan3Games];
};

export default async function Home() {
  const players = await getAllPlayers();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <DataTable columns={columns} data={players} />
      </main>
      <footer className="row-start-3 text-center text-sm text-gray-500">
        Tomuś 2025
      </footer>
    </div>
  );
}
