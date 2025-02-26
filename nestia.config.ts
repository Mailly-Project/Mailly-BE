import { INestiaConfig } from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./src/app.module";

export const NESTIA_CONFIG: INestiaConfig = {
  input: () => NestFactory.create(AppModule),
  
  swagger: {
    output: "packages/api/swagger.json",
    servers: [
      {
        url: "http://localhost:37001",
        description: "Local Server",
      },
    ],
    beautify: true,
  },

  output: "src/api",
  clone: true,
  distribute: "packages/api",
};
export default NESTIA_CONFIG;
