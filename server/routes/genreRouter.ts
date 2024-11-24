import { Router } from "express";

import {
    getGenreDataById,
    getGeneralGenresData,
    getGamesByGenre
} from "../controllers/genreController.js";

export const genreRouter = Router();

genreRouter.get("/", getGeneralGenresData);
genreRouter.get("/:id", getGenreDataById);
genreRouter.get("/:id/games", getGamesByGenre);
