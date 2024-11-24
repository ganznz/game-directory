import { Router } from "express";

import {
    getDevelopers,
    getDeveloperById,
    getGamesByDeveloper,
} from "../controllers/developerController.js";

export const developerRouter = Router();

developerRouter.get("/", getDevelopers);
developerRouter.get("/:id", getDeveloperById);
developerRouter.get("/:id/games", getGamesByDeveloper);
