import express from "express";
import readinputController from "../controllers/readinput.controller";

const router = express.Router();

router.get('/', readinputController.getInputFile)


export default router; 
