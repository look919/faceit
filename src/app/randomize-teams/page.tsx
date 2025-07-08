import { apiGET } from "@/lib/api";
import { RandomizePlayer, RandomizeTeams } from "./RandomizeTeams";

export default async function RandomizeTeamsPage() {
  const players = await apiGET<RandomizePlayer[]>("/players/randomize-teams");

  return <RandomizeTeams players={players} />;
}
