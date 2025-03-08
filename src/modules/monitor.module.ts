import { Module } from "@nestjs/common";

import { MonitorHealthController } from "../controllers/monitor/health.controller";

@Module({
  controllers: [MonitorHealthController],
})
export class MonitorModule {}
