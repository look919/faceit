import { AdvancedGrid } from "@/components/grids/advanced/AdvancedGrid";
import { AdvancedGridRecord } from "@/components/grids/advanced/columns";
import { apiGET } from "@/lib/api";

export default async function GeneralAdvancedPage() {
  const generalAdvancedPlayers = await apiGET<AdvancedGridRecord[]>(
    "/players/general/advanced"
  );

  return (
    <div>
      <AdvancedGrid data={generalAdvancedPlayers} />
    </div>
  );
}
