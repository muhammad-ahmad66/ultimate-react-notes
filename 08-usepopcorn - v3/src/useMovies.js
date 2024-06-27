import { useState, useEffect } from "react";

const apiKey = "f84fc31d";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.();

      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
            `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
          )}`;

          const response = await fetch(url, { signal: controller.signal });

          if (!response.ok)
            throw new Error("Something went wrong with fetching movies.");

          const data = await response.json();
          // console.log(data);

          if (JSON.parse(data.contents).Response === "False")
            throw new Error("Movie not found");
          setMovies(JSON.parse(data.contents).Search);
          setError("");
          console.log(JSON.parse(data.contents).Search);
          setIsLoading(false);
        } catch (err) {
          // console.error(err.message);

          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      // handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, error, isLoading };
}
