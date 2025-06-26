# Database Migration Guide: SQLite to PostgreSQL (NeonDB)

This document outlines the steps to migrate your CS2 Stats data from SQLite to PostgreSQL on NeonDB.

## Step 1: Export Data from SQLite

First, ensure your `.env` file points to your SQLite database:

```
DATABASE_URL="../dev.db"
```

Run the export script to create a JSON backup of your data:

```powershell
npx ts-node src/scripts/exportData.ts
```

or using the JavaScript version:

```powershell
node src/scripts/exportData.js
```

This will create a file at `exports/sqlite-export.json` containing all your data.

## Step 2: Update Prisma Schema for PostgreSQL

Update your `prisma/schema.prisma` file to use PostgreSQL:

```diff
datasource db {
-  provider = "sqlite"
+  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## Step 3: Update .env for NeonDB

Update your `.env` file to use your NeonDB connection string:

```
DATABASE_URL="postgresql://neondb_owner:npg_7lSrhJ6tdzZj@ep-red-cell-a9osefl5-pooler.gwc.azure.neon.tech/neondb?sslmode=require"
# DATABASE_URL="../dev.db"
```

## Step 4: Push Schema to NeonDB

Run Prisma migrate to create the schema in your PostgreSQL database:

```powershell
npx prisma migrate deploy
```

Or, if you prefer to create a new migration:

```powershell
npx prisma migrate dev --name init_postgresql
```

## Step 5: Import Data to PostgreSQL

After migrating the schema, run the import script:

```powershell
npx ts-node src/scripts/importData.ts
```

or using the JavaScript version:

```powershell
node src/scripts/importData.js
```

## Additional Notes

1. Keep the `exports/sqlite-export.json` file as a backup.
2. If the import fails, you can modify the import script as needed.
3. After confirming the migration was successful, you can switch back to using the SQLite database by changing the `.env` file if needed.

## Troubleshooting

- If you encounter "Unique constraint failed" errors during import, your PostgreSQL database might already have data with the same IDs.
- BigInt ID handling: PostgreSQL and JavaScript might have issues with BigInt IDs. The scripts handle this but watch for any related errors.
