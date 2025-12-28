import { Router } from "express";
import multer from "multer";
import { item_post, get_itemByCategory } from "../controllers/item.controllers.js";
import jwt_TokenVerify from "../middlewares/requiredLogin.middlewares.js";

const router = Router();

const storage = multer.memoryStorage();
const itemPhoto = multer({storage})

router.route("/uploadItem").post(jwt_TokenVerify, itemPhoto.single("productPhoto"),item_post);
router.route("/getItems").get(jwt_TokenVerify, get_itemByCategory);

export default router;