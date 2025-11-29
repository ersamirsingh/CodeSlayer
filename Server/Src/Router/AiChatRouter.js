import express from "express";
import authenticateUser from "../Middleware/authenticateUser.js";
import { aiChatController } from "../Controllers/aiChatController.js";

const aiChatRouter = express.Router();

aiChatRouter.post("/chat", authenticateUser, aiChatController);

export default aiChatRouter;
