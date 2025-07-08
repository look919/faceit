import { AdvancedGrid } from "@/components/grids/advanced/AdvancedGrid";
import { AdvancedGridRecord } from "@/components/grids/advanced/columns";
import { apiGET } from "@/lib/api";

export default async function SessionAdvancedPage() {
  const sessionAdvancedPlayers = await apiGET<AdvancedGridRecord[]>(
    "/players/session/advanced"
  );

  return (
    <div>
      <AdvancedGrid data={sessionAdvancedPlayers} />
    </div>
  );
}
