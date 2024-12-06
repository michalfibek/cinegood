import { TRating } from "./TRating";

export type TMovieRaw = {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  Director: string;
  DVD: string;
  Genre: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: TRating[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
};
