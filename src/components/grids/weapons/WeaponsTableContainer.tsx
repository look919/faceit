"use client";
import React from "react";
import {
  weaponsAverageKillsColumns,
  weaponsTotalKillsColumns,
} from "./columns";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Grid } from "../../ui/Grid";
import { mapWeaponsData } from "./mapWeaponsData";
import { PlayerStatsWithWeapons } from "@/utils/types";

type WeaponsTableContainerProps = {
  data: PlayerStatsWithWeapons[];
};

export const WeaponsTableContainer = (props: WeaponsTableContainerProps) => {
  const [isChecked, setIsChecked] = React.useState(false);

  const mappedWeaponsData = mapWeaponsData(props.data);
  const columns = isChecked
    ? weaponsAverageKillsColumns
    : weaponsTotalKillsColumns;

  return (
    <div>
      <div className="flex items-center space-x-2 mt-4 mb-2 cursor-pointer">
        <Label htmlFor="columns-switch" className="text-sm">
          Total
        </Label>
        <Switch
          id="weapons-columns-switch"
          checked={isChecked}
          onCheckedChange={(isChecked) => setIsChecked(isChecked)}
        />
        <Label htmlFor="columns-switch" className="text-sm">
          AVG
        </Label>
      </div>
      {/* @ts-expect-error Cant fix it right now */}
      <Grid data={mappedWeaponsData} columns={columns} />
    </div>
  );
};
