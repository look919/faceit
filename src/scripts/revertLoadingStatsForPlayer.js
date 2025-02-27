"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var fs_1 = require("fs");
var utils_1 = require("./utils");
var prisma = new client_1.PrismaClient();
// Get player name from command-line arguments
var args = process.argv.slice(2);
var playerNameArg = args.find(function (arg) { return arg.startsWith("--name="); });
var playerName = playerNameArg ? playerNameArg.split("=")[1] : null;
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var rawData, stats, _loop_1, _i, _a, _b, steamId, data, state_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                rawData = (0, fs_1.readFileSync)("./src/scripts/stats.json", "utf8");
                stats = JSON.parse(rawData);
                _loop_1 = function (steamId, data) {
                    var existingPlayer, lastFiveMatchesOutcome, collectableStats, resultDeterminedStats, countableStats, _loop_2, _d, _e, _f, weaponName, weaponStats, existingMap;
                    return __generator(this, function (_g) {
                        switch (_g.label) {
                            case 0:
                                if (!playerName) {
                                    console.log("No player name provided", playerName, playerNameArg);
                                    return [2 /*return*/, { value: void 0 }];
                                }
                                if (data.name !== playerName) {
                                    return [2 /*return*/, "continue"];
                                }
                                return [4 /*yield*/, prisma.playerStats.findUnique({
                                        where: { id: Number(steamId) },
                                        include: { weapons: true, maps: true },
                                    })];
                            case 1:
                                existingPlayer = _g.sent();
                                if (!!existingPlayer) return [3 /*break*/, 3];
                                // If the player doesn't exist, skip (or delete if it was newly added)
                                return [4 /*yield*/, prisma.playerStats.delete({
                                        where: { id: Number(steamId) },
                                    })];
                            case 2:
                                // If the player doesn't exist, skip (or delete if it was newly added)
                                _g.sent();
                                return [2 /*return*/, "continue"];
                            case 3:
                                lastFiveMatchesOutcome = existingPlayer.lastFiveMatchesOutcome;
                                collectableStats = {
                                    gamesPlayed: existingPlayer.gamesPlayed - 1,
                                    name: existingPlayer.name,
                                    isSessionPlayer: existingPlayer.isSessionPlayer,
                                    avatar: existingPlayer.avatar,
                                    kills: existingPlayer.kills - data.kills,
                                    deaths: existingPlayer.deaths - data.deaths,
                                    assists: existingPlayer.assists - data.assists,
                                    killsOnFlash: existingPlayer.killsOnFlash - data.kills_on_flash,
                                    killsThroughSmoke: existingPlayer.killsThroughSmoke - data.kills_through_smoke,
                                    killsInJump: existingPlayer.killsInJump - data.kills_in_jump,
                                    killsThroughWall: existingPlayer.killsThroughWall - data.kills_through_wall,
                                    headshots: existingPlayer.headshots - data.headshots,
                                    damage: existingPlayer.damage - data.damage,
                                    totalRounds: existingPlayer.totalRounds - data.total_rounds,
                                    roundsWon: existingPlayer.roundsWon - data.rounds_won,
                                    entryFrags: existingPlayer.entryFrags - data.entry_frags,
                                    aces: existingPlayer.aces - data.aces,
                                    mvps: existingPlayer.mvps - data.mvp,
                                    clutches1v1Played: existingPlayer.clutches1v1Played - data.clutches_1v1_played,
                                    clutches1v1Won: existingPlayer.clutches1v1Won - data.clutches_1v1_won,
                                    clutches1v2Played: existingPlayer.clutches1v2Played - data.clutches_1v2_played,
                                    clutches1v2Won: existingPlayer.clutches1v2Won - data.clutches_1v2_won,
                                    clutches1v3Played: existingPlayer.clutches1v3Played - data.clutches_1v3_played,
                                    clutches1v3Won: existingPlayer.clutches1v3Won - data.clutches_1v3_won,
                                    clutches1v4Played: existingPlayer.clutches1v4Played - data.clutches_1v4_played,
                                    clutches1v4Won: existingPlayer.clutches1v4Won - data.clutches_1v4_won,
                                    clutches1v5Played: existingPlayer.clutches1v5Played - data.clutches_1v5_played,
                                    clutches1v5Won: existingPlayer.clutches1v5Won - data.clutches_1v5_won,
                                    lastFiveMatchesOutcome: lastFiveMatchesOutcome.slice(0, -1), // Remove the last match outcome
                                };
                                resultDeterminedStats = {
                                    gamesWon: data.match_outcome === "Win"
                                        ? existingPlayer.gamesWon - 1
                                        : existingPlayer.gamesWon,
                                    gamesLost: data.match_outcome === "Loss"
                                        ? existingPlayer.gamesLost - 1
                                        : existingPlayer.gamesLost,
                                    gamesDrawn: data.match_outcome === "Draw"
                                        ? existingPlayer.gamesDrawn - 1
                                        : existingPlayer.gamesDrawn,
                                };
                                countableStats = {
                                    kda: (0, utils_1.countKda)(collectableStats.kills, collectableStats.deaths, collectableStats.assists),
                                    kd: (0, utils_1.countKd)(collectableStats.kills, collectableStats.deaths),
                                    winRatePercentage: (resultDeterminedStats.gamesWon / collectableStats.gamesPlayed) * 100,
                                    killsPerGame: collectableStats.kills / collectableStats.gamesPlayed,
                                    deathsPerGame: collectableStats.deaths / collectableStats.gamesPlayed,
                                    assistsPerGame: collectableStats.assists / collectableStats.gamesPlayed,
                                    damagePerRound: collectableStats.damage / collectableStats.totalRounds,
                                    damagePerGame: collectableStats.damage / collectableStats.gamesPlayed,
                                    killsThroughSmokePerGame: collectableStats.killsThroughSmoke / collectableStats.gamesPlayed,
                                    killsOnFlashPerGame: collectableStats.killsOnFlash / collectableStats.gamesPlayed,
                                    killsInJumpPerGame: collectableStats.killsInJump / collectableStats.gamesPlayed,
                                    killsThroughWallPerGame: collectableStats.killsThroughWall / collectableStats.gamesPlayed,
                                    headshotPercentage: (collectableStats.headshots / collectableStats.kills) * 100,
                                    headshotsPerGame: collectableStats.headshots / collectableStats.gamesPlayed,
                                    roundsWonPerGame: collectableStats.roundsWon / collectableStats.gamesPlayed,
                                    totalRoundsPerGame: collectableStats.totalRounds / collectableStats.gamesPlayed,
                                    roundsWinPercentage: (collectableStats.roundsWon / collectableStats.totalRounds) * 100,
                                    mvpsPerGame: collectableStats.mvps / collectableStats.gamesPlayed,
                                    entryFragsPerGame: collectableStats.entryFrags / collectableStats.gamesPlayed,
                                    acesPerGame: collectableStats.aces / collectableStats.gamesPlayed,
                                    clutches1v1WinPercentage: (0, utils_1.countClutchesWinPercentage)(collectableStats.clutches1v1Played, collectableStats.clutches1v1Won),
                                    clutches1v2WinPercentage: (0, utils_1.countClutchesWinPercentage)(collectableStats.clutches1v2Played, collectableStats.clutches1v2Won),
                                    clutches1v3WinPercentage: (0, utils_1.countClutchesWinPercentage)(collectableStats.clutches1v3Played, collectableStats.clutches1v3Won),
                                    clutches1v4WinPercentage: (0, utils_1.countClutchesWinPercentage)(collectableStats.clutches1v4Played, collectableStats.clutches1v4Won),
                                    clutches1v5WinPercentage: (0, utils_1.countClutchesWinPercentage)(collectableStats.clutches1v5Played, collectableStats.clutches1v5Won),
                                };
                                // Update the player stats
                                return [4 /*yield*/, prisma.playerStats.update({
                                        where: { id: Number(steamId) },
                                        data: __assign(__assign(__assign({}, collectableStats), resultDeterminedStats), countableStats),
                                    })];
                            case 4:
                                // Update the player stats
                                _g.sent();
                                _loop_2 = function (weaponName, weaponStats) {
                                    var existingWeapon;
                                    return __generator(this, function (_h) {
                                        switch (_h.label) {
                                            case 0:
                                                existingWeapon = existingPlayer.weapons.find(function (weapon) { return weapon.name === weaponName; });
                                                if (!existingWeapon) return [3 /*break*/, 2];
                                                return [4 /*yield*/, prisma.weaponStats.update({
                                                        where: { id: existingWeapon.id },
                                                        data: {
                                                            kills: existingWeapon.kills - weaponStats.kills,
                                                            deaths: existingWeapon.deaths - weaponStats.deaths,
                                                        },
                                                    })];
                                            case 1:
                                                _h.sent();
                                                _h.label = 2;
                                            case 2: return [2 /*return*/];
                                        }
                                    });
                                };
                                _d = 0, _e = Object.entries(data.weapons);
                                _g.label = 5;
                            case 5:
                                if (!(_d < _e.length)) return [3 /*break*/, 8];
                                _f = _e[_d], weaponName = _f[0], weaponStats = _f[1];
                                return [5 /*yield**/, _loop_2(weaponName, weaponStats)];
                            case 6:
                                _g.sent();
                                _g.label = 7;
                            case 7:
                                _d++;
                                return [3 /*break*/, 5];
                            case 8:
                                existingMap = existingPlayer.maps.find(function (map) { return map.name === data.map_played; });
                                if (!existingMap) return [3 /*break*/, 10];
                                return [4 /*yield*/, prisma.mapStats.update({
                                        where: { id: existingMap.id },
                                        data: {
                                            gamesPlayed: existingMap.gamesPlayed - 1,
                                            gamesWon: data.match_outcome === "Win"
                                                ? existingMap.gamesWon - 1
                                                : existingMap.gamesWon,
                                            gamesLost: data.match_outcome === "Loss"
                                                ? existingMap.gamesLost - 1
                                                : existingMap.gamesLost,
                                            gamesDrawn: data.match_outcome === "Draw"
                                                ? existingMap.gamesDrawn - 1
                                                : existingMap.gamesDrawn,
                                            totalGamesLength: existingMap.totalGamesLength - data.map_duration_seconds,
                                            roundsWon: existingMap.roundsWon - data.rounds_won,
                                            totalRounds: existingMap.totalRounds - data.total_rounds,
                                        },
                                    })];
                            case 9:
                                _g.sent();
                                _g.label = 10;
                            case 10: return [2 /*return*/];
                        }
                    });
                };
                _i = 0, _a = Object.entries(stats);
                _c.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                _b = _a[_i], steamId = _b[0], data = _b[1];
                return [5 /*yield**/, _loop_1(steamId, data)];
            case 2:
                state_1 = _c.sent();
                if (typeof state_1 === "object")
                    return [2 /*return*/, state_1.value];
                _c.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                console.log(playerName
                    ? "Stats reverted for ".concat(playerName, ".")
                    : "No player name provided for rollback.");
                return [2 /*return*/];
        }
    });
}); };
main()
    .catch(function (e) { return console.error(e); })
    .finally(function () { return prisma.$disconnect(); });
