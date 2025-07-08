import { WeaponsGrid } from "@/components/grids/weapons/WeaponsGrid";
import { WeaponsTableRecord } from "@/components/grids/weapons/columns";
import { apiGET } from "@/lib/api";

export default async function AllTimeWeaponsPage() {
  const allTimeWeaponsPlayers = await apiGET<WeaponsTableRecord[]>(
    "/players/all-time/weapons"
  );

  return (
    <div>
      <WeaponsGrid data={allTimeWeaponsPlayers} />
    </div>
  );
}
