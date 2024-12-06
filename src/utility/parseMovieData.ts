import { TMovie } from "../types/TMovie";
import { TMovieRaw } from "../types/TMovieRaw";

function checkNA(field: string) {
  if (field === "N/A") return null;
  return field;
}

export function parseMovieData(rawData: TMovieRaw): TMovie {
  return {
    actors: rawData.Actors,
    awards: rawData.Awards,
    boxOffice: rawData.BoxOffice,
    country: rawData.Country,
    director: rawData.Director,
    DVD: rawData.DVD,
    genre: rawData.Genre,
    imdbID: rawData.imdbID,
    language: rawData.Language,
    plot: rawData.Plot,
    poster: rawData.Poster,
    production: checkNA(rawData.Production),
    rated: rawData.Rated,
    ratings: rawData.Ratings,
    released: new Date(rawData.Released),
    response: rawData.Response,
    runtime: parseInt(rawData.Runtime),
    title: rawData.Title,
    type: rawData.Type,
    website: checkNA(rawData.Website),
    writer: rawData.Writer,
    year: parseInt(rawData.Year.split(" min")[0]),
  };
}
