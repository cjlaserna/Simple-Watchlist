import React, { useState } from "react";
import { ResultCard } from "./ResultCard";

import {
  Input,
} from "@chakra-ui/react";

export const Add = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const apiKey = process.env.REACT_APP_TMDB_KEY;

  const onChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);

    fetch(`
        https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${e.target.value}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setResults(data.results.slice(0, 5));
        } else {
          setResults([]);
        }
      });
  };

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <Input
              size="lg"
              type="text"
              placeholder="Search for a movie..."
              value={query}
              onChange={onChange}
            />
          </div>
          {results.length > 0 && (
            <ul className="results">
              {results.map((movie) => (
                <li key={movie.id}>
                  <ResultCard movie={movie} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
