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
                await fetchGenres(req.sanitizedQueryParams, ["id", "name"]);

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
                    "franchise.name",
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
        const genreData = await fetchGenreById(genreId, ["id", "name"]);
        const companiesInGenreData = await fetchCompaniesByGenreId(
            genreId,
            [
                "involved_companies.developer",
                "involved_companies.publisher",
                "involved_companies.company.name",
                "involved_companies.company.description",
                "involved_companies.company.logo.url",
            ],
            { direction: "asc", limit: "10", page: "1" }
        );
        const gamesInGenreData = await fetchGamesByGenreIDs(
            [parseInt(genreId)],
            [
                "name",
                "total_rating",
                "cover.url",
                "summary",
                "artworks.url",
                "franchise.name",
            ],
            {
                limit: "10",
                sort: "total_rating",
                direction: "desc",
                page: "1",
            }
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
