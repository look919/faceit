import { WeaponsGrid } from "@/components/grids/weapons/WeaponsGrid";
import { WeaponsTableRecord } from "@/components/grids/weapons/columns";
import { apiGET } from "@/lib/api";

export default async function SessionWeaponsPage() {
  const sessionWeaponsPlayers = await apiGET<WeaponsTableRecord[]>(
    "/players/session/weapons"
  );

  return (
    <div>
      <WeaponsGrid data={sessionWeaponsPlayers} />
    </div>
  );
}
