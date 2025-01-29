import { fetchFromServer } from "~/utils/data-fetching";
import type { Route } from "./+types/home";

export async function clientLoader() {
    const data = await fetchFromServer("/home");
    return { loaderData: data };
}

export default function Home({ loaderData }: Route.ComponentProps) {
    console.log(loaderData);
    return <p>bruh</p>;
}
