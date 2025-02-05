"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var fs_1 = require("fs");
var prisma = new client_1.PrismaClient();
var main = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var rawData, stats, _i, _a, _b, steamId, data, existingPlayer;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          rawData = (0, fs_1.readFileSync)("./stats.json", "utf8");
          stats = JSON.parse(rawData);
          (_i = 0), (_a = Object.entries(stats));
          _c.label = 1;
        case 1:
          if (!(_i < _a.length)) return [3 /*break*/, 5];
          (_b = _a[_i]), (steamId = _b[0]), (data = _b[1]);
          return [
            4 /*yield*/,
            prisma.playerStats.findUnique({
              where: { id: Number(steamId) },
            }),
          ];
        case 2:
          existingPlayer = _c.sent();
          return [
            4 /*yield*/,
            prisma.playerStats.upsert({
              where: { id: Number(steamId) },
              update: {
                winRatePercentage: existingPlayer
                  ? (existingPlayer.gamesWon / existingPlayer.gamesPlayed) * 100
                  : 0,
                gamesPlayed: { increment: 1 },
                gamesWon: { increment: data.match_outcome === "Win" ? 1 : 0 },
                gamesLost: { increment: data.match_outcome === "Loss" ? 1 : 0 },
                gamesDrawn: {
                  increment: data.match_outcome === "Draw" ? 1 : 0,
                },
                kda: existingPlayer
                  ? (existingPlayer.kda * existingPlayer.gamesPlayed +
                      (data.kills + data.assists) / Math.max(1, data.deaths)) /
                    (existingPlayer.gamesPlayed + 1)
                  : (data.kills + data.assists) / Math.max(1, data.deaths),
                kills: { increment: data.kills },
                deaths: { increment: data.deaths },
                assists: { increment: data.assists },
                headshots: { increment: data.headshots },
                roundsWon: { increment: data.rounds_won },
                totalRounds: { increment: data.total_rounds },
                damage: { increment: data.damage },
              },
              create: {
                id: Number(steamId),
                name: data.name,
                winRatePercentage: data.match_outcome === "Win" ? 100 : 0,
                gamesPlayed: 1,
                gamesWon: data.match_outcome === "Win" ? 1 : 0,
                gamesLost: data.match_outcome === "Loss" ? 1 : 0,
                gamesDrawn: data.match_outcome === "Draw" ? 1 : 0,
                kda: (data.kills + data.assists) / Math.max(1, data.deaths),
                killsPerGame: data.kills,
                deathsPerGame: data.deaths,
                assistsPerGame: data.assists,
                damagePerRound: data.damage / Math.max(1, data.total_rounds),
                damagePerGame: data.damage,
                headshotPercentage:
                  (data.headshots / Math.max(1, data.kills)) * 100,
                kills: data.kills,
                deaths: data.deaths,
                assists: data.assists,
                headshots: data.headshots,
                roundsWon: data.rounds_won,
                totalRounds: data.total_rounds,
                headshotsPerGame: data.headshots,
                roundPerGame: data.rounds_won,
                totalRoundsPerGame: data.total_rounds,
                roundsWinPercentage:
                  (data.rounds_won / Math.max(1, data.total_rounds)) * 100,
                damage: data.damage,
              },
            }),
          ];
        case 3:
          _c.sent();
          _c.label = 4;
        case 4:
          _i++;
          return [3 /*break*/, 1];
        case 5:
          console.log("Stats updated in the database.");
          return [2 /*return*/];
      }
    });
  });
};
main()
  .catch(function (e) {
    return console.error(e);
  })
  .finally(function () {
    return prisma.$disconnect();
  });
