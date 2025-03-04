import path from "path";
import { GlobalEnviroments } from "./enviroments.config";

const EXTENSION = __filename.slice(-2);
if (EXTENSION === "js") require("source-map-support").install();

/**
 * Global configuration for the application.
 *
 * @author luke
 * @since 2025-03-01
 */
export namespace GlobalConfig {
  /**
   * The root directory of the project.
   */
  export const ROOT = (() => {
    const split: string[] = __dirname.split(path.sep);
    return split.at(-1) === "src" && split.at(-2) === "bin"
      ? path.resolve(__dirname, "/../..")
      : path.resolve(__dirname, "/..");
  })();

  /**
   * The port number of the API server.
   */
  export const API_PORT = () => Number(GlobalEnviroments.env.API_PORT);
}

/**
 * @todo - 2024.03.01(luke): 에러 핸들링 설정 추가 필요.
 */
