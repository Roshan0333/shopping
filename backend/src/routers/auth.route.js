import {Router} from 'express';
import {emailCheckerforSignUp, emailCheckerforLogin} from  "../middlewares/emailChecker.middlewares.js";
import {SignUp, Login, ForgetPassword} from "../controllers/auth.controllers.js";

const router = Router();

router.route("/Signup").post(emailCheckerforSignUp, SignUp);
router.route("/Login").post(emailCheckerforLogin, Login);
router.route("/ForgetPassword").post(emailCheckerforLogin, ForgetPassword);

export default router;