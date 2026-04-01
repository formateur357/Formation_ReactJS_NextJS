import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useDebounce } from './hooks/useDebounce'
import { usePopularMovies, useSearchMovies } from './hooks/useMovies';
import MovieCard from './components/MovieCard';

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []); // Stocke les IDs des films favoris
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

   // Mauvaise pratique : modifie l'état à chaque rendu, provoquant une boucle infinie

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(1); // Réinitialise la page à 1 à chaque changement de recherche
  }, [debouncedSearch]);

  const isSearchMode = debouncedSearch.trim().length >= 2;

  const popularQuery = usePopularMovies(page);
  const searchQuery = useSearchMovies(debouncedSearch, page);

  const activeQuery = isSearchMode ? searchQuery : popularQuery;

  const movies = activeQuery.data?.results ?? [];
  const totalPages = activeQuery.data?.total_pages ?? 1;

  const displayedMovies = useMemo(() => {
    if (!showFavoritesOnly) {
      return movies;
    }

    return movies.filter((movie) => favorites.includes(movie.id));
  }, [movies, showFavoritesOnly, favorites]);

  function toggleFavorite(movieId: number) {
    const movieIdStr = String(movieId);
    if (favorites.includes(movieIdStr)) {
      setFavorites(favorites.filter((id: string) => id !== movieIdStr));
    } else {
      setFavorites([...favorites, movieIdStr]);
    }
  }

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
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <label className="favorites-filter">
        <input
          type="checkbox"
          checked={showFavoritesOnly}
          onChange={(e) => setShowFavoritesOnly(e.target.checked)}
        />
        Afficher uniquement les favoris
      </label>

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

export default App
