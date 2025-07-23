import { MainGrid } from "@/components/grids/main/MainGrid";
import { SEASON_MATCHES_PLAYED_SEPARATOR } from "@/utils/player";
import { apiGET } from "@/lib/api";
import { GeneralMainResponse } from "@/app/api/players/general/main/route";

export default async function GeneralPage() {
  const {
    playersWithMoreGamesThanSeparator,
    playersWithLessGamesThanSeparator,
  } = await apiGET<GeneralMainResponse>(`/players/general/main`);

  return (
    <div>
      <MainGrid
        primaryData={playersWithMoreGamesThanSeparator}
        secondaryData={
          SEASON_MATCHES_PLAYED_SEPARATOR > 0
            ? playersWithLessGamesThanSeparator
            : undefined
        }
        separator={SEASON_MATCHES_PLAYED_SEPARATOR}
      />
    </div>
  );
}
