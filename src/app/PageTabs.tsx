"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SessionPlayerStats } from "@prisma/client";
import React from "react";

import { StatsTableContainer } from "./DataTable/StatsTableContainer";
import { RandomizeTeams } from "./RandomizeTeams";
import { WeaponsTableContainer } from "./DataTable/WeaponsTableContainer";
import { PlayerStatsWithWeapons } from "./DataTable/mapWeaponsData";

type PageTabsProps = {
  generalPlayers: PlayerStatsWithWeapons[];
  sessionPlayers: SessionPlayerStats[];
};

type Tab = "session" | "general" | "randomize_teams";

export const PageTabs = ({ generalPlayers, sessionPlayers }: PageTabsProps) => {
  const [category, setCategory] = React.useState<Tab>("general");
  const isThereAnySessionData = sessionPlayers.length > 0;

  return (
    <Tabs
      value={category}
      onValueChange={(newValue) => setCategory(newValue as Tab)}
    >
      <TabsList className="my-2">
        <TabsTrigger value="general">General</TabsTrigger>
        {isThereAnySessionData ? (
          <TabsTrigger value="session">Session</TabsTrigger>
        ) : null}
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
