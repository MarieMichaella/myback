
import Joi from "joi";
import express from "express";
import messageController from "../controllers/messageController.js";

const router = express.Router();

const messageSchema = Joi.object({
  Firstname: Joi.string().required(),
  Lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  Phonenumber: Joi.string()
    .pattern(new RegExp("^[0-9]{10}$")) // assuming you want a 10-digit phone number
    .required(),
  message: Joi.string().required(),
});

router.post("/", (req, res, next) => {
  const { error } = messageSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}, messageController.SendMessage);

export default router;




