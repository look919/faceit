"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SessionPlayerStats } from "@prisma/client";
import React from "react";

import { StatsTableContainer } from "./StatsTableContainer";
import { RandomizeTeams } from "../RandomizeTeams";
import { WeaponsTableContainer } from "./WeaponsTableContainer";
import { PlayerStatsWithWeapons } from "./mapWeaponsData";

type StatsCategoryProps = {
  generalPlayers: PlayerStatsWithWeapons[];
  sessionPlayers: SessionPlayerStats[];
};

type Tab = "session" | "general" | "randomize_teams";

export const StatsCategory = ({
  generalPlayers,
  sessionPlayers,
}: StatsCategoryProps) => {
  const [category, setCategory] = React.useState<Tab>("session");

  return (
    <Tabs
      value={category}
      onValueChange={(newValue) => setCategory(newValue as Tab)}
    >
      <TabsList className="my-2">
        <TabsTrigger value="session">Session</TabsTrigger>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="randomize_teams">Randomize teams</TabsTrigger>
      </TabsList>
      {category === "randomize_teams" ? (
        <RandomizeTeams />
      ) : (
        <div className="mt-12">
          <h2 className="text-2xl font-bold">Stats</h2>
          <StatsTableContainer
            data={category === "session" ? sessionPlayers : generalPlayers}
          />
        </div>
      )}

      {category === "general" && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold">Weapons</h2>
          <WeaponsTableContainer data={generalPlayers} />
        </div>
      )}
    </Tabs>
  );
};
