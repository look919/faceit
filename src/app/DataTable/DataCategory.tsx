"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayerStats, SessionPlayerStats } from "@prisma/client";
import React from "react";

import { DataTableContainer } from "./DataTableContainer";
import { RandomizeTeams } from "../RandomizeTeams";

type DataCategoryProps = {
  generalPlayers: PlayerStats[];
  sessionPlayers: SessionPlayerStats[];
};

type Tab = "session" | "general" | "randomize_teams";

export const DataCategory = ({
  generalPlayers,
  sessionPlayers,
}: DataCategoryProps) => {
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
        <DataTableContainer
          data={category === "session" ? sessionPlayers : generalPlayers}
        />
      )}
    </Tabs>
  );
};
