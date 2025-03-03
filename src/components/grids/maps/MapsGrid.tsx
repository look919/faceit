"use client";
import React from "react";
import {
  createMapColumnsForSpecificPlayer,
  createMapsPullFourColumns,
  createMapsPullOneColumns,
  createMapsPullThreeColumns,
  createMapsPullTwoColumns,
  MapsTableRecord,
} from "./columns";
import { Grid } from "../../Grid";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapStrengthChart } from "./MapStrengthChart";

type MapsGridProps = {
  data: MapsTableRecord[];
};

export const MapsGrid = (props: MapsGridProps) => {
  const [isAdvancedDataChosen, setIsAdvancedDataChosen] = React.useState(false);
  const [selectedPlayer, setSelectedPlayer] = React.useState("all-players");

  const columnsMapPullOne = createMapsPullOneColumns(isAdvancedDataChosen);
  const columnsMapPullTwo = createMapsPullTwoColumns(isAdvancedDataChosen);
  const columnsMapPullThree = createMapsPullThreeColumns(isAdvancedDataChosen);
  const columnsMapPullFour = createMapsPullFourColumns(isAdvancedDataChosen);

  const specificPlayerData = props.data.find(
    (record) => record.name === selectedPlayer
  )!;

  const columnsMapSpecificPlayer = createMapColumnsForSpecificPlayer();

  return (
    <div className="overflow-x-auto">
      <div>
        <Label htmlFor="maps-select" className="text-sm">
          Select player
        </Label>
        <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="all-players" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all-players">All-players</SelectItem>
              {props.data.map((record) => (
                <SelectItem key={record.id} value={record.name}>
                  {record.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2 mt-4 mb-2 cursor-pointer">
        <Switch
          id="maps-columns-switch"
          checked={isAdvancedDataChosen || selectedPlayer !== "all-players"}
          onCheckedChange={(isChecked) => setIsAdvancedDataChosen(isChecked)}
          disabled={selectedPlayer !== "all-players"}
        />
        <Label htmlFor="columns-switch" className="text-sm">
          Advanced data
        </Label>
      </div>
      {selectedPlayer === "all-players" ? (
        <>
          <div className="flex gap-4">
            <Grid data={props.data} columns={columnsMapPullOne} />
            <Grid data={props.data} columns={columnsMapPullTwo} />
          </div>
          <div className="flex mt-6 gap-4">
            <Grid data={props.data} columns={columnsMapPullThree} />
            <Grid data={props.data} columns={columnsMapPullFour} />
          </div>
        </>
      ) : (
        <div>
          <Grid
            data={specificPlayerData.maps}
            columns={columnsMapSpecificPlayer}
          />
          <MapStrengthChart data={[specificPlayerData]} />
        </div>
      )}
    </div>
  );
};
