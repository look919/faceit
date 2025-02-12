"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayerStats, SessionPlayerStats } from "@prisma/client";
import React from "react";

import { DataTableContainer } from "./DataTableContainer";

type DataCategoryProps = {
  generalPlayers: PlayerStats[];
  sessionPlayers: SessionPlayerStats[];
};

export const DataCategory = ({
  generalPlayers,
  sessionPlayers,
}: DataCategoryProps) => {
  const [category, setCategory] = React.useState<"session" | "general">(
    "session"
  );

  return (
    <Tabs
      value={category}
      onValueChange={(newValue) =>
        setCategory(newValue as "session" | "general")
      }
    >
      <TabsList className="my-2">
        <TabsTrigger value="session">Session</TabsTrigger>
        <TabsTrigger value="general">General</TabsTrigger>
      </TabsList>
      <DataTableContainer
        data={category === "session" ? sessionPlayers : generalPlayers}
      />
    </Tabs>
  );
};
