import { MapsGrid } from "@/components/grids/maps/MapsGrid";
import { MapsTableRecord } from "@/components/grids/maps/columns";
import { apiGET } from "@/lib/api";

export default async function GeneralMapsPage() {
  const generalMapsPlayers = await apiGET<MapsTableRecord[]>(
    "/players/general/maps"
  );

  return (
    <div>
      <MapsGrid data={generalMapsPlayers} />
    </div>
  );
}
