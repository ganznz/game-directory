import { Router } from "express";

import { getGenreById, getGenres } from "../controllers/genreController.js";

export const genreRouter = Router();

genreRouter.get("/", getGenres);
genreRouter.get("/:id", getGenreById);
