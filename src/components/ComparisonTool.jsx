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
      <div className="mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="First Pokémon"
          value={pokemon1}
          onChange={(e) => setPokemon1(e.target.value)}
        />
        <input
          type="text"
          className="form-control w-25"
          placeholder="Second Pokémon"
          value={pokemon2}
          onChange={(e) => setPokemon2(e.target.value)}
        />
        <button
          className="btn btn-primary"
          style={{ marginLeft: "35rem" }}
          onClick={handleCompare}
        >
          Compare
        </button>
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
