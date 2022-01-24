import React, { useContext } from "react";
import { GlobalContext } from "./context/GlobalState";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { Tooltip, useToast } from "@chakra-ui/react";

export const MovieControls = ({ movie, type }) => {
  const {
    removeMovieFromWatchlist,
    addMovieToWatched,
    moveToWatchList,
    removeFromWatched,
  } = useContext(GlobalContext);
  
  const toast = useToast()

  return (
    <div className="inner-card-controls">
      {type === "watchlist" && (
        <>
          <Tooltip label="Add to Watched" aria-label='Add to Watched tooltip'>
            <button className="ctrl-btn" onClick={() => {addMovieToWatched(movie); 
              toast({
                title: 'Added to Watched.',
                description: "Sucessfully moved this movie to your watched list.",
                status: 'success',
                duration: 800,
                isClosable: true,
              })
            }}>
              <FaEye></FaEye>
            </button>
          </Tooltip>
          
          <Tooltip label="Remove" aria-label='Remove tooltip'>
            <button
              className="ctrl-btn"
              onClick={() => {removeMovieFromWatchlist(movie.id);
                toast({
                  title: 'Removed from Watchlist.',
                  description: "Sucessfully removed this movie from your watchlist.",
                  status: 'success',
                  duration: 800,
                  isClosable: true,
                })
              }}
            >
              <FaTimes></FaTimes>
            </button>
          </Tooltip>
        </>
      )}

      {type === "watched" && (
        <>
          <Tooltip label="Move to Watch List" aria-label='Move to Watch List tooltip'>
            <button className="ctrl-btn"
            onClick={() => {moveToWatchList(movie);
              toast({
                title: 'Added to Watchlist.',
                description: "Sucessfully moved this movie to your regular watchlist.",
                status: 'success',
                duration: 800,
                isClosable: true,
              })
            }}>
              <FaEyeSlash />
            </button>
          </Tooltip>

          <Tooltip label="Remove" aria-label='Remove tooltip'>
            <button className="ctrl-btn"
            onClick={() => {removeFromWatched(movie.id);
              toast({
                title: 'Removed from List.',
                description: "Sucessfully removed this movie from 'watched'.",
                status: 'success',
                duration: 800,
                isClosable: true,
              })
            }}>
              <FaTimes />
            </button>
          </Tooltip>
        </>
      )}
    </div>
  );
};