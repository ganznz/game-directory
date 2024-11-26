export interface gamesSanitizedQueryParams {
    sort?:
        | "name"
        | "first_release_date"
        | "total_rating"
        | "total_rating_count";
    direction: "asc" | "desc";
    limit: string;
    page: string;
}

export interface genresSanitizedQueryParams {
    sort?: "name";
    direction: "asc" | "desc";
    limit: string;
    page: string;
}

export interface developersSanitizedQueryParams
    extends genresSanitizedQueryParams {}
