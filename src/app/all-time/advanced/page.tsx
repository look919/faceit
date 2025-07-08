import { AdvancedGrid } from "@/components/grids/advanced/AdvancedGrid";
import { AdvancedGridRecord } from "@/components/grids/advanced/columns";
import { apiGET } from "@/lib/api";

export default async function AllTimeAdvancedPage() {
  const allTimeAdvancedPlayers = await apiGET<AdvancedGridRecord[]>(
    "/players/all-time/advanced"
  );

  return (
    <div>
      <AdvancedGrid data={allTimeAdvancedPlayers} />
    </div>
  );
}
