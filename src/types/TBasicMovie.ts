import { TMovie } from "./TMovie";

export type TBasicMovie = Pick<TMovie, "imdbID" | "title" | "year" | "poster" | "type">;
