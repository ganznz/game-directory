export interface gamesSanitizedQueryParams {
    sort?: "name" | "first_release_date" | "total_rating";
    direction: "asc" | "desc";
    limit: string;
    page: string;
}
