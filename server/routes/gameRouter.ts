import { Router } from "express";
import {
    getGameById,
    getGames,
    getGamesByGenre,
} from "../controllers/gameController.js";

export const gameRouter = Router();

gameRouter.get("/", getGames);
gameRouter.get("/:id", getGameById);
gameRouter.get("/:genre", getGamesByGenre);