import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [dataType, setDataType] = useState("character");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [dataType]);

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      let url = "";

      if (dataType === "character") {
        url = "https://rickandmortyapi.com/api/character";
      } else if (dataType === "episode") {
        url = "https://rickandmortyapi.com/api/episode";
      } else if (dataType === "location") {
        url = "https://rickandmortyapi.com/api/location";
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const result = await response.json();

      setItems(result.results);
    } catch (error) {
      console.error(error);
      setError("Unable to fetch data.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">

      <div className="text-center mb-5">
        <h1 className="fw-bold">
          Rick and Morty API Explorer
        </h1>

        <p className="text-muted">
          E54 Assignment 13 - API Call
        </p>
      </div>

      <div className="row justify-content-center mb-5">
        <div className="col-md-6">

          <label className="form-label fw-bold">
            Select Data Type
          </label>

          <select
            className="form-select"
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
          >
            <option value="character">
              Characters
            </option>

            <option value="episode">
              Episodes
            </option>

            <option value="location">
              Locations
            </option>
          </select>

        </div>
      </div>

      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
          <p className="mt-2">Loading...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="row g-4">

          {items.map((item) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={item.id}
            >
              <div className="card h-100 shadow-sm">

                <div className="card-body text-center">

                  <span className="badge bg-primary mb-3">
                    ID: {item.id}
                  </span>

                  <h5 className="card-title">
                    {item.name}
                  </h5>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default App;