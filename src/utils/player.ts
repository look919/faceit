import { PlayerTable } from "@prisma/client";
import { MapName, WeaponFromJson, WeaponName } from "./weapons";

export const SEASON_MATCHES_PLAYED_SEPARATOR = 10;
export const ALL_TIME_MATCHES_PLAYED_SEPARATOR = 12;

export type StatsFromJson = {
  players_table: PlayerTable;
  name: string;
  kills: number;
  deaths: number;
  assists: number;
  kills_on_flash: number;
  kills_through_smoke: number;
  kills_in_jump: number;
  kills_through_wall: number;
  headshots: number;
  damage: number;
  rounds_won: number;
  total_rounds: number;
  match_outcome: "Win" | "Loss" | "Draw";
  map_played: MapName;
  map_duration_seconds: number;
  entry_frags: number;
  entry_deaths: number;
  aces: number;
  mvp: number;
  clutches_1v1_played: number;
  clutches_1v1_won: number;
  clutches_1v2_played: number;
  clutches_1v2_won: number;
  clutches_1v3_played: number;
  clutches_1v3_won: number;
  clutches_1v4_played: number;
  clutches_1v4_won: number;
  clutches_1v5_played: number;
  clutches_1v5_won: number;

  weapons: Record<WeaponName, WeaponFromJson>;
};
