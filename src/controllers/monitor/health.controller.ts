import core from "@nestia/core";
import { Controller } from "@nestjs/common";

@Controller("monitors/health")
export class MonitorHealthController {
  /**
   * Health check API.
   *
   * @tag Monitor
   *
   * @author luke
   */
  @core.TypedRoute.Get()
  public get(): void {}
}
