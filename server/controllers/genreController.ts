import { Request, Response, NextFunction } from "express";

import {
    validateQueryParams,
    sanitizeGenresQueryParams,
} from "./middleware.js";
import { GenreModel } from "../models/genreModel.js";
import { AppError, createServerError } from "../utils/errors.js";

const genreModel = new GenreModel();
const fetchGenres = genreModel.fetchGenres;
const fetchGamesByGenreIDs = genreModel.fetchGamesByGenreIDs;
const fetchGenreById = genreModel.fetchGenreById;
const fetchCompaniesByGenreId = genreModel.fetchCompaniesByGenreId;

export const getGeneralGenresData = [
    validateQueryParams,
    sanitizeGenresQueryParams,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const genresData: { id: number; name: string }[] =
                await fetchGenres(req.sanitizedQueryParams);

            const genreIdArr = Array.from(
                genresData,
                (genre: { id: number; name: string }) => genre.id
            );
            const gamesData = await fetchGamesByGenreIDs(genreIdArr);

            const genresDataSendable = genresData.map((genreData) => {
                return { ...genreData, gameDetails: undefined };
            });

            // then populate array with data of most popular game for each genre
            let curr = genresDataSendable.length;
            for (let i = 0; i < gamesData.length; i++) {
                const gameData = gamesData[i];

                // see if current game being iterated over is part of genre that hasn't had game details added to array
                const genreData: { id: number } | undefined =
                    gameData.genres.find((genre: { id: number }) =>
                        genresDataSendable.find(
                            (genreData) =>
                                genreData.id == genre.id &&
                                genreData.gameDetails === undefined
                        )
                    );

                // if genreData exists, then the genre hasn't had game data added yet
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
            return next(
                createServerError("There was an error retreiving genre data")
            );
        }
    },
];

export const getGenreDataById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const genreId = req.params.id;
        const genreData = await fetchGenreById(genreId);
        const companiesInGenreData = await fetchCompaniesByGenreId(genreId);
        const gamesInGenreData = await fetchGamesByGenreIDs(
            [parseInt(genreId)],
            20
        );

        res.status(200).send({
            genre: genreData,
            gamesInGenre: gamesInGenreData,
            companiesInGenre: companiesInGenreData,
        });
    } catch (err) {
        // error is likely propagated up the callstack from fetchGenreById method
        return next(err);
    }
};
