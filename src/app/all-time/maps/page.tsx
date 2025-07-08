import { MapsGrid } from "@/components/grids/maps/MapsGrid";
import { MapsTableRecord } from "@/components/grids/maps/columns";
import { apiGET } from "@/lib/api";

export default async function AllTimeMapsPage() {
  const allTimeMapsPlayers = await apiGET<MapsTableRecord[]>(
    "/players/all-time/maps"
  );

  return (
    <div>
      <MapsGrid data={allTimeMapsPlayers} />
    </div>
  );
}
