import { PrismaClient, Prisma } from "@prisma/client";
import { StatsTableContainer } from "@/components/grids/main/StatsTableContainer";
import { PageTab, PageTabs } from "@/components/layout/PageTabs";

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

  const sessionPageTabs: PageTab[] = [
    {
      label: "Main",
      content: <StatsTableContainer data={sessionPlayers} />,
    },
    {
      label: "Weapons",
      content: null,
    },
    {
      label: "Maps",
      content: null,
    },
    {
      label: "Advanced",
      content: <StatsTableContainer data={sessionPlayers} />,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold">Stats</h2>
      <PageTabs defaultTab={sessionPageTabs[0].label} tabs={sessionPageTabs} />
    </div>
  );
}
