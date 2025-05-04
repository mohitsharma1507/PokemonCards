import { useContext } from "react";
import { FavoritesContext } from "../context/PokemonContext";
import PokemonCard from "../components/PokemonCard";

const FavoritesPage = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Favorite Pokemon</h2>
      <div className="row">
        {favorites.map((pokemon) => (
          <div className="col-md-4 mb-4 px-2" key={pokemon.id}>
            <PokemonCard pokemon={pokemon} small />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
