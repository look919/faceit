export const countKda = (kills: number, deaths: number, assists: number) => {
  return (kills + assists * 0.5) / Math.max(1, deaths);
};

export const countKd = (kills: number, deaths: number) => {
  return kills / Math.max(1, deaths);
};

export const countClutchesWinPercentage = (played: number, won: number) =>
  played ? (won / played) * 100 : 0;
