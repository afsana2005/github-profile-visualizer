/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("github-favorites") || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem("github-favorites", JSON.stringify(favorites)); } catch { /* Local storage may be unavailable in private browsing. */ }
  }, [favorites]);

  const isFavorite = (login) => favorites.some((item) => item.login.toLowerCase() === login.toLowerCase());
  const toggleFavorite = (user) => setFavorites((current) =>
    isFavorite(user.login)
      ? current.filter((item) => item.login.toLowerCase() !== user.login.toLowerCase())
      : [...current, user]
  );

  return <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const value = useContext(FavoritesContext);
  if (!value) throw new Error("useFavorites must be used inside FavoritesProvider");
  return value;
}
