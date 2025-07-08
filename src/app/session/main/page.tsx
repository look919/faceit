import { MainGrid } from "@/components/grids/main/MainGrid";
import { apiGET } from "@/lib/api";
import { PlayerStats } from "@prisma/client";

export default async function SessionPage() {
  const sessionPlayers = await apiGET<PlayerStats[]>("/players/session/main");

  return (
    <div>
      <MainGrid primaryData={sessionPlayers} />
    </div>
  );
}
