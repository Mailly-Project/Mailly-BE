import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { GlobalConfig } from "./config/app.config";

export class BackendApplication {
  private application_?: INestApplication;

  public async open(): Promise<void> {
    // MOUNT CONTROLLERS
    this.application_ = await NestFactory.create(AppModule, { logger: false });

    // DO OPEN
    this.application_.enableCors();
    await this.application_.listen(GlobalConfig.API_PORT(), "0.0.0.0");
  }

  public async close(): Promise<void> {
    if (this.application_ === undefined) return;

    // DO CLOSE
    await this.application_.close();
    delete this.application_;
  }
}
