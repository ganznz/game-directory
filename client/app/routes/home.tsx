import type { Route } from "./+types/home";
import { FetchFromServer } from "../utils/data-fetching";

export async function loader() {
    const data = await FetchFromServer("home");
    return { loaderData: data };
}

export default function Home({ loaderData }: Route.ComponentProps) {
    return <p>bruh</p>;
}
