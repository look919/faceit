import { StatsTableContainer } from "@/components/grids/main/StatsTableContainer";
import { PrismaClient, Prisma } from "@prisma/client";

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
      <StatsTableContainer data={sessionPlayers} />
    </div>
  );
}
