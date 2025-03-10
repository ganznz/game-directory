import {
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";

import stylesheet from "./app.css?url";

import { NavBar } from "./components/composite/navbar/navbar";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <NavBar>
        <NavLink to="/" viewTransition className="font-bold md:mr-5 md:p-3">
          ULTIMATE GAMES DIRECTORY
        </NavLink>
        <NavLink
          to="games"
          viewTransition
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? "bold" : "normal",
              transform: isActive ? "translateY(-2px)" : "none",
              transition: "all 0.1s",
            };
          }}
        >
          Games
        </NavLink>
        <NavLink
          to="genres"
          viewTransition
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? "bold" : "normal",
              transform: isActive ? "translateY(-2px)" : "none",
              transition: "all 0.1s",
            };
          }}
        >
          Genres
        </NavLink>
        <NavLink
          to="developers"
          viewTransition
          style={({ isActive }) => {
            return {
              fontWeight: isActive ? "bold" : "normal",
              transform: isActive ? "translateY(-2px)" : "none",
              transition: "all 0.1s",
            };
          }}
        >
          Developers
        </NavLink>
      </NavBar>
      <div className="p-5">
        <Outlet />
      </div>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
