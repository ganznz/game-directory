import React, { useState } from "react";
import { Await, NavLink } from "react-router";
import type { Route } from "./+types/game";
import { twMerge } from "tailwind-merge";

import { fetchFromServer } from "@/utils/data-fetching";
import { adjustImageSize, ImageSize } from "@/utils/endpoint_utils";

import {
  getGameByIdEndpointSchema,
  type getGameByIdEndpointType,
} from "~/common/schemas/endpoints/games-endpoint-schema";

import { Carousel } from "@/components/generic/carousel/carousel";
import { PopoutImage } from "@/components/generic/popout-image/popout-image";

import { LoaderCircle, Star, SquareChevronRight } from "lucide-react";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const data = fetchFromServer<getGameByIdEndpointType>(
    `/games/${params.gameId}`,
    {
      parseDataWith: getGameByIdEndpointSchema,
    },
  );

  return { data };
}

export default function Game({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;

  const [imgPoppedOut, setImgPoppedOut] = useState(false);

  const fallback = (
    <div className="flex h-screen w-screen items-center justify-center">
      <LoaderCircle className="animate-spin" />
    </div>
  );

  return (
    <React.Suspense fallback={fallback}>
      <Await resolve={data}>
        {(gameData) => {
          return (
            <div className="-mx-5 flex flex-col items-center gap-15">
              <div className="mt-5 -mb-7 flex flex-col items-center justify-center gap-4 md:flex-row">
                <h1 className="flex items-center text-center text-2xl font-bold text-[#0b69a3] dark:text-dark-accent">
                  {gameData.name}
                </h1>
                <p className="flex items-center gap-2 text-lg font-bold text-[#ddaf3b]">
                  <Star
                    size={35}
                    fill="#ddaf3b"
                    color="#ddaf3b"
                    className="inline"
                  />
                  {gameData.total_rating &&
                    `${Math.round(gameData.total_rating)} / 100`}
                </p>
              </div>

              {/* game art */}
              {gameData.artworks && (
                <Carousel
                  showIndicators={false}
                  autoPlay={!imgPoppedOut}
                  className="mx-5 md:w-3/4 lg:w-1/2 2xl:w-[600px]"
                >
                  {gameData.artworks.map((artwork, i) => (
                    <PopoutImage
                      poppedOut={false}
                      rotateCardEffect
                      onPoppedOutChange={(isPoppedOut) =>
                        setImgPoppedOut(isPoppedOut)
                      }
                      className="h-[300px] rounded-lg"
                      key={artwork.id}
                      src={adjustImageSize(
                        artwork.url,
                        ImageSize.Resolution1080,
                      )}
                      alt={`${gameData.name} artwork ${i}`}
                      opts={{
                        expandedBacksplashColourLight: "bg-light-primary",
                        expandedBacksplashColourDark: "dark:bg-dark-bg",
                      }}
                    />
                  ))}
                </Carousel>
              )}

              {/* game storyline / summary */}
              <div className="-m-5 flex w-full justify-center bg-light-accent/40 p-10 text-left dark:bg-dark-accent/20">
                <p className="text-sm text-blue-800 italic md:w-[50%] dark:text-[#cbad60]">
                  {gameData.storyline}
                </p>
              </div>

              {/* associated companies information */}
              <div className="flex w-full flex-col items-center">
                <h1 className="mx-5 my-5 text-xl font-bold text-gray-700 dark:text-gray-300">
                  Associated Companies
                </h1>
                {gameData.involved_companies?.map((companyData, i) => (
                  <div
                    key={companyData.id}
                    className={twMerge(
                      "flex w-full flex-col items-center justify-center gap-2 p-6 md:flex-row md:justify-start",
                      i % 2 == 0
                        ? "bg-[#dadada] dark:bg-dark-primary"
                        : "bg-transparent",
                    )}
                  >
                    <div className="h-full overflow-hidden rounded-full">
                      <img
                        src={
                          (companyData.company?.logo?.url &&
                            adjustImageSize(
                              companyData.company.logo.url,
                              ImageSize.Resolution1080,
                            )) ||
                          "/"
                        }
                        className="h-15 w-15 scale-110 object-cover"
                        alt={`${companyData.company?.name} logo`}
                      />
                    </div>
                    <h2>{companyData.company?.name}</h2>
                    <NavLink
                      to={`/developers/${companyData.company?.id}`}
                      className="flex text-green-600 italic md:ml-auto dark:text-blue-400"
                    >
                      View Details
                      <SquareChevronRight className="self ml-3" />
                    </NavLink>
                  </div>
                ))}
              </div>

              {/* extra information */}
              <div className="mx-5 flex w-full flex-col items-center px-5">
                <h1 className="mx-5 my-5 text-xl font-bold text-gray-700 dark:text-gray-300">
                  Additional Information
                </h1>

                <ul className="flex w-full flex-col items-start gap-3 rounded-lg bg-light-secondary p-5 text-sm text-gray-700 dark:bg-dark-secondary dark:text-gray-300">
                  {gameData.websites?.map((website, i) => (
                    <li>
                      <a
                        href={website.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 dark:text-blue-400"
                      >
                        {website.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }}
      </Await>
    </React.Suspense>
  );
}
