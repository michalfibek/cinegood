import { TMovie } from "../types/TMovie";
import { TMovieRaw } from "../types/TMovieRaw";

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
    imdbRating: rawData.imdbRating,
    imdbVotes: rawData.imdbVotes,
    language: rawData.Language,
    metascore: rawData.Metascore,
    plot: rawData.Plot,
    poster: rawData.Poster,
    production: rawData.Production,
    rated: rawData.Rated,
    ratings: rawData.Ratings,
    released: rawData.Released,
    response: rawData.Response,
    runtime: parseInt(rawData.Runtime),
    title: rawData.Title,
    type: rawData.Type,
    website: rawData.Website,
    writer: rawData.Writer,
    year: parseInt(rawData.Year.split(" min")[0]),
  };
}
