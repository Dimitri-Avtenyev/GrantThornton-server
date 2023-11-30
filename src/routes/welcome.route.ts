import express from "express";
import welcomeController from "../controllers/welcome.controller";

const router = express.Router();

router.get("", welcomeController.welcome)

export default router;