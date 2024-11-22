import { createBadRequestError } from "../utils/errors.js";
import { genresSanitizedQueryParams } from "../utils/types.js";
import { igdbApiClient } from "../services/igdb.js";

export class GenreModel {
    constructor() {}
    fetchGenres = async (opts: genresSanitizedQueryParams) => {
        try {
            const sortBy = opts.sort;
            const sortDirection = opts.direction;
            const page = opts.page;
            const limit = opts.limit;

            const genresReqBody = `
                fields id, name;
                sort ${sortBy} ${sortDirection};
                limit ${limit};
                offset ${(parseInt(page) - 1) * parseInt(limit)};
            `;
            const genresRes = await igdbApiClient.post(
                "/genres",
                genresReqBody
            );

            return genresRes.data;
        } catch (err) {
            throw createBadRequestError(
                "Invalid filter options specified for fetching genres"
            );
        }
    };

    fetchGamesByGenreIDs = async (genreIds: number[]) => {
        try {
            const gamesReqBody = `
                fields name, genres.id, cover.url;
                where genres != null & genres.id = (${genreIds.join(
                    ","
                )}) & category = 0 & cover.url != null;
                sort total_rating desc;
                limit 500;
            `;
            const gamesRes = await igdbApiClient.post("/games", gamesReqBody);

            return gamesRes.data;
        } catch (err) {
            throw createBadRequestError(
                "Unable to fetch games with specified genre IDs"
            );
        }
    };

    fetchGenreById = async (id: string) => {
        try {
            const reqBody = `
                fields name;
                where id = ${id};
            `;
            const res = await igdbApiClient.post("/genres", reqBody);

            return res.data;
        } catch (err) {
            throw createBadRequestError("Specified genre ID is invalid");
        }
    };

    fetchCompaniesByGenreId = async (id: string) => {
        try {
            const reqBody = `
                fields name;
                where id = ${id};
            `;
            const res = await igdbApiClient.post("/genres", reqBody);

            return res.data;
        } catch (err) {
            throw createBadRequestError("Specified genre ID is invalid");
        }
    };
}
