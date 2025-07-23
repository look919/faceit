import { WeaponsGrid } from "@/components/grids/weapons/WeaponsGrid";
import { WeaponsTableRecord } from "@/components/grids/weapons/columns";
import { apiGET } from "@/lib/api";

export default async function AllTimeWeaponsPage() {
  const allTimeWeaponsPlayers = await apiGET<WeaponsTableRecord[]>(
    "/players/all-time/weapons"
  );

  return (
    <div className="flex flex-col gap-y-4">
      <span className="text-gray-500 italic text-sm text-center mt-2">
        *Weapon stats were reset at the start of the season 3 due to code
        refactor
      </span>
      <WeaponsGrid data={allTimeWeaponsPlayers} />
    </div>
  );
}
