import { useEffect, useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

function Home() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const navigate = useNavigate();

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

  const handleView = (id) => {
    navigate(`/pokemon/${id}`);
  };

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

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = searchData.slice(indexOfFirst, indexOfLast);

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
      <div className="FavoriteBtn" style={{ marginRight: "43rem" }}>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/favorites")}
        >
          Favorite
        </button>
      </div>
      <div className="FavoriteBtn" style={{ marginRight: "43rem" }}>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/compare")}
        >
          Compare
        </button>
      </div>
      <div
        className="searchBox"
        style={{ marginLeft: "43rem", marginTop: "-2.5rem" }}
      >
        <input
          type="text"
          placeholder="search pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Pagination
        totalItems={searchData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="row">
        {currentItems.map((curPokemon) => (
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
              <button
                className="btn btn-success"
                style={{ width: "125px", margin: "auto", marginBottom: "11px" }}
                onClick={() => handleView(curPokemon.id)}
              >
                View Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;
