import {Router} from "express";
import { addtocart } from "../controllers/cart.controllers.js";
import jwt_TokenVerify from "../middlewares/requiredLogin.middlewares.js";

const router = Router();

router.route("/addToCart").post(jwt_TokenVerify,addtocart)

export default router