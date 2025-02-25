"use client";
import { PlayerStats } from "@prisma/client";
import React from "react";
import { simpleColumns, advancedColumns } from "./columns";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DataTable } from "./DataTable";
import { NUMBER_OF_MATCHES_SEPARATOR } from "../page";

type StatsTableContainerProps = {
  data: PlayerStats[];
};

export const StatsTableContainer = (props: StatsTableContainerProps) => {
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <div>
      <span className="text-gray-500 italic text-sm">{`The number of matches you need to play to be default sorted with all of the players is currently: ${NUMBER_OF_MATCHES_SEPARATOR}`}</span>
      <div className="flex items-center space-x-2 mt-4 mb-2 cursor-pointer">
        <Switch
          id="columns-switch"
          checked={isChecked}
          onCheckedChange={(isChecked) => setIsChecked(isChecked)}
        />
        <Label htmlFor="columns-switch" className="text-sm">
          Advanced Data
        </Label>
      </div>

      <DataTable
        data={props.data}
        columns={isChecked ? advancedColumns : simpleColumns}
      />
    </div>
  );
};
