import { MainGrid } from "@/components/grids/main/MainGrid";
import { ALL_TIME_MATCHES_PLAYED_SEPARATOR } from "@/utils/player";
import { apiGET } from "@/lib/api";
import { PlayerStats } from "@prisma/client";

export default async function AllTimePage() {
  const allTimePlayers = await apiGET<PlayerStats[]>("/players/all-time/main");

  return (
    <div>
      <MainGrid
        primaryData={allTimePlayers}
        separator={ALL_TIME_MATCHES_PLAYED_SEPARATOR}
      />
    </div>
  );
}
