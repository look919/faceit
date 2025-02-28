import { MapsGrid } from "@/components/grids/maps/MapsGrid";
import { prisma } from "@/lib/prisma";
import { NUMBER_OF_MATCHES_SEPARATOR } from "@/utils/dummy-record";
import { mapsOrderBy } from "@/utils/order";
import { MapName } from "@/utils/weapons";
import { MapStats } from "@prisma/client";

const getAllTimeMapsPlayers = async () => {
  const allTimeMapsPlayers = await prisma.playerStats.findMany({
    where: {
      isSessionPlayer: false,
      gamesPlayed: {
        gte: NUMBER_OF_MATCHES_SEPARATOR,
      },
    },
    include: {
      maps: true,
    },
    orderBy: mapsOrderBy,
  });

  return allTimeMapsPlayers.map((player) => {
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
        isSessionMap: false,
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

export default async function AllTimeMapsPage() {
  const allTimeMapsPlayers = await getAllTimeMapsPlayers();

  return (
    <div>
      <MapsGrid data={allTimeMapsPlayers} />
    </div>
  );
}
