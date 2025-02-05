import { columns } from "./DataTable/columns";
import { DataTable } from "./DataTable/DataTable";
import { PrismaClient, Prisma } from "@prisma/client";
import { RandomizeTeams } from "./RandomizeTeams";

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
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen gap-16 pb-4 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full flex mb-3 text-center p-2 justify-center">
          <span className="text-sky-500 text-4xl rotate-6 inline-flex">
            Tomeczki
          </span>
          <div className="text-2xl mx-2 mt-3">i</div>
          <span className="text-red-500 text-4xl text-center -rotate-6 inline-flex">
            Dupeczki
          </span>
        </div>
        <DataTable columns={columns} data={players} />
        <RandomizeTeams />
      </main>
      <footer className="row-start-3 text-center text-sm text-gray-500">
        Wirkus.pro 2025
      </footer>
    </div>
  );
}
