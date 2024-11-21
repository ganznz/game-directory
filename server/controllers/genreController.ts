import { Request, Response, NextFunction } from "express";

import {
    validateQueryParams,
    sanitizeGenresQueryParams,
} from "./middleware.js";
import { GenreModel } from "../models/genreModel.js";
import { AppError, createServerError } from "../utils/errors.js";

const genreModel = new GenreModel();
const fetchGenres = genreModel.fetchGenres;

export const getGenres = [
    validateQueryParams,
    sanitizeGenresQueryParams,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const genresData = await fetchGenres(req.sanitizedQueryParams);

            // define array for genre data
            const genreDataArr: { id: number; name: string }[] = Array.from(
                genresData.genres
            );

            const genresDataSendable = genreDataArr.map((genreData) => {
                return { ...genreData, gameDetails: undefined };
            });

            // then populate array with data of most popular game for each genre
            let curr = genresDataSendable.length;
            for (let i = 0; i < genresData.games.length; i++) {
                const gameData = genresData.games[i];

                // see if current game being iterated over is part of genre that hasn't had game details added to array
                const genreData: { id: number } | undefined =
                    gameData.genres.find((genre: { id: number }) =>
                        genresDataSendable.find(
                            (genreData) =>
                                genreData.id == genre.id &&
                                genreData.gameDetails === undefined
                        )
                    );

                // if genreData exists, then the genre hasn't had game data added to Map yet, so add it
                if (genreData) {
                    const genreId = genreData?.id;
                    const genreIndexInArray = genresDataSendable.findIndex(
                        (genreData) => genreData.id == genreId
                    );
                    genresDataSendable[genreIndexInArray].gameDetails =
                        gameData;
                    curr--;
                }
                if (curr === 0) break;
            }

            // remove genres that don't have game details if any
            genresDataSendable.forEach((genreData, i) => {
                if (!genreData.gameDetails) {
                    genresDataSendable.splice(i, 1);
                }
            });

            res.status(200).send(genresDataSendable);
        } catch (err) {
            if (err instanceof AppError) {
                return next(err);
            }
            return next(createServerError("Error handling your request"));
        }
    },
];

export const getGenreById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("get genre by id");
};
