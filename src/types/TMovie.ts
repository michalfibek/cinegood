import { TRating } from "./TRating";

export type TMovie = {
  actors: string;
  awards: string;
  boxOffice: string;
  country: string;
  director: string;
  DVD: string;
  genre: string;
  imdbID: string;
  // imdbRating: string;
  // imdbVotes: string;
  language: string;
  // metascore: string;
  plot: string;
  poster: string | undefined;
  production: string | null;
  rated: string;
  ratings: TRating[];
  released: Date;
  response: string;
  runtime: number;
  title: string;
  type: string;
  website: string | null;
  writer: string;
  year: number;
};
