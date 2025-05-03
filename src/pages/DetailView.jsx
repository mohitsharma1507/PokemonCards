import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PokemonCard from "../components/PokemonCard";

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error("Pokémon not found");
        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

  if (error)
    return <h2 className="text-center mt-5 text-danger">Error: {error}</h2>;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <PokemonCard pokemon={pokemon} showBackButton />
    </div>
  );
}

export default PokemonDetail;
