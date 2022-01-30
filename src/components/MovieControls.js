import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { Tooltip, useToast } from "@chakra-ui/react";
import { supabase } from "../supabase";

export const removeMovie = async (id) => {
  try {
    await supabase.from("watchlists").delete().eq("movie_id", id);
  } catch (error) {
    console.log("error", error);
  }
};

export const addMovieToWatchedByID = async (id) => {
  const { data, error } = await supabase
    .from("watchlists")
    .update({ is_watched: true })
    .eq("movie_id", id)
    .single();
  if (error) {
    console.error(error);
  }
};

export const addMovieToWatchlistByID = async (id) => {
  const { data, error } = await supabase
    .from("watchlists")
    .update({ is_watched: false })
    .eq("movie_id", id)
    .single();
  if (error) {
    console.error(error);
  }
};

export const MovieControls = ({ movie, type }) => {
  const toast = useToast();
  const [display, setDisplay] = useState("block");

  return (
    <>
      {type === "watchlist" && (
        <>
          <Tooltip label="Add to Watched" aria-label="Add to Watched tooltip" display={display}>
            <button
              className="ctrl-btn"
              onClick={() => {
                setDisplay("none");
                addMovieToWatchedByID(movie.id);
                toast({
                  title: "Added to Watched.",
                  description:
                    "Sucessfully moved this movie to your watched list.",
                  status: "success",
                  duration: 800,
                  isClosable: true,
                });
              }}
            >
              <FaEye></FaEye>
            </button>
          </Tooltip>

          <Tooltip label="Remove" aria-label="Remove tooltip">
            <button
              className="ctrl-btn"
              onClick={() => {
                setDisplay("none");
                removeMovie(movie.id);
                toast({
                  title: "Removed from Watchlist.",
                  description:
                    "Sucessfully removed this movie from your watchlist.",
                  status: "success",
                  duration: 800,
                  isClosable: true,
                });
              }}
            >
              <FaTimes></FaTimes>
            </button>
          </Tooltip>
        </>
      )}

      {type === "watched" && (
        <>
          <Tooltip
            label="Move to Watch List"
            aria-label="Move to Watch List tooltip"
          >
            <button
              className="ctrl-btn"
              onClick={() => {
                setDisplay("none");
                addMovieToWatchlistByID(movie.id);
                toast({
                  title: "Added to Watchlist.",
                  description:
                    "Sucessfully moved this movie to your regular watchlist.",
                  status: "success",
                  duration: 800,
                  isClosable: true,
                });
              }}
            >
              <FaEyeSlash />
            </button>
          </Tooltip>

          <Tooltip label="Remove" aria-label="Remove tooltip">
            <button
              className="ctrl-btn"
              onClick={() => {
                removeMovie(movie.id);
                localStorage.setItem("scrollpos", window.pageYOffset);
                toast({
                  title: "Removed from List.",
                  description: "Sucessfully removed this movie from 'watched'.",
                  status: "success",
                  duration: 800,
                  isClosable: true,
                });
              }}
            >
              <FaTimes />
            </button>
          </Tooltip>
        </>
      )}
    </>
  );
};
