import { PlayerStatsWithWeapons } from "../utils";

export const mapWeaponsData = (data: PlayerStatsWithWeapons[]) =>
  data.map((player) => {
    return {
      id: player.id,
      name: player.name,
      knifeKills: player.weapons.find((weapon) => weapon.name === "knife")
        ?.totalKills,
      knifeKillsPerGame: player.weapons.find(
        (weapon) => weapon.name === "knife"
      )?.averageKillsPerGame,
      zeusKills: player.weapons.find((weapon) => weapon.name === "zeus")
        ?.totalKills,
      zeusKillsPerGame: player.weapons.find((weapon) => weapon.name === "zeus")
        ?.averageKillsPerGame,
      grenadeOrMolotovKills: player.weapons.find(
        (weapon) => weapon.name === "grenadeOrMolotov"
      )?.totalKills,
      grenadeOrMolotovKillsPerGame: player.weapons.find(
        (weapon) => weapon.name === "grenadeOrMolotov"
      )?.averageKillsPerGame,
      glockKills: player.weapons.find((weapon) => weapon.name === "glock")
        ?.totalKills,
      glockKillsPerGame: player.weapons.find(
        (weapon) => weapon.name === "glock"
      )?.averageKillsPerGame,
      uspOrP2000Kills: player.weapons.find(
        (weapon) => weapon.name === "uspOrP2000"
      )?.totalKills,
      uspOrP2000KillsPerGame: player.weapons.find(
        (weapon) => weapon.name === "uspOrP2000"
      )?.averageKillsPerGame,
      deagleKills: player.weapons.find((weapon) => weapon.name === "deagle")
        ?.totalKills,
      deagleKillsPerGame: player.weapons.find(
        (weapon) => weapon.name === "deagle"
      )?.averageKillsPerGame,
      otherPistolsKills: player.weapons.find(
        (weapon) => weapon.name === "otherPistols"
      )?.totalKills,
      otherPistolsKillsPerGame: player.weapons.find(
        (weapon) => weapon.name === "otherPistols"
      )?.averageKillsPerGame,
      mac10OrMp9Kills: player.weapons.find(
        (weapon) => weapon.name === "mac10OrMp9"
      )?.totalKills,
      mac10OrMp9KillsPerGame: player.weapons.find(
        (weapon) => weapon.name === "mac10OrMp9"
      )?.averageKillsPerGame,
      p90Kills: player.weapons.find((weapon) => weapon.name === "p90")
        ?.totalKills,
      p90KillsPerGame: player.weapons.find((weapon) => weapon.name === "p90")
        ?.averageKillsPerGame,
      otherSMGKills: player.weapons.find((weapon) => weapon.name === "otherSMG")
        ?.totalKills,
      otherSMGKillsPerGame: player.weapons.find(
        (weapon) => weapon.name === "otherSMG"
      )?.averageKillsPerGame,
      shotgunKills: player.weapons.find((weapon) => weapon.name === "shotgun")
        ?.totalKills,
      shotgunKillsPerGame: player.weapons.find(
        (weapon) => weapon.name === "shotgun"
      )?.averageKillsPerGame,
      negevOrM249Kills: player.weapons.find(
        (weapon) => weapon.name === "negevOrM249"
      )?.totalKills,
      negevOrM249KillsPerGame: player.weapons.find(
        (weapon) => weapon.name === "negevOrM249"
      )?.averageKillsPerGame,
      ak47Kills: player.weapons.find((weapon) => weapon.name === "ak47")
        ?.totalKills,
      ak47KillsPerGame: player.weapons.find((weapon) => weapon.name === "ak47")
        ?.averageKillsPerGame,
      m4a4Kills: player.weapons.find((weapon) => weapon.name === "m4a4")
        ?.totalKills,
      m4a4KillsPerGame: player.weapons.find((weapon) => weapon.name === "m4a4")
        ?.averageKillsPerGame,
      m4a1sKills: player.weapons.find((weapon) => weapon.name === "m4a1s")
        ?.totalKills,
      m4a1sKillsPerGame: player.weapons.find(
        (weapon) => weapon.name === "m4a1s"
      )?.averageKillsPerGame,
      awpKills: player.weapons.find((weapon) => weapon.name === "awp")
        ?.totalKills,
      awpKillsPerGame: player.weapons.find((weapon) => weapon.name === "awp")
        ?.averageKillsPerGame,
      scoutKills: player.weapons.find((weapon) => weapon.name === "scout")
        ?.totalKills,
      scoutKillsPerGame: player.weapons.find(
        (weapon) => weapon.name === "scout"
      )?.averageKillsPerGame,
      famasKills: player.weapons.find((weapon) => weapon.name === "famas")
        ?.totalKills,
      famasKillsPerGame: player.weapons.find(
        (weapon) => weapon.name === "famas"
      )?.averageKillsPerGame,
      galilKills: player.weapons.find((weapon) => weapon.name === "galil")
        ?.totalKills,
      galilKillsPerGame: player.weapons.find(
        (weapon) => weapon.name === "galil"
      )?.averageKillsPerGame,
      autocampKills: player.weapons.find((weapon) => weapon.name === "autocamp")
        ?.totalKills,
      autocampKillsPerGame: player.weapons.find(
        (weapon) => weapon.name === "autocamp"
      )?.averageKillsPerGame,
      scopedRiflesKills: player.weapons.find(
        (weapon) => weapon.name === "scopedRifles"
      )?.totalKills,
      scopedRiflesKillsPerGame: player.weapons.find(
        (weapon) => weapon.name === "scopedRifles"
      )?.averageKillsPerGame,
    };
  });
