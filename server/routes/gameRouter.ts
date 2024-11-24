import { Router } from "express";
import { getGameById, getGames } from "../controllers/gameController.js";

export const gameRouter = Router();

gameRouter.get("/", getGames);
gameRouter.get("/:id", getGameById);
