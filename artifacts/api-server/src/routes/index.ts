import { Router, type IRouter } from "express";
import healthRouter from "./health";
import heroMediaRouter from "./hero-media";
import brandMediaRouter from "./brand-media";

const router: IRouter = Router();

router.use(healthRouter);
router.use(heroMediaRouter);
router.use(brandMediaRouter);

export default router;
