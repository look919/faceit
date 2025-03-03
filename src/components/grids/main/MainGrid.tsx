"use client";
import { PlayerStats } from "@prisma/client";
import React from "react";
import { simpleColumns, advancedColumns } from "./columns";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Grid } from "../../Grid";

type MainGridProps = {
  primaryData: PlayerStats[];
  secondaryData?: PlayerStats[];
  separator?: number;
};

export const MainGrid = (props: MainGridProps) => {
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <div>
      {Boolean(props.separator) && (
        <div className="text-gray-500 italic text-sm text-center mt-2">
          The number of matches you need to play to be default sorted with all
          of the players is currently: <span>{props.separator}</span>
        </div>
      )}
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

      <Grid
        data={props.primaryData}
        columns={isChecked ? advancedColumns : simpleColumns}
      />

      {/* {props.secondaryData && (
        <div className="mt-4">
          <Grid
            data={props.secondaryData}
            columns={isChecked ? advancedColumns : simpleColumns}
          />
        </div>
      )} */}
    </div>
  );
};
