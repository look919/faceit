package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"

	ex "github.com/markus-wa/demoinfocs-golang/v4/examples"
	demoinfocs "github.com/markus-wa/demoinfocs-golang/v4/pkg/demoinfocs"
	common "github.com/markus-wa/demoinfocs-golang/v4/pkg/demoinfocs/common"
	events "github.com/markus-wa/demoinfocs-golang/v4/pkg/demoinfocs/events"
)

type PlayersTable string

const (
	PlayersTableSeason   PlayersTable = "SEASON"
	PlayersTableSession  PlayersTable = "SESSION"
	PlayersTableAllTime  PlayersTable = "ALL_TIME"
)

type PlayerStats struct {
	PlayersTable       PlayersTable      `json:"players_table"`
	IsSessionPlayer 	bool 			 `json:"is_session_player"`
	Name               string            `json:"name"`
	Kills              int               `json:"kills"`
	Deaths             int               `json:"deaths"`
	Assists            int               `json:"assists"`
	KillsOnFlash       int               `json:"kills_on_flash"`
	KillsThroughWall   int               `json:"kills_through_wall"`
	KillsInJump        int               `json:"kills_in_jump"`
	KillsThroughSmoke  int               `json:"kills_through_smoke"`
	Headshots          int               `json:"headshots"`
	Damage             int               `json:"damage"`
	RoundsWon          int               `json:"rounds_won"`
	TotalRounds        int               `json:"total_rounds"`
	MatchOutcome       string            `json:"match_outcome"`
	MapPlayed          string            `json:"map_played"`          // Map played (single string)
	MapDurationSeconds float64           `json:"map_duration_seconds"` // Duration of the map in seconds
	EntryFrags         int               `json:"entry_frags"`         // Entry frags counter
	EntryDeaths        int               `json:"entry_deaths"`        // Entry deaths counter
	Aces               int               `json:"aces"`               // Aces counter
	MVP                int               `json:"mvp"`                // MVP counter
	Clutches1v1Played  int               `json:"clutches_1v1_played"`  // Clutches 1v1 played
	Clutches1v1Won     int               `json:"clutches_1v1_won"`     // Clutches 1v1 won
	Clutches1v2Played  int               `json:"clutches_1v2_played"`  // Clutches 1v2 played
	Clutches1v2Won     int               `json:"clutches_1v2_won"`     // Clutches 1v2 won
	Clutches1v3Played  int               `json:"clutches_1v3_played"`  // Clutches 1v3 played
	Clutches1v3Won     int               `json:"clutches_1v3_won"`     // Clutches 1v3 won
	Clutches1v4Played  int               `json:"clutches_1v4_played"`  // Clutches 1v4 played
	Clutches1v4Won     int               `json:"clutches_1v4_won"`     // Clutches 1v4 won
	Clutches1v5Played  int               `json:"clutches_1v5_played"`  // Clutches 1v5 played
	Clutches1v5Won     int               `json:"clutches_1v5_won"`     // Clutches 1v5 won
	Weapons            map[string]WeaponStats `json:"weapons"`

	// New grenade-related stats
	GrenadesThrown      GrenadeStats `json:"grenades_thrown"`      // Grenades thrown by type
	EnemiesFlashed      int          `json:"enemies_flashed"`      // Total enemies flashed by this player
	GrenadeDamage       int          `json:"grenade_damage"`       // Total damage done with grenades
	BombPlants          int          `json:"bomb_plants"`          // Number of bombs planted
	BombDefuses         int          `json:"bomb_defuses"`         // Number of bombs defused

	//fields needed to track mvps
	CurrentRoundKills         int `json:"-"`
	CurrentRoundDamage        int `json:"-"`
	CurrentRoundEntryFrags    int `json:"-"`
	Clutches1v2WonCurrentRound int `json:"-"`
    Clutches1v3WonCurrentRound int `json:"-"`
    Clutches1v4WonCurrentRound int `json:"-"`
    Clutches1v5WonCurrentRound int `json:"-"`
	ClutchSituation   int 	`json:"-"`
}

type GrenadeStats struct {
	Flashbangs      int `json:"flashbangs"`      // Flashbangs thrown
	Smokes          int `json:"smokes"`          // Smoke grenades thrown
	HEGrenades      int `json:"he_grenades"`     // HE grenades thrown
	Molotovs        int `json:"molotovs"`        // Molotovs/Incendiaries thrown
	Decoys          int `json:"decoys"`          // Decoy grenades thrown
}

type WeaponStats struct {
	Kills      int `json:"kills"`
	DeathsFrom int `json:"deaths_from"` // Deaths from being killed by this weapon
	DeathsWith int `json:"deaths_with"` // Deaths while having this weapon in inventory
}

var playerStats = make(map[uint64]*PlayerStats)
var totalRounds int
var roundInProgress bool
var matchStarted bool // Track if the match has started
var matchEndTick int // Track the last tick of the match
var firstKillInRound bool // Track if the first kill in the round has occurred
var roundKills map[uint64]int // Track kills per player in the current round
var alivePlayers map[common.Team]int // Track alive players per team

// Track last grenade throw to prevent duplicate counting
type GrenadeThrow struct {
	PlayerID   uint64
	WeaponType common.EquipmentType
	Tick       int
}
var lastGrenadeThrows []GrenadeThrow

// Track last flash to prevent duplicate counting
type FlashEvent struct {
	AttackerID uint64
	VictimID   uint64
	Tick       int
}
var lastFlashEvents []FlashEvent

// Track active grenade throws and their effects to prevent counting same victim multiple times per grenade
type ActiveGrenadeThrow struct {
	AttackerID   uint64
	WeaponType   common.EquipmentType
	ThrowTick    int
	ThrowID      uint64 // Unique ID for this specific throw
	Victims      map[uint64]bool // Set of victim IDs already affected by this throw
}
var activeGrenadeThrows []ActiveGrenadeThrow
var grenadeThrowCounter uint64 // Counter to generate unique throw IDs

// Track last bomb events to prevent duplicate counting
type BombEvent struct {
	PlayerID uint64
	EventType string // "plant" or "defuse"
	Tick     int
}
var lastBombEvents []BombEvent

func main() {
	f, err := os.Open(ex.DemoPathFromArgs())
	if err != nil {
		log.Fatalf("Failed to open demo file: %v", err)
	}
	defer f.Close()

	p := demoinfocs.NewParser(f)
	defer p.Close()

	// Track round start
p.RegisterEventHandler(func(e events.RoundStart) {
	if !matchStarted {
		matchStarted = true
	}
	if !roundInProgress {
		roundInProgress = true
		totalRounds++
		firstKillInRound = true // Reset first kill tracker at the start of each round
		roundKills = make(map[uint64]int) // Reset round kills tracker

		// Initialize alive players count
		alivePlayers = make(map[common.Team]int)
		for _, player := range p.GameState().Participants().Playing() {
			if player.IsAlive() {
				alivePlayers[player.Team]++
			}
		}
	}
})

// Track player damage
p.RegisterEventHandler(func(e events.PlayerHurt) {
	if !roundInProgress || e.Attacker == nil || e.Player == nil || e.Weapon == nil || e.Attacker.SteamID64 == e.Player.SteamID64 {
		return
	}

	initPlayerStats(e.Attacker)

	damage := e.HealthDamage
	if e.HealthDamage > e.Player.Health() {
		damage = e.Player.Health()
	}

	playerStats[e.Attacker.SteamID64].Damage += damage
	playerStats[e.Attacker.SteamID64].CurrentRoundDamage += damage

	// Track grenade damage specifically
	weaponName := e.Weapon.Type.String()
	isGrenade := weaponName == "HE Grenade" || weaponName == "Molotov" || weaponName == "Incendiary Grenade"
	if isGrenade {
		playerStats[e.Attacker.SteamID64].GrenadeDamage += damage
	}
})

// Track kills
p.RegisterEventHandler(func(e events.Kill) {
	// Skip if the round is not in progress or during warmup
	if !roundInProgress || p.GameState().IsWarmupPeriod() || e.Killer == nil || e.Victim == nil || e.Weapon == nil {
		return
	}

	killerID := e.Killer.SteamID64
	victimID := e.Victim.SteamID64

	initPlayerStats(e.Killer)
	initPlayerStats(e.Victim)

	// Track kills and deaths from weapons
	weaponCategory := classifyWeapon(e.Weapon)
	playerStats[killerID].Weapons[weaponCategory] = WeaponStats{
		Kills:      playerStats[killerID].Weapons[weaponCategory].Kills + 1,
		DeathsFrom: playerStats[killerID].Weapons[weaponCategory].DeathsFrom,
		DeathsWith: playerStats[killerID].Weapons[weaponCategory].DeathsWith,
	}

	// Track victim's death from the weapon that killed them
	playerStats[victimID].Weapons[weaponCategory] = WeaponStats{
		Kills:      playerStats[victimID].Weapons[weaponCategory].Kills,
		DeathsFrom: playerStats[victimID].Weapons[weaponCategory].DeathsFrom + 1,
		DeathsWith: playerStats[victimID].Weapons[weaponCategory].DeathsWith,
	}

	// Track victim's death with their primary weapon in inventory
	victimWeaponCategory := classifyWeapon(e.Victim.ActiveWeapon())
	currentStats := playerStats[victimID].Weapons[victimWeaponCategory]
	playerStats[victimID].Weapons[victimWeaponCategory] = WeaponStats{
		Kills:      currentStats.Kills,
		DeathsFrom: currentStats.DeathsFrom,
		DeathsWith: currentStats.DeathsWith + 1,
	}

	playerStats[killerID].Kills++
	playerStats[killerID].CurrentRoundKills++
	playerStats[victimID].Deaths++

	// Track headshots
	if e.IsHeadshot {
		playerStats[killerID].Headshots++
	}

	// Track kills through walls
	if e.PenetratedObjects > 0 {
		playerStats[killerID].KillsThroughWall++
	}

	// Track kills in jump
	if e.Killer.IsAirborne() {
		playerStats[killerID].KillsInJump++
	}

	// Track kills on flash
	if e.AttackerBlind {
		playerStats[killerID].KillsOnFlash++
	}

	// Track kills through smoke
	if e.ThroughSmoke {
		playerStats[killerID].KillsThroughSmoke++
	}

	// Track entry frags
	if firstKillInRound {
		playerStats[killerID].EntryFrags++
		playerStats[killerID].CurrentRoundEntryFrags++
		playerStats[victimID].EntryDeaths++
		firstKillInRound = false // Mark that the first kill has occurred
	}

	// Track kills in the current round
	roundKills[killerID]++

	// Check for Aces (5 kills in a round)
	if roundKills[killerID] == 5 {
		playerStats[killerID].Aces++
	}

	// Update alive players count
	alivePlayers[e.Victim.Team]--

	// Check for clutch situations on the victim's team
	victimOpponentTeam := common.TeamTerrorists
	if e.Victim.Team == common.TeamTerrorists {
		victimOpponentTeam = common.TeamCounterTerrorists
	}

	// If the victim's team has fewer players than the opponent team, it's a clutch situation
	if alivePlayers[e.Victim.Team] == 1 {
		for _, player := range p.GameState().Participants().Playing() {
			if player.Team == e.Victim.Team && player.IsAlive() && player.SteamID64 != victimID {
				playerID := player.SteamID64
				initPlayerStats(player)

				// Check if this is the first time the player is in a clutch situation
				if playerStats[playerID].ClutchSituation == -1 {
					// Determine the number of victimOpponentTeam
					aliveOpponents := alivePlayers[victimOpponentTeam]

					// Record the clutch situation
					playerStats[playerID].ClutchSituation = aliveOpponents

					// Determine the clutch situation based on the initial number of opponents
					switch aliveOpponents {
					case 1:
						playerStats[playerID].Clutches1v1Played++
					case 2:
						playerStats[playerID].Clutches1v2Played++
					case 3:
						playerStats[playerID].Clutches1v3Played++
					case 4:
						playerStats[playerID].Clutches1v4Played++
					case 5:
						playerStats[playerID].Clutches1v5Played++
					}
				}
			}
		}
	}

	// Assists
	if e.Assister != nil {
		assisterID := e.Assister.SteamID64
		initPlayerStats(e.Assister)
		playerStats[assisterID].Assists++
	}
})

// Track round end
p.RegisterEventHandler(func(e events.RoundEnd) {
	if !roundInProgress {
		return
	}
	roundInProgress = false

	// Update match end tick
	matchEndTick = p.GameState().IngameTick()

	// Variables to track MVP
	var (
		mvpPlayerID      uint64
		maxKills         int
		maxDamage        int
		hasEntryFrag     bool
		hasClutchWin     bool
	)

	// Determine the winning team
	winningTeam := e.Winner

	// Update rounds won for the winning team and track clutch wins
	for _, player := range p.GameState().Participants().Playing() {
		playerID := player.SteamID64
		initPlayerStats(player)

		if player.Team == winningTeam {
			playerStats[playerID].RoundsWon++

			// Check if the player was in a clutch situation and won
			if playerStats[playerID].ClutchSituation != -1 {
				switch playerStats[playerID].ClutchSituation {
				case 1:
					playerStats[playerID].Clutches1v1Won++
				case 2:
					playerStats[playerID].Clutches1v2Won++
					playerStats[playerID].Clutches1v2WonCurrentRound++
				case 3:
					playerStats[playerID].Clutches1v3Won++
					playerStats[playerID].Clutches1v3WonCurrentRound++
				case 4:
					playerStats[playerID].Clutches1v4Won++
					playerStats[playerID].Clutches1v4WonCurrentRound++
				case 5:
					playerStats[playerID].Clutches1v5Won++
					playerStats[playerID].Clutches1v5WonCurrentRound++
				}
			}
		}
	}

	// Determine MVP based on the criteria
	for playerID, stats := range playerStats {
		// Find the player in the list of playing participants
		var player *common.Player
		for _, p := range p.GameState().Participants().Playing() {
			if p.SteamID64 == playerID {
				player = p
				break
			}
		}

		// Skip players not on the winning team
		if player == nil || player.Team != winningTeam {
			continue
		}

		// Check if the player won at least a 1v2 clutch in the current round
		if stats.Clutches1v2WonCurrentRound > 0 || stats.Clutches1v3WonCurrentRound > 0 || stats.Clutches1v4WonCurrentRound > 0 || stats.Clutches1v5WonCurrentRound > 0 {
			mvpPlayerID = playerID
			hasClutchWin = true
			break // Clutch winner is automatically MVP
		}

		// If no clutch winner, check for most kills
		if !hasClutchWin {
			if stats.CurrentRoundKills > maxKills {
				mvpPlayerID = playerID
				maxKills = stats.CurrentRoundKills
				maxDamage = stats.CurrentRoundDamage
				hasEntryFrag = stats.CurrentRoundEntryFrags > 0
			} else if stats.CurrentRoundKills == maxKills {
				// If kills are equal, check for entry frag
				if stats.CurrentRoundEntryFrags > 0 && !hasEntryFrag {
					mvpPlayerID = playerID
					maxDamage = stats.CurrentRoundDamage
					hasEntryFrag = true
				} else if stats.CurrentRoundDamage > maxDamage {
					// If no entry frag, check for damage
					mvpPlayerID = playerID
					maxDamage = stats.CurrentRoundDamage
				}
			}
		}
	}

	// Increment MVP counter for the MVP player
	if mvpPlayerID != 0 {
		playerStats[mvpPlayerID].MVP++
	}

	// Reset round-specific statistics
	for playerID := range playerStats {
		playerStats[playerID].CurrentRoundKills = 0
		playerStats[playerID].CurrentRoundDamage = 0
		playerStats[playerID].CurrentRoundEntryFrags = 0
		playerStats[playerID].Clutches1v2WonCurrentRound = 0
		playerStats[playerID].Clutches1v3WonCurrentRound = 0
		playerStats[playerID].Clutches1v4WonCurrentRound = 0
		playerStats[playerID].Clutches1v5WonCurrentRound = 0
		playerStats[playerID].ClutchSituation = -1
	}

	// Reset round kills tracker
	roundKills = make(map[uint64]int)
})

// Track grenade throws using weapon fire events with proper filtering
p.RegisterEventHandler(func(e events.WeaponFire) {
	if !roundInProgress || e.Shooter == nil || e.Weapon == nil {
		return
	}

	initPlayerStats(e.Shooter)
	shooterID := e.Shooter.SteamID64

	// Only count actual grenade throws, not gun shots
	weaponType := e.Weapon.Type
	if !isGrenadeWeapon(weaponType) {
		return
	}

	currentTick := p.GameState().IngameTick()
	
	// Check if we already counted this grenade throw recently (within 32 ticks = ~0.5 seconds)
	for i := len(lastGrenadeThrows) - 1; i >= 0; i-- {
		throw := lastGrenadeThrows[i]
		if currentTick - throw.Tick > 32 {
			// Remove old entries
			lastGrenadeThrows = lastGrenadeThrows[i+1:]
			break
		}
		if throw.PlayerID == shooterID && throw.WeaponType == weaponType && currentTick - throw.Tick <= 32 {
			// Already counted this grenade throw
			return
		}
	}

	// Record this grenade throw
	lastGrenadeThrows = append(lastGrenadeThrows, GrenadeThrow{
		PlayerID:   shooterID,
		WeaponType: weaponType,
		Tick:       currentTick,
	})

	// Track grenades by type
	switch weaponType {
	case common.EqFlash:
		playerStats[shooterID].GrenadesThrown.Flashbangs++
	case common.EqSmoke:
		playerStats[shooterID].GrenadesThrown.Smokes++
	case common.EqHE:
		playerStats[shooterID].GrenadesThrown.HEGrenades++
	case common.EqMolotov, common.EqIncendiary:
		playerStats[shooterID].GrenadesThrown.Molotovs++
	case common.EqDecoy:
		playerStats[shooterID].GrenadesThrown.Decoys++
	}

	// Record this grenade throw for effect tracking (all grenade types)
	grenadeThrowCounter++
	activeGrenadeThrows = append(activeGrenadeThrows, ActiveGrenadeThrow{
		AttackerID:  shooterID,
		WeaponType:  weaponType,
		ThrowTick:   currentTick,
		ThrowID:     grenadeThrowCounter,
		Victims:     make(map[uint64]bool),
	})
})

// Track player flashed events
p.RegisterEventHandler(func(e events.PlayerFlashed) {
	if !roundInProgress || e.Attacker == nil || e.Player == nil {
		return
	}

	// Don't count self-flashes
	if e.Attacker.SteamID64 == e.Player.SteamID64 {
		return
	}

	// Only count enemy flashes
	if e.Attacker.Team != e.Player.Team {
		initPlayerStats(e.Attacker)
		
		attackerID := e.Attacker.SteamID64
		victimID := e.Player.SteamID64
		currentTick := p.GameState().IngameTick()
		
		// Find the most recent flashbang throw from this attacker (within reasonable time window)
		var matchingThrow *ActiveGrenadeThrow
		for i := len(activeGrenadeThrows) - 1; i >= 0; i-- {
			throw := &activeGrenadeThrows[i]
			// Clean up old throws (older than 10 seconds = ~640 ticks)
			if currentTick - throw.ThrowTick > 640 {
				activeGrenadeThrows = activeGrenadeThrows[i+1:]
				break
			}
			// Find matching flashbang throw from same attacker within last 5 seconds (~320 ticks)
			if throw.AttackerID == attackerID && 
			   throw.WeaponType == common.EqFlash && 
			   currentTick - throw.ThrowTick <= 320 {
				matchingThrow = throw
				break
			}
		}
		
		// Only count if we haven't already counted this victim for this specific flashbang throw
		if matchingThrow != nil {
			if !matchingThrow.Victims[victimID] {
				matchingThrow.Victims[victimID] = true
				playerStats[attackerID].EnemiesFlashed++
			}
		} else {
			// Fallback: if no matching throw found, use old method with short cooldown
			for i := len(lastFlashEvents) - 1; i >= 0; i-- {
				flash := lastFlashEvents[i]
				if currentTick - flash.Tick > 16 {
					lastFlashEvents = lastFlashEvents[i+1:]
					break
				}
				if flash.AttackerID == attackerID && flash.VictimID == victimID && currentTick - flash.Tick <= 16 {
					return // Already counted
				}
			}
			
			lastFlashEvents = append(lastFlashEvents, FlashEvent{
				AttackerID: attackerID,
				VictimID:   victimID,
				Tick:       currentTick,
			})
			
			playerStats[attackerID].EnemiesFlashed++
		}
	}
})

// Track bomb plants
p.RegisterEventHandler(func(e events.BombPlanted) {
	if !roundInProgress || e.Player == nil {
		return
	}

	initPlayerStats(e.Player)
	playerID := e.Player.SteamID64
	currentTick := p.GameState().IngameTick()
	
	// Check if we already counted this bomb plant recently (within 32 ticks = ~0.5 seconds)
	for i := len(lastBombEvents) - 1; i >= 0; i-- {
		bombEvent := lastBombEvents[i]
		if currentTick - bombEvent.Tick > 32 {
			// Remove old entries
			lastBombEvents = lastBombEvents[i+1:]
			break
		}
		if bombEvent.PlayerID == playerID && bombEvent.EventType == "plant" && currentTick - bombEvent.Tick <= 32 {
			// Already counted this bomb plant
			return
		}
	}

	// Record this bomb plant event
	lastBombEvents = append(lastBombEvents, BombEvent{
		PlayerID:  playerID,
		EventType: "plant",
		Tick:      currentTick,
	})

	playerStats[playerID].BombPlants++
})

// Track bomb defuses
p.RegisterEventHandler(func(e events.BombDefused) {
	if !roundInProgress || e.Player == nil {
		return
	}

	initPlayerStats(e.Player)
	playerID := e.Player.SteamID64
	currentTick := p.GameState().IngameTick()
	
	// Check if we already counted this bomb defuse recently (within 32 ticks = ~0.5 seconds)
	for i := len(lastBombEvents) - 1; i >= 0; i-- {
		bombEvent := lastBombEvents[i]
		if currentTick - bombEvent.Tick > 32 {
			// Remove old entries
			lastBombEvents = lastBombEvents[i+1:]
			break
		}
		if bombEvent.PlayerID == playerID && bombEvent.EventType == "defuse" && currentTick - bombEvent.Tick <= 32 {
			// Already counted this bomb defuse
			return
		}
	}

	// Record this bomb defuse event
	lastBombEvents = append(lastBombEvents, BombEvent{
		PlayerID:  playerID,
		EventType: "defuse",
		Tick:      currentTick,
	})

	playerStats[playerID].BombDefuses++
})

	// Parse demo
	err = p.ParseToEnd()
	if err != nil {
		log.Fatalf("Failed to parse demo: %v", err)
	}

	// Calculate match duration in seconds using in-game tick rate
	tickRate := p.TickRate()
	matchDurationSeconds := float64(matchEndTick) / float64(tickRate)

	// Assign match outcome, map name, and duration to each player
	for _, stats := range playerStats {
		stats.TotalRounds = totalRounds
		if stats.RoundsWon > totalRounds/2 {
			stats.MatchOutcome = "Win"
		} else if stats.RoundsWon == totalRounds/2 {
			stats.MatchOutcome = "Draw"
		} else {
			stats.MatchOutcome = "Loss"
		}

		// Add map name and duration
		stats.MapPlayed = p.Header().MapName // Assign the map name directly
		stats.MapDurationSeconds = matchDurationSeconds
	}

	// Save data to JSON
	saveStatsToFile(playerStats)
}


// Helper functions (initPlayerStats, saveStatsToFile, checkError, classifyWeapon) remain the same

func initPlayerStats(p *common.Player) {
	if p == nil {
		return
	}
	if _, exists := playerStats[p.SteamID64]; !exists {
		// Ensure every weapon is included by exact name
		weapons := make(map[string]WeaponStats)
		weaponsList := []string{
			"knife", "zeus", "heGrenade", "molotov", "otherGrenade",
			"glock", "usp", "p2000", "deagle", "tec9", "cz75", "fiveSeven", "dualBerettas",
			"p250", "revolver", "mac10", "mp9", "p90", "bizon", "ump", "mp5", "mp7",
			"nova", "xm1014", "mag7", "sawedOff", "negev", "m249", "ak47", "m4a4",
			"m4a1s", "awp", "scout", "famas", "galil", "scar20", "g3sg1", "aug", "sg553", "other",
		}
		for _, weapon := range weaponsList {
			weapons[weapon] = WeaponStats{Kills: 0, DeathsFrom: 0, DeathsWith: 0}
		}

		playerStats[p.SteamID64] = &PlayerStats{
			Name:             p.Name,
			Weapons:          weapons,
			ClutchSituation:  -1, // Initialize to -1 (no clutch situation)
			GrenadesThrown:   GrenadeStats{}, // Initialize grenade stats
			EnemiesFlashed:   0,
			GrenadeDamage:    0,
			BombPlants:       0,
			BombDefuses:      0,
		}
	}
}

func saveStatsToFile(data map[uint64]*PlayerStats) {
	// Create a new map to hold the original and duplicated player stats
	extendedData := make(map[uint64]*PlayerStats)

	// Define a large offset to ensure no overlap with existing Steam IDs
	const offset uint64 = 1000000000000 // 1 trillion

	for steamID, stats := range data {
		// Create three copies of the player's stats
		// 1. SEASON (original)
		seasonStats := *stats
		seasonStats.PlayersTable = PlayersTableSeason
		extendedData[steamID] = &seasonStats

		// 2. SESSION (first copy)
		sessionStats := *stats
		sessionStats.PlayersTable = PlayersTableSession
		extendedData[steamID + offset] = &sessionStats

		// 3. ALL_TIME (second copy)
		allTimeStats := *stats
		allTimeStats.PlayersTable = PlayersTableAllTime
		extendedData[steamID + 2 * offset] = &allTimeStats
	}

	file, err := os.Create(`Local path to: \src\scripts\stats.json`)
	checkError(err)
	defer file.Close()

	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ")
	err = encoder.Encode(extendedData)
	checkError(err)

	fmt.Println("Saved player stats to stats.json")
}

// Error handling
func checkError(err error) {
	if err != nil {
		log.Printf("Error: %v", err)
	}
}

// Helper function to check if a weapon is a grenade
func isGrenadeWeapon(weaponType common.EquipmentType) bool {
	switch weaponType {
	case common.EqFlash, common.EqSmoke, common.EqHE, common.EqMolotov, common.EqIncendiary, common.EqDecoy:
		return true
	default:
		return false
	}
}

func classifyWeapon(w *common.Equipment) string {
	if w == nil {
		return "unknown"
	}

	name := w.Type.String()
	switch {
	case name == "Knife":
		return "knife"
	case name == "Zeus x27":
		return "zeus"
	case name == "HE Grenade":
		return "heGrenade"
	case name == "Molotov" || name == "Incendiary Grenade":
		return "molotov"
	case name == "Flashbang" || name == "Smoke Grenade" || name == "Decoy Grenade":
		return "otherGrenade"
	case name == "Glock-18":
		return "glock"
	case name == "USP-S":
		return "usp"
	case name == "P2000":
		return "p2000"
	case name == "Desert Eagle":
		return "deagle"
	case name == "Tec-9":
		return "tec9"
	case name == "CZ75 Auto":
		return "cz75"
	case name == "Five-SeveN":
		return "fiveSeven"
	case name == "Dual Berettas":
		return "dualBerettas"
	case name == "P250":
		return "p250"
	case name == "R8 Revolver":
		return "revolver"
	case name == "MAC-10":
		return "mac10"
	case name == "MP9":
		return "mp9"
	case name == "P90":
		return "p90"
	case name == "PP-19 Bizon":
		return "bizon"
	case name == "UMP-45":
		return "ump"
	case name == "MP5-SD":
		return "mp5"
	case name == "MP7":
		return "mp7"
	case name == "Nova":
		return "nova"
	case name == "XM1014":
		return "xm1014"
	case name == "MAG-7":
		return "mag7"
	case name == "Sawed-Off":
		return "sawedOff"
	case name == "Negev":
		return "negev"
	case name == "M249":
		return "m249"
	case name == "AK-47":
		return "ak47"
	case name == "M4A4":
		return "m4a4"
	case name == "M4A1":
		return "m4a1s"
	case name == "AWP":
		return "awp"
	case name == "SSG 08":
		return "scout"
	case name == "FAMAS":
		return "famas"
	case name == "Galil AR":
		return "galil"
	case name == "SCAR-20":
		return "scar20"
	case name == "G3SG1":
		return "g3sg1"
	case name == "AUG":
		return "AUG"
	case name == "SG 553":
		return "SG 553"
	default:
		return "other"
	}
}
