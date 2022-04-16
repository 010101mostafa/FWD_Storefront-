import { Router } from "express";
import controller from "../controllers/Orders";
import auth from "../controllers/auth";
const router = Router();

router.get("/", auth, controller.currentOrder);
router.get("/completed", auth, controller.completedOrders);
export default router;
