import { useMemo, useState } from "react";
import  MovieCard from "./components/MovieCard";
import { useDebounce } from "./hooks/useDebounce";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { usePopularMovies, useSearchMovies } from "./hooks/useMovies";

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useLocalStorage<number[]>(
    "favorite-movies",
    []
  );
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const isSearchMode = debouncedSearch.trim().length >= 2;

  const popularQuery = usePopularMovies(page);
  const searchQuery = useSearchMovies(debouncedSearch, page);

  const activeQuery = isSearchMode ? searchQuery : popularQuery;

  const movies = activeQuery.data?.results ?? [];
  const totalPages = activeQuery.data?.total_pages ?? 1;

  function toggleFavorite(movieId: number) {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(movieId)) {
        return prevFavorites.filter((id) => id !== movieId);
      }

      return [...prevFavorites, movieId];
    });
  }

  const displayedMovies = useMemo(() => {
    if (!showOnlyFavorites) {
      return movies;
    }

    return movies.filter((movie) => favorites.includes(movie.id));
  }, [movies, favorites, showOnlyFavorites]);

  return (
    <main className="app">
      <header className="app__header">
        <h1>Catalogue de films</h1>
        <p>Favoris : {favorites.length}</p>
      </header>

      <section className="toolbar">
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <label className="favorites-filter">
          <input
            type="checkbox"
            checked={showOnlyFavorites}
            onChange={(e) => setShowOnlyFavorites(e.target.checked)}
          />
          Afficher seulement les favoris
        </label>
      </section>

      {activeQuery.isLoading && <p>Chargement...</p>}
      {activeQuery.isError && <p>Erreur : {activeQuery.error.message}</p>}

      {!activeQuery.isLoading && !activeQuery.isError && (
        <>
          <section className="movies-grid">
            {displayedMovies.length > 0 ? (
              displayedMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavorite={favorites.includes(movie.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))
            ) : (
              <p>Aucun film à afficher.</p>
            )}
          </section>

          <section className="pagination">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Précédent
            </button>

            <span>
              Page {page} / {Math.min(totalPages, 500)}
            </span>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page >= Math.min(totalPages, 500)}
            >
              Suivant
            </button>
          </section>
        </>
      )}
    </main>
  );
}

export default App;