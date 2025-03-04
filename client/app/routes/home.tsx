import React from "react";
import { Await, NavLink } from "react-router";
import type { Route } from "./+types/home";

import { fetchFromServer } from "@/utils/data-fetching";
import { adjustImageSize, ImageSize } from "@/utils/endpoint_utils";

import {
  indexEndpointSchema,
  type indexEndpointType,
} from "~/common/schemas/endpoints/index-endpoint-schema";

import { DisplayCard } from "@/components/generic/display-card/display-card";
import { Carousel } from "@/components/generic/carousel/carousel";
import { SquareChevronRight } from "lucide-react";

export async function clientLoader() {
  const data = fetchFromServer<indexEndpointType>("/home", {
    parseDataWith: indexEndpointSchema,
  });
  return { data };
}

/* <React.Suspense fallback={<div>Loading...</div>}>
    <Await resolve={nonCriticalData}>
        {(value) => <h3>Non critical value: {value}</h3>}
    </Await>
</React.Suspense>; */

export default function Home({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;

  const carouselFallback = (
    <Carousel>
      {Array.from({ length: 3 }, (_, i) => (
        <DisplayCard
          key={i}
          loading
          data={{
            name: "",
            summary: "",
            totalRating: 0,
            cover: {
              url: "",
            },
          }}
        />
      ))}
    </Carousel>
  );

  return (
    <>
      {/* main text  */}
      <div className="-m-5 mb-5 flex flex-col items-center justify-center gap-4 p-10 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
        <h1 className="text-center text-4xl font-bold text-[#0b69a3] dark:text-dark-accent">
          Ultimate Games Directory
        </h1>
        <p className="text-md text-center text-[#2a88c2] dark:text-dark-accent/80">
          Your ultimate source of information for modern video games!
        </p>
      </div>

      {/* content */}
      <div className="flex flex-col gap-20">
        <div className="flex flex-col items-center">
          <h1 className="mb-3 text-2xl font-bold text-gray-600 italic dark:text-gray-400">
            Games
          </h1>
          <NavLink
            className="mb-3 text-green-600 italic dark:text-blue-400"
            to="/games"
          >
            <SquareChevronRight className="inline" /> View All
          </NavLink>
          <React.Suspense fallback={carouselFallback}>
            <Await resolve={data}>
              {(value) => (
                <Carousel autoPlay>
                  {value.gamesData.map((game, i) => (
                    <DisplayCard
                      key={i}
                      data={{
                        name: game.name,
                        summary: game.summary,
                        totalRating: game.total_rating,
                        cover: {
                          url: adjustImageSize(
                            game.cover.url,
                            ImageSize.Resolution1080,
                          ),
                        },
                      }}
                    />
                  ))}
                </Carousel>
              )}
            </Await>
          </React.Suspense>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="mb-3 text-2xl font-bold text-gray-600 italic dark:text-gray-400">
            Genres
          </h1>
          <NavLink
            className="mb-3 text-green-600 italic dark:text-blue-400"
            to="/genres"
          >
            <SquareChevronRight className="inline" /> View All
          </NavLink>
          <React.Suspense fallback={carouselFallback}>
            <Await resolve={data}>
              {(value) => (
                <Carousel autoPlay>
                  {value.genresData.map((genre, i) => (
                    <DisplayCard
                      key={i}
                      data={{
                        name: genre.name,
                        gameDetails: {
                          name: genre.gameDetails.name,
                          cover: {
                            url: adjustImageSize(
                              genre.gameDetails.cover.url,
                              ImageSize.Resolution1080,
                            ),
                          },
                          summary: genre.gameDetails.summary,
                          totalRating: genre.gameDetails.total_rating,
                        },
                      }}
                    />
                  ))}
                </Carousel>
              )}
            </Await>
          </React.Suspense>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="mb-3 text-2xl font-bold text-gray-600 italic dark:text-gray-400">
            Developers
          </h1>
          <NavLink
            className="mb-3 text-green-600 italic dark:text-blue-400"
            to="/developers"
          >
            <SquareChevronRight className="inline" /> View All
          </NavLink>
          <React.Suspense fallback={carouselFallback}>
            <Await resolve={data}>
              {(value) => (
                <Carousel autoPlay>
                  {value.developersData.map((developer, i) => (
                    <DisplayCard
                      key={i}
                      data={{
                        name: developer.name,
                        logo: {
                          url: adjustImageSize(
                            developer.logo.url,
                            ImageSize.Resolution1080,
                          ),
                        },
                      }}
                    />
                  ))}
                </Carousel>
              )}
            </Await>
          </React.Suspense>
        </div>
      </div>
    </>
  );
}
