import { Router } from "express";
import { userExists, hashPass, authVerif } from "../middlewares/authentification.js";
import { SignIn, SignInPage } from "../controllers/signIn.js";
import { LoginPage, Login } from "../controllers/login.js";
import DashboardController from "../controllers/dashboard.js"

const router = Router();

router.get("/", LoginPage);
router.get("/signInPage", SignInPage);
router.get('/dashboard', authVerif, DashboardController);
router.post("/login", hashPass, Login);
router.post("/signIn", hashPass, SignIn)

export default router;
