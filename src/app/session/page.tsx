import { PrismaClient, Prisma } from "@prisma/client";
import { StatsTableContainer } from "@/components/grids/main/StatsTableContainer";

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

const getSessionPlayers = async () => {
  const prisma = new PrismaClient();

  const sessionPlayers = await prisma.sessionPlayerStats.findMany({
    orderBy,
  });

  return sessionPlayers;
};

export default async function SessionPage() {
  const sessionPlayers = await getSessionPlayers();

  return (
    <div>
      <h2 className="text-2xl font-bold">Stats</h2>
      <StatsTableContainer data={sessionPlayers} />
    </div>
  );
}
