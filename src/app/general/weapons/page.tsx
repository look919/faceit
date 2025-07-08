import { WeaponsGrid } from "@/components/grids/weapons/WeaponsGrid";
import { WeaponsTableRecord } from "@/components/grids/weapons/columns";
import { apiGET } from "@/lib/api";

export default async function GeneralWeaponsPage() {
  const generalWeaponsPlayers = await apiGET<WeaponsTableRecord[]>(
    "/players/general/weapons"
  );

  return (
    <div>
      <WeaponsGrid data={generalWeaponsPlayers} />
    </div>
  );
}
