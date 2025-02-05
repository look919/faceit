"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";

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
export const RandomizeTeams = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [randomizeState, setRandomizeState] = useState<
    "not_initiated" | "initiated" | "randomized"
  >("not_initiated");
  const [allPlayers, setAllPlayers] = useState<string[]>([]);

  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [randomizedIndexes, setRandomizedIndexes] = useState<
    [number[], number[]]
  >([[], []]);
  const togglePlayer = (player: string) => {
    if (selectedPlayers.includes(player)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p !== player));
    } else {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  useEffect(() => {
    // Check if localStorage is available (i.e., not on the server side)
    if (typeof window !== "undefined" && !isMounted) {
      setAllPlayers(JSON.parse(localStorage.getItem("players") || "[]"));
      setIsMounted(true);
    }
  }, [isMounted]);

  const addPlayerOnEnter = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && event.currentTarget.value) {
      setSelectedPlayers([...selectedPlayers, event.currentTarget.value]);
      setAllPlayers([...allPlayers, event.currentTarget.value]);
      localStorage.setItem(
        "players",
        JSON.stringify([...allPlayers, event.currentTarget.value])
      );

      event.currentTarget.value = "";
    }
  };

  if (randomizeState === "not_initiated") {
    return (
      <Button
        className="bg-gray-600"
        onClick={() => setRandomizeState("initiated")}
      >
        Randomize teams
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <Input onKeyDown={addPlayerOnEnter} className="max-w-64" />
      <div className="flex gap-2">
        {allPlayers.map((player) => {
          return (
            <Toggle
              pressed={selectedPlayers.includes(player)}
              onClick={() => togglePlayer(player)}
              className={
                "data-[state=on]:bg-sky-300 data-[state=off]:bg-gray-600"
              }
              key={player}
            >
              {player}
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
        className="bg-gray-600 w-fit"
        disabled={selectedPlayers.length > 10}
        onClick={() => {
          setRandomizeState("randomized");
          setRandomizedIndexes(randomizeIndexes());
        }}
      >
        Randomize teams
      </Button>

      {randomizeState === "randomized" && (
        <div className="flex gap-4 w-1/2 justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-lg text-sky-500">Team ZXC</span>
            {randomizedIndexes[0].map((randomizedPlayerIndex) => (
              <span key={randomizedPlayerIndex}>
                {selectedPlayers[randomizedPlayerIndex]}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-lg text-red-500">Team GRAJO</span>
            {randomizedIndexes[1].map((randomizedPlayerIndex) => (
              <span key={randomizedPlayerIndex}>
                {selectedPlayers[randomizedPlayerIndex]}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
