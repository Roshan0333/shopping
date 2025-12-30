import {Router} from "express";
import { addtocart, totalItemsInCart } from "../controllers/cart.controllers.js";
import jwt_TokenVerify from "../middlewares/requiredLogin.middlewares.js";

const router = Router();

router.route("/addToCart").post(jwt_TokenVerify,addtocart);
router.route("/totalCartItem").get(jwt_TokenVerify, totalItemsInCart)

export default router