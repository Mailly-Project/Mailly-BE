import { PrismaClient } from "@prisma/client";

import { GlobalEnvironments } from "../config/environments.config";
import { Setup } from "../setup/Setup";

/**
 * Main function to set up the database and schema.
 *
 * This function performs the following tasks:
 * 1. Configures the database connection using environment variables.
 * 2. Creates a root user with default credentials or provided command-line arguments.
 * 3. Executes SQL commands to:
 *    - Create a new user with the specified username and password.
 *    - Grant the new user the ability to create databases.
 *    - Create a new database owned by the new user.
 *    - Grant all privileges on all tables in the specified schema to the new user.
 * 4. Executes SQL commands to:
 *    - Create a read-only user with the specified username and password.
 *    - Grant the read-only user usage on the specified schema.
 *    - Grant the read-only user select privileges on all tables in the specified schema.
 * 5. Sets the testing environment to true.
 * 6. Calls the `Setup.schema` method to finalize the schema setup.
 *
 * @returns {Promise<void>} A promise that resolves when the setup is complete.
 * @throws {Error} An error if the setup fails.
 *
 * @author luke
 * @since 2025.03.05
 */
async function main(): Promise<void> {
  const config = {
    database: GlobalEnvironments.env.POSTGRES_DATABASE,
    schema: GlobalEnvironments.env.POSTGRES_SCHEMA,
    username: GlobalEnvironments.env.POSTGRES_USERNAME,
    readonlyUsername: GlobalEnvironments.env.POSTGRES_USERNAME_READONLY,
    password: GlobalEnvironments.env.POSTGRES_PASSWORD,
  };

  const root = {
    account: process.argv[2] ?? "postgres",
    password: process.argv[3] ?? "root",
  };

  await execute(
    "postgres",
    root.account,
    root.password,
    `
      CREATE USER ${config.username} WITH ENCRYPTED PASSWORD '${config.password}';
      ALTER ROLE ${config.username} WITH CREATEDB;
      CREATE DATABASE ${config.database} OWNER ${config.username};
    `
  );

//  await execute(
//    config.database,
//    root.account,
//    root.password,
//    `
//      GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA ${config.schema} TO ${config.username};
//
//      CREATE USER ${config.readonlyUsername} WITH ENCRYPTED PASSWORD '${config.password}';
//      GRANT USAGE ON SCHEMA ${config.schema} TO ${config.readonlyUsername};
//      GRANT SELECT ON ALL TABLES IN SCHEMA ${config.schema} TO ${config.readonlyUsername};
//    `
//  );

  GlobalEnvironments.testing = true;
  await Setup.schema();
}

/**
 * Executes a series of SQL queries on a PostgreSQL database using Prisma.
 *
 * @param database - The name of the PostgreSQL database to connect to.
 * @param username - The username for the PostgreSQL database.
 * @param password - The password for the PostgreSQL database.
 * @param script - A string containing SQL queries separated by newlines.
 * @returns A promise that resolves when all queries have been executed.
 *
 * @throws Will log an error if there is an issue with the database connection or query execution.
 *
 * @author luke
 * @since 2025.03.05
 */
async function execute(
  database: string,
  username: string,
  password: string,
  script: string
): Promise<void> {
  try {
    const POSTGRES_HOST = GlobalEnvironments.env.POSTGRES_HOST;
    const POSTGRES_PORT = GlobalEnvironments.env.POSTGRES_PORT;

    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: `postgresql://${username}:${password}@${POSTGRES_HOST}:${POSTGRES_PORT}/${database}`,
        },
      },
    });

    const queries: string[] = script
      .split("\n")
      .map((str) => str.trim())
      .filter((str) => !!str);

    for (const query of queries)
      try {
        await prisma.$queryRawUnsafe(query);
      } catch (e) {
        await prisma.$disconnect();
      }
    await prisma.$disconnect();
  } catch (err) {
    console.log(err);
  }
}

main().catch((exp) => {
  console.log(exp);
  process.exit(-1);
});
