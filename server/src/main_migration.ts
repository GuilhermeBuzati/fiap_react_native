import { KyselyDatabase } from "#infrastructure/kysely_db.ts";
import { FileMigrationProvider, Migrator } from "kysely";
import fs from "node:fs/promises";
import path from "node:path";

export async function applyMigration(db: KyselyDatabase): Promise<void> {
  const migrationFolder = path.resolve("migrations");
  const provider = new FileMigrationProvider({ fs, path, migrationFolder });
  const migrator = new Migrator({ db, provider });
  const { error } = await migrator.migrateToLatest();
  if (error) {
    console.error(error);
    throw new Error("Could not migrate");
  }
}