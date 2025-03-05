import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { Singleton } from "tstl";
import typia from "typia";

/**
 * Global environments for the application.
 *
 * @author luke0408
 * @see https://github.com/samchon/backend/blob/master/src/MyGlobal.ts
 * @since 2025-02-28
 */
export class GlobalEnvironments {
  public static testing: boolean = false;

  public static readonly prisma: PrismaClient = new PrismaClient();

  public static get env(): SystemEnvironments {
    return environments.get();
  }

  /**
   * @return The mode of the application.
   *     - `local`: Local development mode.
   *     - `dev`: Development mode.
   *     - `prod`: Production mode.
   */
  public static get mode(): SystemModeValue {
    return (modeWrapper.value ??= environments.get().MODE);
  }

  /**
   * Set the mode of the application.
   *
   * @param mode The mode of the application.
   *     - `local`: Local development mode.
   *     - `dev`: Development mode.
   *     - `prod`: Production mode.
   */
  public static setMode(mode: typeof GlobalEnvironments.mode): void {
    typia.assert<typeof mode>(mode);
    modeWrapper.value = mode;
  }
}

interface SystemEnvironments {
  MODE: "local" | "dev" | "prod";
  API_PORT: `${number}`;

  POSTGRES_HOST: string;
  POSTGRES_PORT: `${number}`;
  POSTGRES_DATABASE: string;
  POSTGRES_SCHEMA: string;
  POSTGRES_USERNAME: string;
  POSTGRES_USERNAME_READONLY: string;
  POSTGRES_PASSWORD: string;
}

interface SystemMode {
  value?: "local" | "dev" | "prod";
}

type SystemModeValue = "local" | "dev" | "prod";

const modeWrapper: SystemMode = {};

const environments = new Singleton(() => {
  const env = dotenv.config();
  dotenvExpand.expand(env);
  return typia.assert<SystemEnvironments>(process.env);
});
