import{ Router }from "express";
import controller from "../controllers/User"
import auth from "../controllers/auth"
const router = Router();

router.get('/',auth,controller.index);
router.get('/:id',auth,controller.show)
router.post('/',controller.create)
router.post('/login',controller.login)
export default router;
