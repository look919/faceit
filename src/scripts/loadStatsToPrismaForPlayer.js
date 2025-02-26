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
var prisma = new client_1.PrismaClient();
var countKda = function (kills, deaths, assists) {
    return (kills + assists * 0.5) / Math.max(1, deaths);
};
// Get player name from command-line arguments
var args = process.argv.slice(2);
var playerNameArg = args.find(function (arg) { return arg.startsWith("--name="); });
var playerName = playerNameArg ? playerNameArg.split("=")[1] : null;
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var rawData, stats, _loop_1, _i, _a, _b, steamId, data;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                rawData = (0, fs_1.readFileSync)("./src/scripts/stats.json", "utf8");
                stats = JSON.parse(rawData);
                _loop_1 = function (steamId, data) {
                    var _loop_2, _d, _e, model;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                if (playerName && data.name !== playerName)
                                    return [2 /*return*/, "continue"]; // Skip players that don't match
                                _loop_2 = function (model) {
                                    var existingPlayer, _g, collectableStats, resultDeterminedStats, countableStats, weaponStats;
                                    return __generator(this, function (_h) {
                                        switch (_h.label) {
                                            case 0:
                                                if (!(model === "playerStats")) return [3 /*break*/, 2];
                                                return [4 /*yield*/, prisma[model].findUnique({
                                                        where: { id: Number(steamId) },
                                                        include: { weapons: model === "playerStats" },
                                                    })];
                                            case 1:
                                                _g = _h.sent();
                                                return [3 /*break*/, 4];
                                            case 2: return [4 /*yield*/, prisma[model].findUnique({ where: { id: Number(steamId) } })];
                                            case 3:
                                                _g = _h.sent();
                                                _h.label = 4;
                                            case 4:
                                                existingPlayer = _g;
                                                collectableStats = {
                                                    gamesPlayed: existingPlayer ? existingPlayer.gamesPlayed + 1 : 1,
                                                    name: data.name,
                                                    kills: existingPlayer ? existingPlayer.kills + data.kills : data.kills,
                                                    deaths: existingPlayer
                                                        ? existingPlayer.deaths + data.deaths
                                                        : data.deaths,
                                                    assists: existingPlayer
                                                        ? existingPlayer.assists + data.assists
                                                        : data.assists,
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
                                                    knifeKills: existingPlayer
                                                        ? existingPlayer.knifeKills + data.knife_kills
                                                        : data.knife_kills,
                                                    knifeDeaths: existingPlayer
                                                        ? existingPlayer.knifeDeaths + data.knife_deaths
                                                        : data.knife_deaths,
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
                                                    kda: countKda(collectableStats.kills, collectableStats.deaths, collectableStats.assists),
                                                    killsPerGame: collectableStats.kills / collectableStats.gamesPlayed,
                                                    deathsPerGame: collectableStats.deaths / collectableStats.gamesPlayed,
                                                    assistsPerGame: collectableStats.assists / collectableStats.gamesPlayed,
                                                    damagePerRound: collectableStats.damage / collectableStats.totalRounds,
                                                    damagePerGame: collectableStats.damage / collectableStats.gamesPlayed,
                                                    headshotPercentage: (collectableStats.headshots / collectableStats.kills) * 100,
                                                    winRatePercentage: (resultDeterminedStats.gamesWon / collectableStats.gamesPlayed) * 100,
                                                    headshotsPerGame: collectableStats.headshots / collectableStats.gamesPlayed,
                                                    roundsWonPerGame: collectableStats.roundsWon / collectableStats.gamesPlayed,
                                                    totalRoundsPerGame: collectableStats.totalRounds / collectableStats.gamesPlayed,
                                                    roundsWinPercentage: (collectableStats.roundsWon / collectableStats.totalRounds) * 100,
                                                };
                                                // 1. Update or create player stats
                                                return [4 /*yield*/, prisma[model].upsert({
                                                        where: { id: Number(steamId) },
                                                        create: __assign(__assign(__assign({ id: Number(steamId) }, collectableStats), resultDeterminedStats), countableStats),
                                                        update: __assign(__assign(__assign({}, collectableStats), resultDeterminedStats), countableStats),
                                                    })];
                                            case 5:
                                                // 1. Update or create player stats
                                                _h.sent();
                                                if (!(model === "playerStats")) return [3 /*break*/, 7];
                                                weaponStats = Object.entries(data.weapons).map(function (_a) {
                                                    var _b;
                                                    var weapon = _a[0], kills = _a[1];
                                                    var existingWeapon = (_b = existingPlayer.weapons) === null || _b === void 0 ? void 0 : _b.find(function (weaponStat) { return weaponStat.name === weapon; });
                                                    if (existingWeapon) {
                                                        // Update existing weapon stats
                                                        return prisma.weaponStats.update({
                                                            where: { id: existingWeapon.id },
                                                            data: {
                                                                totalKills: existingWeapon.totalKills + kills,
                                                                averageKillsPerGame: (existingWeapon.totalKills + kills) /
                                                                    collectableStats.gamesPlayed,
                                                            },
                                                        });
                                                    }
                                                    else {
                                                        // Create new weapon if it doesn't exist
                                                        return prisma.weaponStats.create({
                                                            data: {
                                                                name: weapon,
                                                                totalKills: kills,
                                                                averageKillsPerGame: kills / collectableStats.gamesPlayed,
                                                                playerId: Number(steamId),
                                                            },
                                                        });
                                                    }
                                                });
                                                // 3. Await all weapon updates/insertions
                                                return [4 /*yield*/, Promise.all(weaponStats)];
                                            case 6:
                                                // 3. Await all weapon updates/insertions
                                                _h.sent();
                                                _h.label = 7;
                                            case 7: return [2 /*return*/];
                                        }
                                    });
                                };
                                _d = 0, _e = ["playerStats", "sessionPlayerStats"];
                                _f.label = 1;
                            case 1:
                                if (!(_d < _e.length)) return [3 /*break*/, 4];
                                model = _e[_d];
                                return [5 /*yield**/, _loop_2(model)];
                            case 2:
                                _f.sent();
                                _f.label = 3;
                            case 3:
                                _d++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
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
                console.log(playerName
                    ? "Stats updated for ".concat(playerName, ".")
                    : "Stats updated for all players.");
                return [2 /*return*/];
        }
    });
}); };
main()
    .catch(function (e) { return console.error(e); })
    .finally(function () { return prisma.$disconnect(); });
