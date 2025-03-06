import { type ZodObject } from "zod";

/**
 * Options for the fetchFromServer function
 * @interface fetchFromServerOptions
 * @property {ZodObject<any>} [parseDataWith] - Optional Zod schema to validate and parse the response data
 */
interface fetchFromServerOptions {
  parseDataWith?: ZodObject<any>;
}

/**
 * Fetches data from the server
 * @template T
 * @param {string} path - The API endpoint path (without /api prefix)
 * @param {fetchFromServerOptions} [opts] - Optional configuration options
 * @returns {Promise<T>} The fetched data
 * @throws {Error} If the fetch request fails, if Zod validation fails, or any other miscellaneous error occurs
 *
 * @example
 * // Basic usage
 * const data = await fetchFromServer<UserData>('/users/123');
 * const dataValidated = await fetchFromServer<UserData>('/users/123', { parseDataWith: userSchema });
 */
export const fetchFromServer = async <T>(
  path: string,
  opts?: fetchFromServerOptions,
): Promise<T> => {
  const env = import.meta.env;
  const apiUrl = env.DEV ? env.VITE_API_URL_DEV : env.VITE_API_URL_PROD;

  try {
    const res = await fetch(`${apiUrl}/api${path}`);
    const data = await res.json();

    if (opts && opts.parseDataWith) {
      return opts.parseDataWith.parse(data) as T;
    }
    return data as T;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
