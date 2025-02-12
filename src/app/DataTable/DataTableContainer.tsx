"use client";
import { PlayerStats } from "@prisma/client";
import React from "react";
import { simpleColumns, advancedColumns } from "./columns";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DataTable } from "./DataTable";

type DataTableContainerProps = {
  data: PlayerStats[];
};

export const DataTableContainer = (props: DataTableContainerProps) => {
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <div>
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
