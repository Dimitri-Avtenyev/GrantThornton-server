import express from "express";
import fileHandlerController from "../controllers/fileInput.controller";

const router = express.Router();

// get for demo purpose
router.get('/', fileHandlerController.getFileLocalDemo);

// upload file
router.post("/", fileHandlerController.getFile);

export default router;
