"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { MapStats } from "@prisma/client";
import { useState } from "react";
import Image from "next/image";
import { MapStrengthChart } from "@/components/grids/maps/MapStrengthChart";

function randomizeIndexes(): [number[], number[]] {
  const allNumbers = Array.from({ length: 10 }, (_, i) => i); // Array of numbers from 0 to 9
  const randomizedIndexes = new Set<number>();

  // Randomize 5 unique numbers
  while (randomizedIndexes.size < 5) {
    const randomIndex = Math.floor(Math.random() * allNumbers.length);
    randomizedIndexes.add(allNumbers[randomIndex]);
  }

  // Get the randomized and remaining numbers
  const randomizedArray = Array.from(randomizedIndexes);
  const remainingArray = allNumbers.filter(
    (num) => !randomizedIndexes.has(num)
  );

  return [randomizedArray, remainingArray];
}

export type RandomizePlayer = {
  id: bigint;
  name: string;
  avatar: string;
  color: string;
  maps: MapStats[];
};

type RandomizedPlayerProps = {
  player: RandomizePlayer;
};
const RandomizedPlayer = ({ player }: RandomizedPlayerProps) => {
  return (
    <div className="flex gap-2">
      <Image
        src={`/avatars/${player.avatar}`}
        alt=""
        width={24}
        height={24}
        className="border-2"
        style={{ borderColor: player.color }}
      />
      <span>{player.name}</span>
    </div>
  );
};

type RandomizeTeamsProps = {
  players: RandomizePlayer[];
};

export const RandomizeTeams = ({ players }: RandomizeTeamsProps) => {
  const [allPlayers, setAllPlayers] = useState<RandomizePlayer[]>(players);

  const [selectedPlayers, setSelectedPlayers] = useState<RandomizePlayer[]>([]);
  const [randomizedTeams, setRandomizedTeams] = useState<
    [RandomizePlayer[], RandomizePlayer[]]
  >([[], []]);

  const togglePlayer = (player: RandomizePlayer) => {
    const playerAlreadySelected = selectedPlayers.find(
      (selectedPlayer) => selectedPlayer.name === player.name
    );

    if (playerAlreadySelected) {
      setSelectedPlayers(selectedPlayers.filter((p) => p !== player));
    } else {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const addPlayerOnEnter = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const newPlayer = {
      id: BigInt(allPlayers.length),
      name: event.currentTarget.value,
      avatar: "",
      color: "oklch(0.372 0.044 257.287)",
      maps: [],
    };

    if (event.key === "Enter" && event.currentTarget.value) {
      setSelectedPlayers([...selectedPlayers, newPlayer]);
      setAllPlayers([...allPlayers, newPlayer]);

      event.currentTarget.value = "";
    }
  };

  const handleRandomizeTeams = () => {
    const [randomizedIndexes, remainingIndexes] = randomizeIndexes();

    const randomizedTeam1 = randomizedIndexes.map(
      (index) => selectedPlayers[index]
    );
    const randomizedTeam2 = remainingIndexes.map(
      (index) => selectedPlayers[index]
    );

    setRandomizedTeams([randomizedTeam1, randomizedTeam2]);
  };

  return (
    <div className="flex flex-col gap-6 mt-6 w- items-center justify-center max-w-screen-md">
      <div className="flex flex-col gap-1 items-center">
        <Label className="text-xs ml-1">Add new player</Label>
        <Input
          onKeyDown={addPlayerOnEnter}
          className="max-w-64"
          placeholder="save on enter"
        />
      </div>
      <div className="flex gap-2 flex-wrap mt-4 justify-center">
        {allPlayers.map((player) => {
          return (
            <Toggle
              pressed={selectedPlayers.includes(player)}
              onClick={() => togglePlayer(player)}
              className={
                "data-[state=on]:bg-sky-300 data-[state=off]:bg-gray-600 hover:data-[state=off]:bg-gray-500 hover:data-[state=off]:text-white"
              }
              key={player.id}
            >
              {player.name}
            </Toggle>
          );
        })}
      </div>
      {selectedPlayers.length > 0 ? (
        <span
          className={
            selectedPlayers.length > 10 ? "text-red-600" : "text-green-500"
          }
        >{`Number of players chosen ${selectedPlayers.length}/10`}</span>
      ) : null}
      <Button
        className="bg-sky-400 w-fit"
        disabled={selectedPlayers.length !== 10}
        onClick={handleRandomizeTeams}
      >
        Randomize teams
      </Button>

      {randomizedTeams[0].length ? (
        <div className="flex w-[1000px] justify-between">
          <div className="flex flex-col gap-2 min-w-80 items-center">
            <span className="text-lg text-sky-500">Team ZXC</span>
            {randomizedTeams[0].map((randomizedTeamPlayer) => (
              <RandomizedPlayer
                key={randomizedTeamPlayer.id}
                player={randomizedTeamPlayer}
              />
            ))}
            <MapStrengthChart data={randomizedTeams[0]} />
          </div>
          <div className="flex flex-col gap-2 w-[450px] items-center">
            <span className="text-lg text-red-500">Team GRAJO</span>
            {randomizedTeams[1].map((randomizedTeamPlayer) => (
              <RandomizedPlayer
                key={randomizedTeamPlayer.id}
                player={randomizedTeamPlayer}
              />
            ))}
            <MapStrengthChart data={randomizedTeams[1]} />
          </div>
        </div>
      ) : null}
    </div>
  );
};
