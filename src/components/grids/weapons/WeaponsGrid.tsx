"use client";
import React from "react";
import {
  createShotgunColumns,
  createSubRiflesColumns,
  createWeaponsOthersColumns,
  createWeaponsPistolsColumns,
  createWeaponsRiflesColumns,
  createWeaponsSecondaryColumns,
  WeaponsTableRecord,
} from "./columns";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Grid } from "../../Grid";

type WeaponsGridProps = {
  data: WeaponsTableRecord[];
};

export const WeaponsGrid = (props: WeaponsGridProps) => {
  const [isAverageChosen, setIsAverageChosen] = React.useState(false);

  const otherColumns = createWeaponsOthersColumns(isAverageChosen);
  const pistolColumns = createWeaponsPistolsColumns(isAverageChosen);
  const riflesColumns = createWeaponsRiflesColumns(isAverageChosen);
  const secondaryColumns = createWeaponsSecondaryColumns(isAverageChosen);
  const subRiflesColumns = createSubRiflesColumns(isAverageChosen);
  const shotgunColumns = createShotgunColumns(isAverageChosen);

  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-2 mt-4 mb-2 cursor-pointer">
        <Label htmlFor="columns-switch" className="text-sm">
          Total
        </Label>
        <Switch
          id="weapons-columns-switch"
          checked={isAverageChosen}
          onCheckedChange={(isChecked) => setIsAverageChosen(isChecked)}
        />
        <Label htmlFor="columns-switch" className="text-sm">
          AVG
        </Label>
      </div>
      <div className="flex flex-col gap-y-8">
        <Grid data={props.data} columns={riflesColumns} />
        <Grid data={props.data} columns={pistolColumns} />
        <Grid data={props.data} columns={secondaryColumns} />
        <Grid data={props.data} columns={shotgunColumns} />
        <div className="flex gap-4">
          <Grid data={props.data} columns={otherColumns} />
          <Grid data={props.data} columns={subRiflesColumns} />
        </div>
      </div>
      <div className="flex mt-6 gap-2"></div>
    </div>
  );
};
