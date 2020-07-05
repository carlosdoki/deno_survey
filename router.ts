import { Router, RouterContext } from "./deps.ts";
import authController from "./controllers/AuthController.ts";

const router = new Router();

router
  .get("/", (ctx: RouterContext) => {
    ctx.response.body = "Heelo World 1";
  })
  .post("/api/login", authController.login)
  .post("/api/register", authController.register)
  // For survey
  .get("/api/survey");

export default router;
