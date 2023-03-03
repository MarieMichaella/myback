import express from 'express';
import logoutController from '../controllers/logoutController.js';

const router = express.Router();

router.post("/:id", logoutController);

export default router;
