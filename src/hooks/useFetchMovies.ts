import { useEffect, useState } from "react";
import { TMovie } from "../types/movie";
import { TFetchedMovie } from "../types/fetchedMovie";

const API_URL = "https://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export function useFetchMovies(
  searchText: string,
  page: number,
): {
  movies: TMovie[];
  totalResults: number;
  loading: boolean;
  error: string;
} {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setError("");
        setLoading(true);
        const response = await fetch(`${API_URL}?s=${searchText}&page=${page}&apikey=${API_KEY}`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Error fetching the movie");
        const data = await response.json();

        if (data.Response === "False") throw new Error("Movie not found");
        // console.log("data", data.Search);

        setTotalResults(data.totalResults);

        setMovies(
          data.Search.map((m: TFetchedMovie) => ({
            imdbID: m.imdbID,
            title: m.Title,
            year: parseInt(m.Year.split(" min")[0]),
            poster: m.Poster,
            type: m.Type,
            // runtime: parseInt(m.Runtime),
            // director: m.Director,
          })),
        );
      } catch (err) {
        setError((err as Error).message);
        return;
      } finally {
        setLoading(false);
      }
    }

    if (searchText?.length < import.meta.env.VITE_MIN_SEARCH_LENGTH) {
      setMovies([]);
      setError("");
      return;
    }

    const timer = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [searchText, page]);

  return { movies, totalResults, loading, error };
}
