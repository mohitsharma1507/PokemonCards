import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Pokemon() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
      const data = await res.json();
      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });
      const detailedResponses = await Promise.all(detailedPokemonData);
      setApiData(detailedResponses);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchData = apiData
    ? apiData.filter((curPokemon) =>
        curPokemon.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <section
      className="container"
      style={{ maxWidth: "100%", backgroundColor: "#eff3ff" }}
    >
      <header className="text-center mb-5">
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          Let's Catch Pikachu!
        </h1>
      </header>
      <div className="searchBox" style={{ marginLeft: "3rem" }}>
        <input
          type="text"
          placeholder="search pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="row">
        {searchData.map((curPokemon) => (
          <div
            key={curPokemon.id}
            className="col-md-4 d-flex justify-content-center mb-4"
          >
            <div className="card" style={{ width: "20rem" }}>
              <img
                src={curPokemon.sprites.other.dream_world.front_default}
                className="card-img-top"
                alt={curPokemon.name}
                style={{ width: "120px", margin: "10px auto" }}
              />
              <div className="card-body text-center">
                <h2 className="card-title">
                  <b>{curPokemon.name}</b>
                </h2>
              </div>
              <div
                className="pokemon-info "
                style={{
                  backgroundColor: "green",
                  color: "white",
                  borderRadius: "5px",
                  width: "111px",
                  textAlign: "center",
                  margin: "auto auto 19px",
                }}
              >
                <p>
                  {curPokemon.types
                    .map((curType) => curType.type.name)
                    .join(", ")}
                </p>
              </div>
              <div className="row text-center d-flex justify-content-around mb-3">
                <div className="col">
                  <p className="pokemon-info m-0">
                    <b>Height:</b> {curPokemon.height}
                  </p>
                </div>
                <div className="col">
                  <p className="pokemon-info m-0">
                    <b>Weight:</b> {curPokemon.weight}
                  </p>
                </div>
                <div className="col">
                  <p className="pokemon-info m-0">
                    <b>Speed:</b> {curPokemon.stats[5].base_stat}
                  </p>
                </div>
                <div className="col">
                  <p className="pokemon-info m-0">
                    <b>Id:</b> {curPokemon.id}
                  </p>
                </div>
              </div>
              <div className="row text-center mb-3">
                <p className="m-0">
                  <b>Experience:</b> {curPokemon.base_experience}
                </p>
                <p className="m-0">
                  <b>Attack:</b> {curPokemon.stats[1].base_stat}
                </p>
                <p className="m-0">
                  <b>Abilities:</b>{" "}
                  {curPokemon.abilities
                    .map((abilityInfo) => abilityInfo.ability.name)
                    .slice(0, 1)
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pokemon;
