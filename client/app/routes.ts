import { type RouteConfig, index, route } from "@react-router/dev/routes";
export default [
  index("routes/home.tsx"),

  // games routes
  route("games", "./routes/games/index.tsx"),
  route("games/:gameId", "./routes/games/game.tsx"),

  // genres routes
  route("genres", "./routes/genres/index.tsx"),
  route("genres/:genreId", "./routes/genres/genre.tsx"),
  route("genres/:genreId/games", "./routes/genres/genre-games.tsx"),
  route("genres/:genreId/developers", "./routes/genres/genre-developers.tsx"),

  // developers routes
  route("developers", "./routes/developers/index.tsx"),
  route("developers/:developerId", "./routes/developers/developer.tsx"),
  route(
    "developers/:developerId/games",
    "./routes/developers/developer-games.tsx",
  ),
] satisfies RouteConfig;
