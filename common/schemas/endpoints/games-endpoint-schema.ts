import { z } from "zod";

/**
 * Helper schema for website data containing basic website information.
 */
const websiteSchema = z.object({
    id: z.number(),
    url: z.string(),
});

/**
 * Helper schema for company involvement in game development/publishing.
 * Includes detailed company information such as logo, description, and websites.
 */
const involvedCompanySchema = z.object({
    id: z.number(),
    company: z
        .object({
            id: z.number(),
            name: z.string(),
            description: z.string().optional(),
            logo: z
                .object({
                    id: z.number(),
                    url: z.string(),
                })
                .optional(),
            start_date: z.number().optional(),
            websites: z.array(websiteSchema).optional(),
        })
        .optional(),
    developer: z.boolean().optional(),
    publisher: z.boolean().optional(),
});

/**
 * Helper schema for artwork data containing basic artwork information.
 */
const artworksSchema = z.array(
    z.object({
        id: z.number(),
        url: z.string(),
    })
);

/**
 * Schema for the ``GET /games`` endpoint response.
 * Represents an array of game summaries with basic information.
 * @example
 * [
 *   {
 *     id: 123,
 *     name: "Game Title",
 *     summary: "Game description...",
 *     total_rating: 85.5,
 *     cover: { id: 1, url: "https://..." },
 *     artworks: [{ id: 1, url: "https://..." }]
 *   }
 * ]
 */
export const getGamesEndpointSchema = z.array(
    z.object({
        id: z.number(),
        artworks: artworksSchema.optional(),
        cover: z
            .object({
                id: z.number(),
                url: z.string(),
            })
            .optional(),
        name: z.string(),
        summary: z.string().optional(),
        total_rating: z.number().optional(),
    })
);

/** Type definition for the ``GET /games`` endpoint response */
export type getGamesEndpointType = z.infer<typeof getGamesEndpointSchema>;

/**
 * Schema for the ``GET /games/:id`` endpoint response.
 * Represents detailed information about a specific game.
 * @example
 * {
 *   id: 123,
 *   name: "Game Title",
 *   summary: "Detailed game description...",
 *   total_rating: 85.5,
 *   first_release_date: 1577836800,
 *   artworks: [{ id: 1, url: "https://..." }],
 *   genres: [{ id: 1, name: "Action" }],
 *   involved_companies: [...],
 *   websites: [...]
 * }
 */
export const getGameByIdEndpointSchema = z.object({
    id: z.number(),
    name: z.string(),
    summary: z.string().optional(),
    storyline: z.string().optional(),
    alternative_names: z
        .array(
            z.object({
                id: z.number(),
                name: z.string(),
            })
        )
        .optional(),
    total_rating: z.number().optional(),
    artworks: artworksSchema.optional(),
    first_release_date: z.number().optional(),
    game_engines: z
        .array(
            z.object({
                id: z.number(),
                name: z.string(),
            })
        )
        .optional(),
    genres: z
        .array(
            z.object({
                id: z.number(),
                name: z.string(),
            })
        )
        .optional(),
    involved_companies: z.array(involvedCompanySchema).optional(),
    websites: z.array(websiteSchema).optional(),
});

/** Type definition for the ``GET /games/:id`` endpoint response */
export type getGameByIdEndpointType = z.infer<typeof getGameByIdEndpointSchema>;
