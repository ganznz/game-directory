import { Request, Response, NextFunction } from "express";

import {
    validateQueryParams,
    sanitizeGenresQueryParams,
} from "./middleware.js";
import { GenreModel } from "../models/genreModel.js";
import { AppError, createServerError } from "../utils/errors.js";
import { genresSanitizedQueryParams } from "../utils/types.js";

const genreModel = new GenreModel();
const fetchGenres = genreModel.fetchGenres;
const fetchGamesByGenreIDs = genreModel.fetchGamesByGenreIDs;
const fetchGenreById = genreModel.fetchGenreById;
const fetchGameDevelopersByGenreId = genreModel.fetchGameDevelopersByGenreId;

export const getGeneralGenresData = [
    validateQueryParams,
    sanitizeGenresQueryParams,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const genresData: { id: number; name: string }[] =
                await fetchGenres(
                    req.sanitizedQueryParams as genresSanitizedQueryParams,
                    ["id", "name"]
                );

            const genreIdArr = Array.from(
                genresData,
                (genre: { id: number; name: string }) => genre.id
            );
            const gamesData = await fetchGamesByGenreIDs(
                genreIdArr,
                [
                    "name",
                    "genres",
                    "total_rating",
                    "cover.url",
                    "summary",
                    "artworks.url",
                ],
                {
                    limit: "500",
                    sort: "total_rating",
                    direction: "desc",
                    page: "1",
                }
            );

            const genresDataSendable = genresData.map((genreData) => {
                return { ...genreData, gameDetails: undefined };
            });

            // then populate array with data of most popular game for each genre
            let curr = genresDataSendable.length;
            for (let i = 0; i < gamesData.length; i++) {
                const gameData = gamesData[i];

                // see if current game being iterated over is part of genre that hasn't had game details added to array
                const genreId: number | undefined = gameData.genres.find(
                    (genreId: number) =>
                        genresDataSendable.find(
                            (genreData) =>
                                genreData.id == genreId &&
                                genreData.gameDetails === undefined
                        )
                );

                // if genreId exists, then the genre hasn't had game data added yet
                if (genreId) {
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
        // get genre data
        const genreData = await fetchGenreById(genreId, ["id", "name"]);

        // get data of games in genre
        const gamesInGenreData = await fetchGamesByGenreIDs(
            [parseInt(genreId)],
            [
                "name",
                "total_rating",
                "cover.url",
                "summary",
                "artworks.url",
            ],
            {
                limit: "10",
                sort: "total_rating",
                direction: "desc",
                page: "1",
            }
        );

        // get data of developers in genre
        const gameDevsInGenreData = await fetchGameDevelopersByGenreId(
            genreId,
            ["name", "description", "logo.url"],
            { direction: "asc", limit: "10", page: "1" }
        );

        // send data of genre, games in genre and developers in genre
        res.status(200).send({
            genre: genreData,
            gamesInGenre: gamesInGenreData,
            developersInGenre: gameDevsInGenreData,
        });
    } catch (err) {
        // error is likely propagated up the callstack
        return next(err);
    }
};

export const getGamesByGenre = [
    validateQueryParams,
    sanitizeGenresQueryParams,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const gamesData = await fetchGamesByGenreIDs(
                [parseInt(req.params.id)],
                [
                    "name",
                    "genres.name",
                    "total_rating",
                    "cover.url",
                    "summary",
                    "artworks.url",
                ],
                req.sanitizedQueryParams
            );

            res.status(200).send(gamesData);
        } catch (err) {
            // error is likely propagated up the callstack
            return next(err);
        }
    },
];

export const getDevelopersByGenre = [
    validateQueryParams,
    sanitizeGenresQueryParams,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const developersData = await fetchGameDevelopersByGenreId(
                req.params.id,
                [
                    "name",
                    "description",
                    "logo.url",
                    "developed.name",
                    "developed.artworks.url",
                ],
                req.sanitizedQueryParams as genresSanitizedQueryParams
            );

            res.status(200).send(developersData);
        } catch (err) {
            // error is likely propagated up the callstack
            return next(err);
        }
    },
];
