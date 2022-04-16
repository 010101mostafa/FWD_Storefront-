import { Router } from "express";
import controller from "../controllers/Product";
import auth from "../controllers/auth";

const router = Router();

router.get("/", controller.index);
router.get("/topfive", controller.topFive);
router.post("/", auth, controller.create);
router.get("/category/:category", controller.showCategory);
router.get("/:id", controller.show);
export default router;
