import { Router } from "express";

import {
    getGeneralGenresData,
    getGenreDataById,
    getGamesByGenre,
    getDevelopersByGenre,
} from "../controllers/genreController.js";

export const genreRouter = Router();

genreRouter.get("/", getGeneralGenresData);
genreRouter.get("/:id", getGenreDataById);
genreRouter.get("/:id/games", getGamesByGenre);
genreRouter.get("/:id/developers", getDevelopersByGenre);
