import { TMovieRaw } from "./TMovieRaw";

export type TBasicMovieRaw = Pick<TMovieRaw, "imdbID" | "Title" | "Year" | "Poster" | "Type">;
