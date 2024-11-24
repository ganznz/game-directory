import { createBadRequestError } from "../utils/errors.js";
import {
    genresSanitizedQueryParams,
    gamesSanitizedQueryParams,
} from "../utils/types.js";
import { igdbApiClient } from "../services/igdb.js";

export class GenreModel {
    constructor() {}
    fetchGenres = async (
        opts: genresSanitizedQueryParams,
        fields: string[]
    ) => {
        try {
            const genresReqBody = `
                fields ${fields.join(",")};
                sort ${opts.sort} ${opts.direction};
                limit ${opts.limit};
                offset ${(parseInt(opts.page) - 1) * parseInt(opts.limit)};
            `;
            const genresRes = await igdbApiClient.post(
                "/genres",
                genresReqBody
            );

            return genresRes.data;
        } catch (err) {
            throw createBadRequestError("Unable to fetch genre data");
        }
    };

    fetchGamesByGenreIDs = async (
        genreIds: number[],
        fields: string[],
        opts: gamesSanitizedQueryParams
    ) => {
        try {
            const gamesReqBody = `
                fields ${fields.join(",")};
                where genres != null & genres.id = (${genreIds.join(
                    ","
                )}) & category = 0 & cover.url != null;
                sort ${opts.sort} ${opts.direction};
                limit ${opts.limit};
            `;
            const gamesRes = await igdbApiClient.post("/games", gamesReqBody);

            return gamesRes.data;
        } catch (err) {
            throw createBadRequestError(
                "Unable to fetch games with specified genre ID(s)"
            );
        }
    };

    fetchGenreById = async (id: string, fields: string[]) => {
        try {
            const reqBody = `
                fields ${fields.join(",")};
                where id = ${id};
            `;
            const res = await igdbApiClient.post("/genres", reqBody);

            return res.data;
        } catch (err) {
            throw createBadRequestError("Specified genre ID is invalid");
        }
    };

    fetchGameDevelopersByGenreId = async (
        id: string,
        fields: string[],
        opts: genresSanitizedQueryParams
    ) => {
        try {
            const reqBody = `
                fields ${fields.join(",")};
                where developed.genres = (${id}) & logo.url != null;
                sort ${opts.sort} ${opts.direction};
                limit ${opts.limit};
            `;
            const res = await igdbApiClient.post("/developers", reqBody);

            return res.data;
        } catch (err) {
            throw createBadRequestError("Specified genre ID is invalid");
        }
    };
}
