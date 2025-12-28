import {Router} from "express";
import checkItemQuantity from "../controllers/checkItemQuantity.controllers.js";
import jwt_VerifyToken from "../middlewares/requiredLogin.middlewares.js";

const router = Router();

router.route("/checkItemQuantity").get(jwt_VerifyToken, checkItemQuantity);

export default router;