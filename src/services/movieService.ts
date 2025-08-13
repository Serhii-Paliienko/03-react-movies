import axios from "axios";
import type { Movie } from "../types/movie";
import toast from "react-hot-toast";

const API_URL = "https://api.themoviedb.org/3/search/movie";

export async function fetchMovies(query: string): Promise<Movie[]> {
  const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN as string | undefined;
  if (!API_TOKEN) {
    toast.error("Missing TMDB token");
  }

  const res = await axios.get<{ results: Movie[] }>(API_URL, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });

  return Array.isArray(res.data?.results) ? res.data.results : [];
}
