// import { PrismaClient, Prisma } from "@prisma/client";
// import { PageTabs } from "./PageTabs";
// import { NUMBER_OF_MATCHES_SEPARATOR, SEPARATOR_PLAYER } from "../utils";
import { redirect } from "next/navigation";

// const orderBy: Prisma.PlayerStatsOrderByWithRelationInput[] = [
//   {
//     winRatePercentage: "desc",
//   },
//   {
//     gamesPlayed: "desc",
//   },
//   {
//     kda: "desc",
//   },
// ];

// const getGeneralTabPlayers = async () => {
//   const prisma = new PrismaClient();

//   const playersWithMoreGamesThanSeparator = await prisma.playerStats.findMany({
//     where: {
//       gamesPlayed: {
//         gte: NUMBER_OF_MATCHES_SEPARATOR,
//       },
//     },
//     include: {
//       weapons: true,
//     },
//     orderBy,
//   });

//   const playersWithLessGamesThanSeparator = await prisma.playerStats.findMany({
//     where: {
//       gamesPlayed: {
//         lt: NUMBER_OF_MATCHES_SEPARATOR,
//       },
//     },
//     include: {
//       weapons: true,
//     },
//     orderBy: [
//       {
//         gamesPlayed: "desc",
//       },
//       {
//         winRatePercentage: "desc",
//       },
//       {
//         kda: "desc",
//       },
//     ],
//   });

//   return [
//     ...playersWithMoreGamesThanSeparator,
//     SEPARATOR_PLAYER,
//     ...playersWithLessGamesThanSeparator,
//   ];
// };

export default async function Home() {
  return redirect("/general/main");
}
