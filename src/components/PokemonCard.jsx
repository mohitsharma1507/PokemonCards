// components/PokemonCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function PokemonCard({
  small,
  pokemon,
  showBackButton = false,
  isFavorite = false,
  onToggleFavorite = () => {},
}) {
  const navigate = useNavigate();

  return (
    <div className="card shadow h-100">
      <div className="card-header text-center bg-primary text-white">
        <h2 className="mb-0">{pokemon.name.toUpperCase()}</h2>
      </div>
      <img
        src={pokemon.sprites.other.dream_world.front_default}
        className="card-img-top mx-auto mt-3"
        alt={pokemon.name}
        style={{
          width: small ? "80px" : "180px",
          height: small ? "80px" : "150px",
          objectFit: "contain",
        }}
      />
      <div className="card-body">
        <h5 className="card-title text-center">Pokémon Details</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Type:</strong>{" "}
            {pokemon.types.map((t) => t.type.name).join(", ")}
          </li>
          <li className="list-group-item">
            <strong>Height:</strong> {pokemon.height}
          </li>
          <li className="list-group-item">
            <strong>Weight:</strong> {pokemon.weight}
          </li>
          <li className="list-group-item">
            <strong>Base Experience:</strong> {pokemon.base_experience}
          </li>
          <li className="list-group-item">
            <strong>Abilities:</strong>{" "}
            {pokemon.abilities.map((a) => a.ability.name).join(", ")}
          </li>
          <li className="list-group-item">
            <strong>Stats:</strong>
            <ul className="mt-2 ps-3">
              {pokemon.stats.map((s) => (
                <li key={s.stat.name}>
                  {s.stat.name}: {s.base_stat}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      {showBackButton && (
        <div className="card-footer d-flex justify-content center gap-3">
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Back to Home
          </button>
          <button
            className={`btn ${
              isFavorite ? "btn-danger" : "btn-outline-primary"
            }`}
            onClick={onToggleFavorite}
          >
            {isFavorite ? "💖 Remove Favorite" : "🤍 Add to Favorites"}
          </button>
        </div>
      )}
    </div>
  );
}

export default PokemonCard;
