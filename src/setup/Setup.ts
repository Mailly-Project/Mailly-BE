import cp from "child_process";

import { GlobalEnviroments } from "../config/enviroments.config";

export namespace Setup {

  /**
   * Reset the database schema and seed the database with initial data.
   * 
   * @author luke
   * @since 2025-03-01
   */
  export async function schema(): Promise<void> {
    if (GlobalEnviroments.testing === false) {
      throw new Error("Error on Setup.schema(): unable to reset database in non-test mode.");
    }

    const execute = (type: string) => (argv: string) =>
      cp.execSync(
        `npx prisma migrate ${type} --schema=prisma/schema.prisma ${argv}`,
        { stdio: "inherit" },
      );
    execute("reset")("--force");
    execute("dev")("--name init");

    await GlobalEnviroments.prisma.$executeRawUnsafe(
      `GRANT SELECT ON ALL TABLES IN SCHEMA ${GlobalEnviroments.env.POSTGRES_SCHEMA} TO ${GlobalEnviroments.env.POSTGRES_USERNAME_READONLY}`,
    );
  }

  /**
   * Seed the database with initial data.
   * 
   * @author luke
   * @since 2025-03-01
   * 
   * @todo - 2025-03-01(luke): Implement the seeding logic.
   */
  export async function seed(): Promise<void> {}
}