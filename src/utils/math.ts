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

  // Clutch win percentages (convert to decimal for comparison)
  const clutch1v1 = stats.clutches1v1WinPercentage / 100;
  const clutch1v2 = stats.clutches1v2WinPercentage / 100;
  const clutch1v3 = stats.clutches1v3WinPercentage / 100;
  const clutch1v4 = stats.clutches1v4WinPercentage / 100;
  const clutch1v5 = stats.clutches1v5WinPercentage / 100;

  // 1v1 clutches
  if (clutch1v1 > 0.75) {
    points += 0.7;
  } else if (clutch1v1 > 0.65) {
    points += 0.5;
  } else if (clutch1v1 > 0.6) {
    points += 0.3;
  } else if (clutch1v1 > 0.55) {
    points += 0.2;
  } else if (clutch1v1 > 0.5) {
    points += 0.1;
  }

  // 1v2 clutches
  if (clutch1v2 > 0.25) {
    points += 0.7;
  } else if (clutch1v2 > 0.2) {
    points += 0.5;
  } else if (clutch1v2 > 0.15) {
    points += 0.3;
  } else if (clutch1v2 > 0.1) {
    points += 0.2;
  } else if (clutch1v2 > 0.05) {
    points += 0.1;
  }

  // 1v3 clutches
  if (clutch1v3 > 0.1) {
    points += 0.4;
  } else if (clutch1v3 > 0.07) {
    points += 0.3;
  } else if (clutch1v3 > 0.05) {
    points += 0.2;
  } else if (clutch1v3 > 0.02) {
    points += 0.1;
  }

  // 1v4 clutches (0.1 if any above 0)
  if (clutch1v4 > 0) {
    points += 0.1;
  }

  // 1v5 clutches (0.1 if any above 0)
  if (clutch1v5 > 0) {
    points += 0.1;
  }

  // Return total points divided by 5
  return points / 5;
};
