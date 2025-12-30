import { Router } from "express";
import multer from "multer";
import { item_post, get_itemByCategory, getItem_ById } from "../controllers/item.controllers.js";
import jwt_TokenVerify from "../middlewares/requiredLogin.middlewares.js";

const router = Router();

const storage = multer.memoryStorage();
const itemPhoto = multer({storage})

router.route("/uploadItem").post(jwt_TokenVerify, itemPhoto.single("productPhoto"),item_post);
router.route("/getItems").get(jwt_TokenVerify, get_itemByCategory);
router.route("/getItem_ById").get(jwt_TokenVerify, getItem_ById);

export default router;