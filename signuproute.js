import express from "express";
import signupController from "./signupController.js";

const router = express.Router();



router.post("/", signupController )

export default router
