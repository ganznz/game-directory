import { Router } from "express";

import {
    getGenreDataById,
    getGeneralGenresData,
} from "../controllers/genreController.js";

export const genreRouter = Router();

genreRouter.get("/", getGeneralGenresData);
genreRouter.get("/:id", getGenreDataById);
