import { MainGrid } from "@/components/grids/main/MainGrid";
import { SEASON_MATCHES_PLAYED_SEPARATOR } from "@/utils/player";
import { apiGET } from "@/lib/api";
import { GeneralMainResponse } from "@/app/api/players/general/main/route";

export default async function GeneralPage() {
  const { playersWithMoreGamesThanSeparator, me } =
    await apiGET<GeneralMainResponse>(`/players/general/main`);

  console.log(me);

  return (
    <div>
      <MainGrid
        primaryData={me}
        secondaryData={
          SEASON_MATCHES_PLAYED_SEPARATOR > 0
            ? playersWithMoreGamesThanSeparator
            : undefined
        }
        separator={SEASON_MATCHES_PLAYED_SEPARATOR}
      />
    </div>
  );
}
