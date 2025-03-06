import { z } from "zod";

/**
 * Helper schema for a game within a genre.
 * Includes basic game information such as name, summary and artworks.
 */
const gameInGenreSchema = z.object({
    id: z.number(),
    name: z.string(),
    summary: z.string().optional(),
    total_rating: z.number().optional(),
    artworks: z
        .array(
            z.object({
                id: z.number(),
                url: z.string(),
            })
        )
        .optional(),
    cover: z
        .object({
            id: z.number(),
            url: z.string(),
        })
        .optional(),
});

/**
 * Helper schema for a developer within a genre.
 * Contains basic developer information such as name and logo.
 */
const developerInGenreSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    logo: z
        .object({
            id: z.number(),
            url: z.string(),
        })
        .optional(),
});

/**
 * Schema for the ``GET /genres`` endpoint response.
 * Genre information with an included reference game for each genre.
 * @example
 * [
 *   {
 *     id: 1,
 *     name: "Action",
 *     gameDetails: {
 *       id: 123,
 *       cover: {
 *         id: 456,
 *         url: "//images.igdb.com/igdb/image/upload/t_thumb/co123.jpg"
 *       },
 *       genres: [1, 2],
 *       name: "Game Title",
 *       summary: "An exciting action game.",
 *       total_rating: 85.5,
 *       artworks: [
 *         { id: 1, url: "//images.igdb.com/igdb/image/upload/t_thumb/art1.jpg" },
 *         { id: 2, url: "//images.igdb.com/igdb/image/upload/t_thumb/art2.jpg" }
 *       ]
 *     }
 *   },
 *   // ... other genres ...
 * ]
 */
export const getGenresEndpointSchema = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        gameDetails: z
            .object({
                id: z.number(),
                cover: z
                    .object({
                        id: z.number(),
                        url: z.string(),
                    })
                    .optional(),
                genres: z.array(z.number()).optional(),
                name: z.string(),
                summary: z.string().optional(),
                total_rating: z.number().optional(),
                artworks: z
                    .array(
                        z.object({
                            id: z.number(),
                            url: z.string(),
                        })
                    )
                    .optional(),
            })
            .optional(),
    })
);

/** Type definition for the ``GET /genres`` endpoint response */
export type getGenresEndpointType = z.infer<typeof getGenresEndpointSchema>;

/**
 * Schema for the ``GET /genres/:id`` endpoint response.
 * Represents detailed information about a specific genre.
 * @example
 * {
 *   genre: [
 *     {
 *       id: 1,
 *       name: "Action"
 *     }
 *   ],
 *   gamesInGenre: [
 *     {
 *       id: 123,
 *       name: "Game Title",
 *       summary: "An exciting action game.",
 *       total_rating: 85.5
 *     }
 *   ],
 *   developersInGenre: [
 *     {
 *       id: 1,
 *       name: "Developer Name",
 *       description: "A well-known game developer.",
 *       logo: {
 *         id: 1,
 *         url: "//images.igdb.com/igdb/image/upload/t_thumb/logo.jpg"
 *       }
 *     }
 *   ]
 * }
 */
export const getGenreByIdEndpointSchema = z.object({
    genre: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
        })
    ),
    gamesInGenre: z.array(gameInGenreSchema),
    developersInGenre: z.array(developerInGenreSchema),
});

/** Type definition for the ``GET /genres/:id`` endpoint response */
export type getGenreByIdEndpointType = z.infer<
    typeof getGenreByIdEndpointSchema
>;

/**
 * Schema for the ``GET /genres/:id/games`` endpoint response.
 * Contains detailed information about games within a specific genre.
 * @example
 * [
 *   {
 *     id: 123,
 *     name: "Game Title",
 *     summary: "An exciting action game.",
 *     total_rating: 85.5,
 *     genres: [
 *       { id: 1, name: "Action" },
 *       { id: 2, name: "Adventure" }
 *     ]
 *   },
 *   // ... other games ...
 * ]
 */
export const getGamesByGenreEndpointSchema = z.array(
    gameInGenreSchema.extend({
        genres: z
            .array(
                z.object({
                    id: z.number(),
                    name: z.string(),
                })
            )
            .optional(),
    })
);

/** Type definition for the ``GET /genres/:id/games`` endpoint response */
export type getGamesByGenreEndpointType = z.infer<
    typeof getGamesByGenreEndpointSchema
>;

/**
 * Schema for the ``GET /genres/:id/developers`` endpoint response.
 * Contains detailed information about developers within a specific genre.
 * @example
 * [
 *   {
 *     id: 1,
 *     name: "Developer Name",
 *     description: "A well-known game developer.",
 *     logo: {
 *       id: 1,
 *       url: "//images.igdb.com/igdb/image/upload/t_thumb/logo.jpg"
 *     },
 *     developed: [
 *       {
 *         id: 123,
 *         name: "Game Title",
 *         artworks: [
 *           { id: 1, url: "//images.igdb.com/igdb/image/upload/t_thumb/art1.jpg" }
 *         ]
 *       }
 *     ]
 *   },
 *   // ... other developers ...
 * ]
 */
export const getDevelopersByGenreEndpointSchema = z.array(
    z.object({
        id: z.number(),
        name: z.string(),
        description: z.string().optional(),
        logo: z
            .object({
                id: z.number(),
                url: z.string(),
            })
            .optional(),
        developed: z
            .array(
                z.object({
                    id: z.number(),
                    name: z.string(),
                    artworks: z
                        .array(
                            z.object({
                                id: z.number(),
                                url: z.string(),
                            })
                        )
                        .optional(),
                })
            )
            .optional(),
    })
);

/** Type definition for the ``GET /genres/:id/developers`` endpoint response */
export type getDevelopersByGenreEndpointType = z.infer<
    typeof getDevelopersByGenreEndpointSchema
>;
