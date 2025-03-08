import api from "@ORGANIZATION/PROJECT-api";

export async function test_api_monitor_health_check(
  connect: api.IConnection
): Promise<void> {
  await api.functional.monitors.health.get(connect);
}
