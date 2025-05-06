import { useState } from "react";
import PokemonCard from "../components/PokemonCard";

export default function ComparePokemon() {
  const [pokemon1, setPokemon1] = useState("");
  const [pokemon2, setPokemon2] = useState("");
  const [compareData, setCompareData] = useState(null);
  const [error, setError] = useState("");

  const fetchPokemon = async (name) => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    if (!res.ok) throw new Error("Pokémon not found");
    return await res.json();
  };

  const getRandomPokemon = async (setFn) => {
    const id = Math.floor(Math.random() * 898) + 1;
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setFn(data.name);
    } catch {
      setError("Failed to fetch random Pokémon.");
    }
  };

  const handleCompare = async () => {
    try {
      setError("");
      const [data1, data2] = await Promise.all([
        fetchPokemon(pokemon1),
        fetchPokemon(pokemon2),
      ]);
      setCompareData({ data1, data2 });
    } catch (err) {
      setError("One or both Pokémon not found!");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Compare Two Pokémon</h2>

      <div className="d-flex flex-wrap justify-content-center align-items-end gap-3 mb-4">
        <div className="d-flex flex-column align-items-center">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="First Pokémon"
            value={pokemon1}
            onChange={(e) => setPokemon1(e.target.value)}
            style={{ minWidth: "220px" }}
          />
          <button
            className="btn btn-outline-secondary btn-sm"
            style={{ width: "220px", height: "40px" }}
            onClick={() => getRandomPokemon(setPokemon1)}
          >
            🎲 Random First
          </button>
        </div>

        <div className="d-flex flex-column align-items-center">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Second Pokémon"
            value={pokemon2}
            onChange={(e) => setPokemon2(e.target.value)}
            style={{ minWidth: "220px" }}
          />
          <button
            className="btn btn-outline-secondary btn-sm"
            style={{ width: "220px", height: "40px" }}
            onClick={() => getRandomPokemon(setPokemon2)}
          >
            🎲 Random Second
          </button>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={handleCompare}
            disabled={!pokemon1 || !pokemon2}
          >
            Compare
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {compareData && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-5 mb-3">
            <PokemonCard pokemon={compareData.data1} />
          </div>
          <div className="col-md-5 mb-3">
            <PokemonCard pokemon={compareData.data2} />
          </div>
        </div>
      )}
    </div>
  );
}
