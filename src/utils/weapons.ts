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
  deathsFrom: number;
  deathsWith: number;
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
