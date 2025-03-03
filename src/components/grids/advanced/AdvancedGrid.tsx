"use client";
import React from "react";
import { AdvancedGridRecord, createAdvancedColumns } from "./columns";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Grid } from "../../Grid";

type WeaponsGridProps = {
  data: AdvancedGridRecord[];
};

export const AdvancedGrid = (props: WeaponsGridProps) => {
  const [shouldDisplayAdvancedData, setShouldDisplayAdvancedData] =
    React.useState(false);

  const columns = createAdvancedColumns(shouldDisplayAdvancedData);

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center space-x-2 mt-4 mb-2 cursor-pointer">
        <Switch
          id="columns-switch"
          checked={shouldDisplayAdvancedData}
          onCheckedChange={(isChecked) =>
            setShouldDisplayAdvancedData(isChecked)
          }
        />
        <Label htmlFor="columns-switch" className="text-sm">
          Advanced Data
        </Label>
      </div>
      <Grid data={props.data} columns={columns} />
    </div>
  );
};
