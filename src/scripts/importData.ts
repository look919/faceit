// importData.ts
import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function importData() {
  console.log("Starting data import to PostgreSQL...");

  // Read the exported data
  const exportPath = path.join(process.cwd(), "exports", "sqlite-export.json");
  if (!fs.existsSync(exportPath)) {
    console.error("Export file not found. Run export script first.");
    process.exit(1);
  }

  try {
    const exportedData = JSON.parse(fs.readFileSync(exportPath, "utf8"));
    console.log(`Found ${exportedData.length} players to import`);

  // Import each player with their related data
  for (const player of exportedData) {
    try {
      const { id, weapons, maps, ...playerData } = player;

      console.log(`Importing player: ${playerData.name}`);

    // Check if player exists first
    const existingPlayer = await prisma.playerStats.findUnique({
      where: { id: BigInt(id) }
    });

    let createdPlayer;
    
    if (existingPlayer) {
      console.log(`Player with ID ${id} already exists, updating...`);
      
      // Update existing player
      createdPlayer = await prisma.playerStats.update({
        where: { id: BigInt(id) },
        data: {
          ...playerData,
          weapons: undefined,
          maps: undefined,
        },
      });
    } else {
      // Create new player
      createdPlayer = await prisma.playerStats.create({
        data: {
          id: BigInt(id), // Preserve the original ID
          ...playerData,
          // Clear the relations as we'll create them separately
          weapons: undefined,
          maps: undefined,
        },
      });
    }

    // Create related weapons
    if (weapons && weapons.length > 0) {
      console.log(
        `Importing ${weapons.length} weapons for ${playerData.name}...`
      );

      // Delete existing weapons for this player to avoid duplicates
      await prisma.weaponStats.deleteMany({
        where: {
          playerId: createdPlayer.id,
        }
      });

      // Create new weapon entries
      for (const weapon of weapons) {
        const { id, playerId, ...weaponData } = weapon;

        await prisma.weaponStats.create({
          data: {
            ...weaponData,
            player: {
              connect: { id: createdPlayer.id },
            },
          },
        });
      }
    }

    // Create related maps
    if (maps && maps.length > 0) {
      console.log(`Importing ${maps.length} maps for ${playerData.name}...`);

      // Delete existing maps for this player to avoid duplicates
      await prisma.mapStats.deleteMany({
        where: {
          playerId: createdPlayer.id,
        }
      });

      // Create new map entries
      for (const map of maps) {
        const { id, playerId, ...mapData } = map;

        await prisma.mapStats.create({
          data: {
            ...mapData,
            player: {
              connect: { id: createdPlayer.id },
            },
          },
        });
      }
    }
    } catch (playerError) {
      // TypeScript needs a type check for unknown errors
      if (playerError instanceof Error) {
        console.error(`Error importing player ${player.name || player.id}: ${playerError.message}`);
      } else {
        console.error(`Error importing player ${player.name || player.id}: ${String(playerError)}`);
      }
      // Continue with next player
    }
  }

  console.log("Data import completed successfully!");
  } catch (error) {
    console.error("Error during import:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

importData();
