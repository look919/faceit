export const divideResult = (result: number, divider: number): number => {
  if (divider === 0) {
    return 0; // Avoid division by zero
  }
  return result / divider;
};

export const countKda = (kills: number, deaths: number, assists: number) => {
  return (kills + assists * 0.5) / Math.max(1, deaths);
};

export const countKd = (kills: number, deaths: number) => {
  return kills / Math.max(1, deaths);
};

export const countWinPercentage = (result: number, divider: number) =>
  divideResult(result, divider) * 100;

/*
 * Metric to calculate the usefulness of a player based on various player stats.

 * Each player can score 5 points maximum:

 * 2 points from entry kill rating (1.25 × entryKd, but maximum 2)
 * 0.5 points from MVPs per game (if >= 3)
 * 0.1 points from bomb plants per game (if >= 1)
 * 0.1 points from bomb defuses per game (if >= 0.3)
 * 0.2 points from ADR above average (if > 85)
 * 0.1 points from aces per game (if >= 0.03)
 * 2 points for clutches:
 * 0.7 for 1v1 if > 75%, 0.5 for 1v1 if > 65%, 0.3 for 1v1 if > 60%, 0.2 for 1v1 if > 55%, 0.1 for 1v1 if > 50%
 * 0.7 for 1v2 if > 25%, 0.5 for 1v2 if > 20%, 0.3 for 1v2 if > 15%, 0.2 for 1v2 if > 10%, 0.1 for 1v2 if > 5%
 * 0.4 for 1v3 if > 10%, 0.3 for 1v3 if > 7%, 0.2 for 1v3 if > 5%, 0.1 for 1v3 if > 2%
 * 0.1 for 1v4 if > 0%
 * 0.1 for 1v5 if > 0%
 *
 * At the end, the total points are divided by 5 to get the impact factor in 0-1 range.
 */

export const countImpactFactor = (stats: {
  entryKillRating: number;
  mvpsPerGame: number;
  bombPlantsPerGame: number;
  bombDefusesPerGame: number;
  damagePerGame: number;
  acesPerGame: number;
  clutches1v1WinPercentage: number;
  clutches1v2WinPercentage: number;
  clutches1v3WinPercentage: number;
  clutches1v4WinPercentage: number;
  clutches1v5WinPercentage: number;
}) => {
  let points = 0;

  // Entry Kill Rating points (max 2 points: 1.25 × entryKd, but maximum 2)
  points += Math.min(1.25 * stats.entryKillRating, 2);

  // MVPs per game points (max 0.5 points)
  if (stats.mvpsPerGame >= 3) {
    points += 0.5;
  } else if (stats.mvpsPerGame >= 2.75) {
    points += 0.4;
  } else if (stats.mvpsPerGame >= 2.25) {
    points += 0.3;
  } else if (stats.mvpsPerGame >= 1.75) {
    points += 0.2;
  } else if (stats.mvpsPerGame >= 1) {
    points += 0.1;
  }

  // Bomb plants per game (0.1 point if >= 1)
  if (stats.bombPlantsPerGame >= 1) {
    points += 0.1;
  }

  // Bomb defuses per game (0.1 point if >= 0.3)
  if (stats.bombDefusesPerGame >= 0.3) {
    points += 0.1;
  }

  // Damage per game points
  if (stats.damagePerGame > 85) {
    points += 0.2;
  } else if (stats.damagePerGame > 75) {
    points += 0.1;
  }

  // Aces per game (0.1 point if >= 0.03)
  if (stats.acesPerGame >= 0.03) {
    points += 0.1;
  }

  // 1v1 clutches
  if (stats.clutches1v1WinPercentage > 75) {
    points += 0.7;
  } else if (stats.clutches1v1WinPercentage > 65) {
    points += 0.5;
  } else if (stats.clutches1v1WinPercentage > 60) {
    points += 0.3;
  } else if (stats.clutches1v1WinPercentage > 55) {
    points += 0.2;
  } else if (stats.clutches1v1WinPercentage > 50) {
    points += 0.1;
  }

  // 1v2 clutches
  if (stats.clutches1v2WinPercentage > 25) {
    points += 0.7;
  } else if (stats.clutches1v2WinPercentage > 20) {
    points += 0.5;
  } else if (stats.clutches1v2WinPercentage > 15) {
    points += 0.3;
  } else if (stats.clutches1v2WinPercentage > 10) {
    points += 0.2;
  } else if (stats.clutches1v2WinPercentage > 5) {
    points += 0.1;
  }

  // 1v3 clutches
  if (stats.clutches1v3WinPercentage > 10) {
    points += 0.4;
  } else if (stats.clutches1v3WinPercentage > 7) {
    points += 0.3;
  } else if (stats.clutches1v3WinPercentage > 5) {
    points += 0.2;
  } else if (stats.clutches1v3WinPercentage > 2) {
    points += 0.1;
  }

  // 1v4 clutches (0.1 if any above 0)
  if (stats.clutches1v4WinPercentage > 0) {
    points += 0.1;
  }

  // 1v5 clutches (0.1 if any above 0)
  if (stats.clutches1v5WinPercentage > 0) {
    points += 0.1;
  }

  // Return total points divided by 5
  return points / 5;
};
