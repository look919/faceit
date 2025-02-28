export const mapNames = [
  "de_dust2",
  "de_inferno",
  "de_mirage",
  "de_nuke",
  "de_overpass",
  "de_train",
  "de_vertigo",
  "de_anubis",
  "de_ancient",
] as const;

export type MapName = (typeof mapNames)[number];

export type WeaponFromJson = {
  kills: number;
  deaths: number;
};
export const weaponNames = [
  "ak47",
  "aug",
  "awp",
  "bizon",
  "cz75",
  "deagle",
  "dualBerettas",
  "famas",
  "fiveSeven",
  "g3sg1",
  "galil",
  "glock",
  "heGrenade",
  "knife",
  "m249",
  "m4a1s",
  "m4a4",
  "mac10",
  "mag7",
  "molotov",
  "mp5",
  "mp7",
  "mp9",
  "negev",
  "nova",
  "other",
  "otherGrenade",
  "p2000",
  "p250",
  "p90",
  "revolver",
  "sawedOff",
  "scar20",
  "scout",
  "sg553",
  "tec9",
  "ump",
  "usp",
  "xm1014",
  "zeus",
] as const;

export type WeaponName = (typeof weaponNames)[number];

export type StatsFromJson = {
  is_session_player: boolean;
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
};
