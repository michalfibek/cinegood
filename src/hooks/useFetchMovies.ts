import { useEffect, useState } from "react";
import { TMovie } from "../types/movie";
import { TFetchedMovie } from "../types/fetchedMovie";

const API_URL = "https://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export function useFetchMovies(searchText: string): {
  movies: TMovie[];
  loading: boolean;
  error: string;
} {
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      const signal = controller.signal;

      setLoading(true);
      setError("");

      searchText?.length < import.meta.env.VITE_MIN_SEARCH_LENGTH && setMovies([]);

      try {
        const response = await fetch(`${API_URL}?s=${searchText}&apikey=${API_KEY}`, { signal });
        if (!response.ok) throw new Error("Error fetching the movie");
        const data = await response.json();

        if (data.Response === "False") throw new Error(data.Error);

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
  }, [searchText]);

  return { movies, loading, error };
}
