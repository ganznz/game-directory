import { z } from "zod";

/**
 * Helper schema for basic game information used in the GET /home (index) endpoint.
 * Contains essential game details like artwork, cover, and ratings.
 */
const gamesSchema = z.object({
    id: z.number(),
    artworks: z.array(
        z.object({
            id: z.number(),
            url: z.string(),
        })
    ),
    cover: z.object({
        id: z.number(),
        url: z.string(),
    }),
    name: z.string(),
    summary: z.string(),
    total_rating: z.number(),
});

/**
 * Helper schema for genre information with associated game details.
 * Includes a reference game for each genre.
 */
const genreSchema = z.object({
    id: z.number(),
    name: z.string(),
    gameDetails: z.object({
        id: z.number(),
        cover: z.object({
            id: z.number(),
            url: z.string(),
        }),
        genres: z.array(z.number()),
        name: z.string(),
        summary: z.string(),
        total_rating: z.number(),
    }),
});

/**
 * Helper schema for developer information.
 * Contains basic developer details including logo.
 */
const developerSchema = z.object({
    id: z.number(),
    logo: z.object({
        id: z.number(),
        url: z.string(),
    }),
    name: z.string(),
});

/**
 * Schema for the GET / endpoint response.
 * Contains aggregated data for the homepage including games, genres, and developers.
 * @example
 * {
 *   gamesData: [{ id: 1, name: "Game Title", ... }],
 *   genresData: [{ id: 1, name: "Action", gameDetails: { ... } }],
 *   developersData: [{ id: 1, name: "Developer Studio", logo: { ... } }]
 * }
 */
export const indexEndpointSchema = z.object({
    gamesData: z.array(gamesSchema),
    genresData: z.array(genreSchema),
    developersData: z.array(developerSchema),
});

/** Type definition for the GET / endpoint response */
export type indexEndpointType = z.infer<typeof indexEndpointSchema>;
