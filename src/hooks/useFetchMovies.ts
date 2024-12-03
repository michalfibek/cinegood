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
      const signal = controller.signal;

      setLoading(true);
      setError("");

      searchText?.length < import.meta.env.VITE_MIN_SEARCH_LENGTH && setMovies([]);

      try {
        const response = await fetch(`${API_URL}?s=${searchText}&page=${page}&apikey=${API_KEY}`, {
          signal,
        });

        if (!response.ok) throw new Error("Error fetching the movie");
        const data = await response.json();
        console.log("data", data);

        if (data.Response === "False") throw new Error("Movie not found");

        setTotalResults(data.totalResults);

        setMovies(
          data.Search.map((m: TFetchedMovie) => ({
            imdbId: m.ImdbID,
            title: m.Title,
            year: parseInt(m.Year.split(" min")[0]),
            runtime: parseInt(m.Runtime),
            director: m.Director,
            poster: m.Poster,
            type: m.Type,
          })),
        );
      } catch (err) {
        setError((err as Error).message);
        return;
      }
      setLoading(false);
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
