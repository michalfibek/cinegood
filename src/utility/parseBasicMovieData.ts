import { TBasicMovie } from "../types/TBasicMovie";
import { TBasicMovieRaw } from "../types/TBasicMovieRaw";

export function parseBasicMovieData(rawData: TBasicMovieRaw): TBasicMovie {
  return {
    imdbID: rawData.imdbID,
    title: rawData.Title,
    year: parseInt(rawData.Year.split(" min")[0]),
    poster: rawData.Poster,
    type: rawData.Type,
  };
}
