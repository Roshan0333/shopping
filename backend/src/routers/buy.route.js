import {Router} from "express";
import {buyItem, cart_BuyItem} from '../controllers/buy.controllers.js';
import jwt_TokenVerify from "../middlewares/requiredLogin.middlewares.js";

const router = Router();

router.route("/buy").post(jwt_TokenVerify, buyItem);
router.route("/cartBuy").post(jwt_TokenVerify, cart_BuyItem);

export default router;