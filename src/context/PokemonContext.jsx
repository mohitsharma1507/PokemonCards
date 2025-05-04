import { useEffect, useMemo, useState } from "react";
import { createContext } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemon) => {
    setFavorites((prev) => {
      const exits = prev.find((p) => p.id === pokemon.id);
      return exits
        ? prev.filter((p) => p.id != pokemon.id)
        : [...prev, pokemon];
    });
  };

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
    }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
