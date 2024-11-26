import { Request, Response, NextFunction } from "express";

import { GameModel } from "../models/gameModel.js";
import { GenreModel } from "../models/genreModel.js";
import { DeveloperModel } from "../models/developerModel.js";
import {
    developersSanitizedQueryParams,
    gamesSanitizedQueryParams,
    genresSanitizedQueryParams,
} from "../utils/types.js";
import { AppError, createServerError } from "../utils/errors.js";

const gameModel = new GameModel();
const genreModel = new GenreModel();
const developerModel = new DeveloperModel();

const fetchGames = gameModel.fetchGames;
const fetchGenres = genreModel.fetchGenres;
const fetchGamesByGenreIDs = genreModel.fetchGamesByGenreIDs;
const fetchDevelopers = developerModel.fetchDevelopers;

export const getHomeData = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        /* get data of top 10 most popular games */
        const mostPopularGames = await fetchGames(
            [
                "name",
                "total_rating",
                "cover.url",
                "summary",
                "artworks.url",
                "franchise.name",
            ],
            {
                sort: "total_rating_count",
                direction: "desc",
                limit: "10",
                page: "1",
            } as gamesSanitizedQueryParams
        );

        /* get genre data & games within those genres */
        const genresData: { id: number; name: string }[] = await fetchGenres(
            {
                direction: "asc",
                limit: "10", // get 10 genres
                page: "1",
            } as genresSanitizedQueryParams,
            ["id", "name"]
        );

        const genreIdArr = Array.from(
            genresData,
            (genre: { id: number; name: string }) => genre.id
        );
        const gamesInGenreData = await fetchGamesByGenreIDs(
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
            } as gamesSanitizedQueryParams
        );

        const genresDataSendable = genresData.map((genreData) => {
            return { ...genreData, gameDetails: undefined };
        });

        // then populate array with data of most popular game for each genre
        let curr = genresDataSendable.length;
        for (let i = 0; i < gamesInGenreData.length; i++) {
            const gameData = gamesInGenreData[i];

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
                genresDataSendable[genreIndexInArray].gameDetails = gameData;
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

        /* get developers data for 10 developers */
        const developersData = await fetchDevelopers(["name", "logo.url"], {
            direction: "asc",
            limit: "10",
            page: "1",
        } as developersSanitizedQueryParams);

        res.status(200).send({
            gamesData: mostPopularGames,
            genresData: genresDataSendable,
            developersData: developersData,
        });
    } catch (err) {
        // error has propagated up callstack
        if (err instanceof AppError) {
            return next(err);
        }
        return next(
            createServerError("There was an error retreiving homepage data")
        );
    }
};
