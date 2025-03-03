"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countClutchesWinPercentage = exports.countKd = exports.countKda = void 0;
var countKda = function (kills, deaths, assists) {
    return (kills + assists * 0.5) / Math.max(1, deaths);
};
exports.countKda = countKda;
var countKd = function (kills, deaths) {
    return kills / Math.max(1, deaths);
};
exports.countKd = countKd;
var countClutchesWinPercentage = function (played, won) {
    return played ? (won / played) * 100 : 0;
};
exports.countClutchesWinPercentage = countClutchesWinPercentage;
