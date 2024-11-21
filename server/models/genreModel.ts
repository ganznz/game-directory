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

            // first get the existing genre id's
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
            const genresData = genresRes.data;
            const genreArr = genresData.map(
                (genreData: Record<string, string>) => genreData.id
            );

            // then get games that match the id's in the genre array
            const gamesReqBody = `
                fields name, genres.id, cover.url;
                where genres != null & genres.id = (${genreArr.join(
                    ","
                )}) & category = 0 & cover.url != null;
                sort total_rating desc;
                limit 500;
            `;
            const gamesRes = await igdbApiClient.post("/games", gamesReqBody);
            const gamesData = gamesRes.data;

            return { games: gamesData, genres: genresData };
        } catch (err) {
            throw createBadRequestError("Invalid filter options");
        }
    };
}
