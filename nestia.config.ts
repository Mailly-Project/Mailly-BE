import { INestiaConfig } from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./src/app.module";

export const NESTIA_CONFIG: INestiaConfig = {
  /**
   * Accessor of controller classes.
   *
   * You can specify it within two ways.
   *
   *   - Asynchronous function returning `INestApplication` instance
   *   - Specify the path or directory of controller class files
   */
  input: async () => {
    const app = await NestFactory.create(AppModule);
    return app;
  },

  /**
   * Building `swagger.json` is also possible.
   *
   * If not specified, you can't build the `swagger.json`.
   */
  swagger: {
    output: "dist/swagger.json",
  },

  output: "src/api",
  clone: true,
  distribute: "packages/api",
};
export default NESTIA_CONFIG;
