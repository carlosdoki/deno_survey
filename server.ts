import { Application, Router, RouterContext, createRequire } from "./deps.ts";
import router from "./router.ts";

const app = new Application();
// const require = createRequire(import.meta.url);
// const appdynamics = require("appdynamics");
// appdynamics.profile({
//   controllerHostName: "<controller host name>",
//   controllerPort: 8090,
//   controllerSslEnabled: false, // Set to true if controllerPort is SSL
//   accountName: "<AppDynamics_account_name>",
//   accountAccessKey: "<AppDynamics_account_key>", //required
//   applicationName: "your_app_name",
//   tierName: "choose_a_tier_name",
//   nodeName: "choose_a_node_name",
// });

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on ${secure ? "https://" : "http://"}${
      hostname || "localhost"
    }:${port}`
  );
});
app.addEventListener("error", (e) => {
  console.log(e.error);
});
await app.listen({ port: 8000 });
