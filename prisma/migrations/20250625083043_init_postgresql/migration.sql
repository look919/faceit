-- CreateEnum
CREATE TYPE "PlayerTable" AS ENUM ('ALL_TIME', 'SEASON', 'SESSION');

-- CreateTable
CREATE TABLE "PlayerStats" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "playerTable" "PlayerTable" NOT NULL,
    "color" TEXT NOT NULL DEFAULT 'oklch(0.372 0.044 257.287)',
    "gamesPlayed" INTEGER NOT NULL,
    "gamesWon" INTEGER NOT NULL,
    "gamesLost" INTEGER NOT NULL,
    "gamesDrawn" INTEGER NOT NULL,
    "kills" INTEGER NOT NULL,
    "deaths" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "headshots" INTEGER NOT NULL,
    "damage" INTEGER NOT NULL,
    "roundsWon" INTEGER NOT NULL,
    "totalRounds" INTEGER NOT NULL,
    "aces" INTEGER NOT NULL,
    "mvps" INTEGER NOT NULL,
    "entryFrags" INTEGER NOT NULL,
    "entryDeaths" INTEGER NOT NULL,
    "killsThroughSmoke" INTEGER NOT NULL,
    "killsOnFlash" INTEGER NOT NULL,
    "killsThroughWall" INTEGER NOT NULL,
    "killsInJump" INTEGER NOT NULL,
    "clutches1v1Played" INTEGER NOT NULL,
    "clutches1v1Won" INTEGER NOT NULL,
    "clutches1v2Played" INTEGER NOT NULL,
    "clutches1v2Won" INTEGER NOT NULL,
    "clutches1v3Played" INTEGER NOT NULL,
    "clutches1v3Won" INTEGER NOT NULL,
    "clutches1v4Played" INTEGER NOT NULL,
    "clutches1v4Won" INTEGER NOT NULL,
    "clutches1v5Played" INTEGER NOT NULL,
    "clutches1v5Won" INTEGER NOT NULL,
    "lastFiveMatchesOutcome" TEXT NOT NULL,
    "kda" DOUBLE PRECISION NOT NULL,
    "kd" DOUBLE PRECISION NOT NULL,
    "winRatePercentage" DOUBLE PRECISION NOT NULL,
    "headshotPercentage" DOUBLE PRECISION NOT NULL,
    "roundsWinPercentage" DOUBLE PRECISION NOT NULL,
    "damagePerRound" DOUBLE PRECISION NOT NULL,
    "killsPerGame" DOUBLE PRECISION NOT NULL,
    "deathsPerGame" DOUBLE PRECISION NOT NULL,
    "assistsPerGame" DOUBLE PRECISION NOT NULL,
    "headshotsPerGame" DOUBLE PRECISION NOT NULL,
    "roundsWonPerGame" DOUBLE PRECISION NOT NULL,
    "totalRoundsPerGame" DOUBLE PRECISION NOT NULL,
    "damagePerGame" DOUBLE PRECISION NOT NULL,
    "mvpsPerGame" DOUBLE PRECISION NOT NULL,
    "acesPerGame" DOUBLE PRECISION NOT NULL,
    "entryFragsPerGame" DOUBLE PRECISION NOT NULL,
    "entryKillRating" DOUBLE PRECISION NOT NULL,
    "impactFactor" DOUBLE PRECISION NOT NULL,
    "killsThroughSmokePerGame" DOUBLE PRECISION NOT NULL,
    "killsThroughWallPerGame" DOUBLE PRECISION NOT NULL,
    "killsOnFlashPerGame" DOUBLE PRECISION NOT NULL,
    "killsInJumpPerGame" DOUBLE PRECISION NOT NULL,
    "clutches1v1WinPercentage" DOUBLE PRECISION NOT NULL,
    "clutches1v2WinPercentage" DOUBLE PRECISION NOT NULL,
    "clutches1v3WinPercentage" DOUBLE PRECISION NOT NULL,
    "clutches1v4WinPercentage" DOUBLE PRECISION NOT NULL,
    "clutches1v5WinPercentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PlayerStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MapStats" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "playerTable" "PlayerTable" NOT NULL,
    "gamesPlayed" INTEGER NOT NULL DEFAULT 0,
    "gamesWon" INTEGER NOT NULL DEFAULT 0,
    "gamesDrawn" INTEGER NOT NULL DEFAULT 0,
    "gamesLost" INTEGER NOT NULL DEFAULT 0,
    "winRatePercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalGamesLength" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "averageGameLength" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalRounds" INTEGER NOT NULL DEFAULT 0,
    "roundsWon" INTEGER NOT NULL DEFAULT 0,
    "roundsPerGame" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "roundsWonPerGame" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "roundsWinPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "playerId" BIGINT NOT NULL,

    CONSTRAINT "MapStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeaponStats" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "playerTable" "PlayerTable" NOT NULL,
    "kills" INTEGER NOT NULL DEFAULT 0,
    "deaths" INTEGER NOT NULL DEFAULT 0,
    "killsPerGame" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deathsPerGame" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "playerId" BIGINT NOT NULL,

    CONSTRAINT "WeaponStats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MapStats" ADD CONSTRAINT "MapStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "PlayerStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeaponStats" ADD CONSTRAINT "WeaponStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "PlayerStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
