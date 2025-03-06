import { BackendApplication } from "../src/main";
import { GlobalEnvironments } from "../src/config/environments.config";
import { TestAutomation } from "./TestAutomation";

const main = async (): Promise<void> => {
  GlobalEnvironments.testing = true;
  await TestAutomation.execute({
    open: async () => {
      const backend: BackendApplication = new BackendApplication();
      await backend.open();
      return backend;
    },
    close: (backend) => backend.close(),
  });
};
main().catch((exp) => {
  console.log(exp);
  process.exit(-1);
});
