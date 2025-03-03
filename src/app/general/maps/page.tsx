import { MapsGrid } from "@/components/grids/maps/MapsGrid";
import { prisma } from "@/lib/prisma";
import { MATCHES_PLAYED_SEPARATOR } from "@/utils/player";
import { mapsOrderBy } from "@/utils/order";
import { MapName } from "@/utils/weapons";
import { MapStats, PlayerTable } from "@prisma/client";

const getGeneralMapsPlayers = async () => {
  const generalMapsPlayers = await prisma.playerStats.findMany({
    where: {
      playerTable: PlayerTable.SEASON,
      gamesPlayed: {
        gte: MATCHES_PLAYED_SEPARATOR,
      },
    },
    include: {
      maps: true,
    },
    orderBy: mapsOrderBy,
  });

  return generalMapsPlayers.map((player) => {
    const maps = player.maps;

    const mapsObject = maps.reduce((acc, map) => {
      acc[map.name as MapName] = {
        id: map.id,
        name: map.name,
        gamesPlayed: map.gamesPlayed,
        gamesWon: map.gamesWon,
        gamesLost: map.gamesLost,
        gamesDrawn: map.gamesDrawn,
        winRatePercentage: map.winRatePercentage,
        totalGamesLength: map.totalGamesLength,
        averageGameLength: map.averageGameLength / 60,
        totalRounds: map.totalRounds,
        roundsWon: map.roundsWon,
        roundsPerGame: map.roundsPerGame,
        roundsWonPerGame: map.roundsWonPerGame,
        roundsWinPercentage: map.roundsWinPercentage,
        playerTable: PlayerTable.SEASON,
        playerId: map.playerId,
      };
      return acc;
    }, {} as Record<MapName, MapStats>);

    return {
      id: player.id,
      name: player.name,
      avatar: player.avatar,
      ...mapsObject,
      maps,
    };
  });
};

export default async function GeneralMapsPage() {
  const generalMapsPlayers = await getGeneralMapsPlayers();

  return (
    <div>
      <MapsGrid data={generalMapsPlayers} />
    </div>
  );
}
