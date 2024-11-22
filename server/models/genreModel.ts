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

    fetchGamesByGenreIDs = async (genreIds: number[], limit: number = 500) => {
        try {
            const gamesReqBody = `
                fields name, summary, cover.url;
                where genres != null & genres.id = (${genreIds.join(
                    ","
                )}) & category = 0 & cover.url != null;
                sort total_rating desc;
                limit ${limit};
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
                fields id, name;
                where id = ${id};
            `;
            const res = await igdbApiClient.post("/genres", reqBody);

            return res.data;
        } catch (err) {
            throw createBadRequestError("Specified genre ID is invalid");
        }
    };

    fetchCompaniesByGenreId = async (id: string, limit: number = 500) => {
        try {
            const reqBody = `
                fields involved_companies.developer, involved_companies.publisher, involved_companies.company.name,
                involved_companies.company.description, involved_companies.company.logo.url;
                where genres != null & genres.id = (${id}) & involved_companies.company.logo.url != null;
                limit ${limit};
            `;
            const res = await igdbApiClient.post("/games", reqBody);

            return res.data;
        } catch (err) {
            throw createBadRequestError("Specified genre ID is invalid");
        }
    };
}
