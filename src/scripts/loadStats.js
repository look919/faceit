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
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var rawData, stats, _loop_1, _i, _a, _b, steamId, data;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                rawData = (0, fs_1.readFileSync)("./src/scripts/stats.json", "utf8");
                stats = JSON.parse(rawData);
                _loop_1 = function (steamId, data) {
                    var existingPlayer, lastFiveMatchesOutcome, collectableStats, resultDeterminedStats, countableStats, weaponStats, existingMapForPlayer, mapCollectableStats, mapCountableStats;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, prisma.playerStats.findUnique({
                                    where: { id: Number(steamId) },
                                    include: { weapons: true, maps: true },
                                })];
                            case 1:
                                existingPlayer = _d.sent();
                                lastFiveMatchesOutcome = (existingPlayer === null || existingPlayer === void 0 ? void 0 : existingPlayer.lastFiveMatchesOutcome) || "";
                                collectableStats = {
                                    gamesPlayed: existingPlayer ? existingPlayer.gamesPlayed + 1 : 1,
                                    name: data.name,
                                    isSessionPlayer: data.is_session_player,
                                    avatar: "",
                                    kills: existingPlayer ? existingPlayer.kills + data.kills : data.kills,
                                    deaths: existingPlayer
                                        ? existingPlayer.deaths + data.deaths
                                        : data.deaths,
                                    assists: existingPlayer
                                        ? existingPlayer.assists + data.assists
                                        : data.assists,
                                    killsOnFlash: existingPlayer
                                        ? existingPlayer.killsOnFlash + data.kills_on_flash
                                        : data.kills_on_flash,
                                    killsThroughSmoke: existingPlayer
                                        ? existingPlayer.killsThroughSmoke + data.kills_through_smoke
                                        : data.kills_through_smoke,
                                    killsInJump: existingPlayer
                                        ? existingPlayer.killsInJump + data.kills_in_jump
                                        : data.kills_in_jump,
                                    killsThroughWall: existingPlayer
                                        ? existingPlayer.killsThroughWall + data.kills_through_wall
                                        : data.kills_through_wall,
                                    headshots: existingPlayer
                                        ? existingPlayer.headshots + data.headshots
                                        : data.headshots,
                                    damage: existingPlayer
                                        ? existingPlayer.damage + data.damage
                                        : data.damage,
                                    totalRounds: existingPlayer
                                        ? existingPlayer.totalRounds + data.total_rounds
                                        : data.total_rounds,
                                    roundsWon: existingPlayer
                                        ? existingPlayer.roundsWon + data.rounds_won
                                        : data.rounds_won,
                                    entryFrags: existingPlayer
                                        ? existingPlayer.entryFrags + data.entry_frags
                                        : data.entry_frags,
                                    aces: existingPlayer ? existingPlayer.aces + data.aces : data.aces,
                                    mvps: existingPlayer ? existingPlayer.mvps + data.mvp : data.mvp,
                                    clutches1v1Played: existingPlayer
                                        ? existingPlayer.clutches1v1Played + data.clutches_1v1_played
                                        : data.clutches_1v1_played,
                                    clutches1v1Won: existingPlayer
                                        ? existingPlayer.clutches1v1Won + data.clutches_1v1_won
                                        : data.clutches_1v1_won,
                                    clutches1v2Played: existingPlayer
                                        ? existingPlayer.clutches1v2Played + data.clutches_1v2_played
                                        : data.clutches_1v2_played,
                                    clutches1v2Won: existingPlayer
                                        ? existingPlayer.clutches1v2Won + data.clutches_1v2_won
                                        : data.clutches_1v2_won,
                                    clutches1v3Played: existingPlayer
                                        ? existingPlayer.clutches1v3Played + data.clutches_1v3_played
                                        : data.clutches_1v3_played,
                                    clutches1v3Won: existingPlayer
                                        ? existingPlayer.clutches1v3Won + data.clutches_1v3_won
                                        : data.clutches_1v3_won,
                                    clutches1v4Played: existingPlayer
                                        ? existingPlayer.clutches1v4Played + data.clutches_1v4_played
                                        : data.clutches_1v4_played,
                                    clutches1v4Won: existingPlayer
                                        ? existingPlayer.clutches1v4Won + data.clutches_1v4_won
                                        : data.clutches_1v4_won,
                                    clutches1v5Played: existingPlayer
                                        ? existingPlayer.clutches1v5Played + data.clutches_1v5_played
                                        : data.clutches_1v5_played,
                                    clutches1v5Won: existingPlayer
                                        ? existingPlayer.clutches1v5Won + data.clutches_1v5_won
                                        : data.clutches_1v5_won,
                                    lastFiveMatchesOutcome: "".concat(lastFiveMatchesOutcome.slice(-4)).concat(data.match_outcome === "Win"
                                        ? "W"
                                        : data.match_outcome === "Loss"
                                            ? "L"
                                            : "D"),
                                };
                                resultDeterminedStats = existingPlayer
                                    ? {
                                        gamesWon: data.match_outcome === "Win"
                                            ? existingPlayer.gamesWon + 1
                                            : existingPlayer.gamesWon,
                                        gamesLost: data.match_outcome === "Loss"
                                            ? existingPlayer.gamesLost + 1
                                            : existingPlayer.gamesLost,
                                        gamesDrawn: data.match_outcome === "Draw"
                                            ? existingPlayer.gamesDrawn + 1
                                            : existingPlayer.gamesDrawn,
                                    }
                                    : {
                                        gamesWon: data.match_outcome === "Win" ? 1 : 0,
                                        gamesLost: data.match_outcome === "Loss" ? 1 : 0,
                                        gamesDrawn: data.match_outcome === "Draw" ? 1 : 0,
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
                                return [4 /*yield*/, prisma.playerStats.upsert({
                                        where: { id: Number(steamId) },
                                        create: __assign(__assign(__assign({ id: Number(steamId) }, collectableStats), resultDeterminedStats), countableStats),
                                        update: __assign(__assign(__assign({}, collectableStats), resultDeterminedStats), countableStats),
                                    })];
                            case 2:
                                _d.sent();
                                weaponStats = Object.entries(data.weapons).map(function (_a) {
                                    var weaponName = _a[0], weaponStats = _a[1];
                                    var existingWeapon = ((existingPlayer === null || existingPlayer === void 0 ? void 0 : existingPlayer.weapons) || []).find(function (weaponStat) { return weaponStat.name === weaponName; });
                                    if (existingWeapon) {
                                        // Update existing weapon stats
                                        return prisma.weaponStats.update({
                                            where: { id: existingWeapon.id },
                                            data: {
                                                kills: existingWeapon.kills + weaponStats.kills,
                                                killsPerGame: (existingWeapon.kills + weaponStats.kills) /
                                                    collectableStats.gamesPlayed,
                                                deaths: existingWeapon.deaths + weaponStats.deaths,
                                                deathsPerGame: (existingWeapon.deaths + weaponStats.deaths) /
                                                    collectableStats.gamesPlayed,
                                            },
                                        });
                                    }
                                    else {
                                        // Create new weapon if it doesn't exist
                                        return prisma.weaponStats.create({
                                            data: {
                                                isSessionWeapon: data.is_session_player,
                                                name: weaponName,
                                                kills: weaponStats.kills,
                                                killsPerGame: weaponStats.kills / collectableStats.gamesPlayed,
                                                deaths: weaponStats.deaths,
                                                deathsPerGame: weaponStats.deaths / collectableStats.gamesPlayed,
                                                playerId: Number(steamId),
                                            },
                                        });
                                    }
                                });
                                return [4 /*yield*/, Promise.all(weaponStats)];
                            case 3:
                                _d.sent();
                                existingMapForPlayer = ((existingPlayer === null || existingPlayer === void 0 ? void 0 : existingPlayer.maps) || []).find(function (mapStat) { return mapStat.name === data.map_played; });
                                if (!existingMapForPlayer) return [3 /*break*/, 5];
                                mapCollectableStats = {
                                    gamesPlayed: existingMapForPlayer.gamesPlayed + 1,
                                    gamesWon: data.match_outcome === "Win"
                                        ? existingMapForPlayer.gamesWon + 1
                                        : existingMapForPlayer.gamesWon,
                                    gamesLost: data.match_outcome === "Loss"
                                        ? existingMapForPlayer.gamesLost + 1
                                        : existingMapForPlayer.gamesLost,
                                    gamesDrawn: data.match_outcome === "Draw"
                                        ? existingMapForPlayer.gamesDrawn + 1
                                        : existingMapForPlayer.gamesDrawn,
                                    totalGamesLength: existingMapForPlayer.totalGamesLength + data.map_duration_seconds,
                                    roundsWon: existingMapForPlayer.roundsWon + data.rounds_won,
                                    totalRounds: existingMapForPlayer.totalRounds + data.total_rounds,
                                };
                                mapCountableStats = {
                                    winRatePercentage: (mapCollectableStats.gamesWon / mapCollectableStats.gamesPlayed) *
                                        100,
                                    roundsWonPerGame: mapCollectableStats.roundsWon / mapCollectableStats.gamesPlayed,
                                    roundsPerGame: mapCollectableStats.totalRounds / mapCollectableStats.gamesPlayed,
                                    roundsWinPercentage: (mapCollectableStats.roundsWon / mapCollectableStats.totalRounds) *
                                        100,
                                    averageGameLength: mapCollectableStats.totalGamesLength /
                                        mapCollectableStats.gamesPlayed,
                                };
                                return [4 /*yield*/, prisma.mapStats.update({
                                        where: { id: existingMapForPlayer.id },
                                        data: __assign(__assign({}, mapCollectableStats), mapCountableStats),
                                    })];
                            case 4:
                                _d.sent();
                                return [3 /*break*/, 7];
                            case 5: return [4 /*yield*/, prisma.mapStats.create({
                                    data: {
                                        isSessionMap: data.is_session_player,
                                        name: data.map_played,
                                        gamesPlayed: 1,
                                        gamesWon: data.match_outcome === "Win" ? 1 : 0,
                                        gamesLost: data.match_outcome === "Loss" ? 1 : 0,
                                        gamesDrawn: data.match_outcome === "Draw" ? 1 : 0,
                                        totalGamesLength: data.map_duration_seconds,
                                        roundsWon: data.rounds_won,
                                        totalRounds: data.total_rounds,
                                        winRatePercentage: data.match_outcome === "Win" ? 100 : 0,
                                        roundsWonPerGame: data.rounds_won,
                                        roundsPerGame: data.total_rounds,
                                        roundsWinPercentage: (data.rounds_won / data.total_rounds) * 100,
                                        averageGameLength: data.map_duration_seconds,
                                        playerId: Number(steamId),
                                    },
                                })];
                            case 6:
                                _d.sent();
                                _d.label = 7;
                            case 7: return [2 /*return*/];
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
                _c.sent();
                _c.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                console.log("Stats updated in the database.");
                return [2 /*return*/];
        }
    });
}); };
main()
    .catch(function (e) { return console.error(e); })
    .finally(function () { return prisma.$disconnect(); });
