import type { MoviesResponse } from "../types";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

async function fetchFromTMDB(
  path: string,
  params: Record<string, string> = {}
): Promise<MoviesResponse> {
  const url = new URL(`${BASE_URL}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Erreur TMDB : ${response.status}`);
  }

  return response.json();
}

export async function getPopularMovies(page = 1): Promise<MoviesResponse> {
  return fetchFromTMDB("/movie/popular", {
    language: "fr-FR",
    page: String(page),
  });
}

export async function searchMovies(
  query: string,
  page = 1
): Promise<MoviesResponse> {
  return fetchFromTMDB("/search/movie", {
    query,
    language: "fr-FR",
    page: String(page),
    include_adult: "false",
  });
}

export function getPosterUrl(posterPath: string | null): string {
  if (!posterPath) {
    return "https://via.placeholder.com/300x450?text=Pas+d%27image";
  }

  return `${IMAGE_BASE_URL}${posterPath}`;
}