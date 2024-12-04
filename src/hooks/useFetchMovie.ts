import { useEffect, useRef, useState } from "react";
import { TMovie } from "../types/TMovie";
import { parseMovieData } from "../utility/parseMovieData";

const API_URL = "https://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export function useFetchMovie(id: string | null): {
  movie: TMovie | null;
  loading: boolean;
  error: string;
} {
  const [movie, setMovie] = useState<TMovie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cache = useRef<{ [key: string]: { movie: TMovie | null } }>({});

  useEffect(() => {
    const controller = new AbortController();
    const cacheKey = `${id}`;

    async function fetchMovie() {
      if (cache.current[cacheKey]) {
        const cachedData = cache.current[cacheKey];
        setMovie(cachedData.movie);
        return;
      }

      try {
        setError("");
        setLoading(true);
        const response = await fetch(`${API_URL}?i=${id}&apikey=${API_KEY}`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Error fetching the movie");
        const data = await response.json();

        if (data.Response === "False") {
          setMovie(null);
          cache.current[cacheKey] = {
            movie: null,
          };
          throw new Error("Movie not found");
        }

        // console.log(data);

        const fetchedMovie = parseMovieData(data);
        setMovie(fetchedMovie);

        cache.current[cacheKey] = {
          movie: fetchedMovie,
        };

        setError("");
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchMovie();
    }

    return () => {
      controller.abort();
    };
  }, [id]);

  return { movie, loading, error };
}
