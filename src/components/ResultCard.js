import React, { useState, useEffect } from "react";
import { GrDocumentMissing } from "react-icons/gr";
import { Center, Badge, Button, useToast } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import { Movieprev } from "./Movieprev";
import { supabase } from "../supabase";
import { useAuth } from "./context/Auth";
import { checkWatched } from "./Watched";
import { checkWatching } from "./Watchlist";

export const addMovieToWatched = async ({ movie }, user) => {
  console.log(movie);
  let { data: watchlist, error } = await supabase
    .from("watchlists")
    .insert({
      movie: movie.title,
      user_id: user.id,
      movie_id: movie.id,
      poster_path: movie.poster_path,
      is_watched: true,
    })
    .single();
  if (error) console.log(error);
  else {
    console.log(error);
  }
};

export const addMovieToWatchlist = async ({ movie }, user) => {
  console.log(movie);
  let { data: watchlist, error } = await supabase
    .from("watchlists")
    .insert({
      movie: movie.title,
      user_id: user.id,
      movie_id: movie.id,
      poster_path: movie.poster_path,
      is_watched: false,
    })
    .single();
  if (error) console.log(error);
  else {
    console.log(error);
  }
};

export const ResultCard = ({ movie }) => {
  const { user, signOut } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [iswatched, setIsWatched] = useState();
  const [iswatching, setIsWatching] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setIsLoading(true);
      checkWatched({ movie }).then(function (result) {
        setIsWatched(result);
        setIsLoading(false);
      });
    }
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      checkWatching({ movie }).then(function (result) {
        setIsWatching(result);
      });
    }
    return () => (mounted = false);
  }, []);
  return (
    <div className="result-card">
      <Skeleton isLoaded={!isLoading} className="result-card">
        <div
          className="poster-wrapper"
          onClick={() => {
            onOpen();
          }}
        >
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={`${movie.title} Poster`}
            />
          ) : (
            <Center className="filler-poster">
              {" "}
              <GrDocumentMissing />{" "}
            </Center>
          )}
        </div>

        <Modal onClose={onClose} isOpen={isOpen} size={"5xl"} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {movie.title}
              {iswatching ? (
                <Badge colorScheme="purple" mx={5} mb={1}>
                  Watching
                </Badge>
              ) : (
                ""
              )}
              {iswatched ? (
                <Badge colorScheme="green" mx={5} mb={1}>
                  Watched
                </Badge>
              ) : (
                ""
              )}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>{isOpen ? <Movieprev movie={movie} /> : ""}</ModalBody>
            <ModalFooter mb={1}>
              <div className="controls">
                <Button
                  className="btn"
                  disabled={iswatched ? true : iswatching ? true : false}
                  onClick={() => {
                    addMovieToWatchlist({ movie }, user);
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
                  Add to Watchlist
                </Button>

                <Button
                  ml={2}
                  className="btn"
                  disabled={iswatched ? true : iswatching ? true : false}
                  onClick={() => {
                    addMovieToWatched({ movie }, user);
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
                  Watched
                </Button>
              </div>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <div className="info">
          <div className="header">
            <h3 className="title">{movie.title}</h3>
            <Badge>
              {movie.release_date ? movie.release_date.substring(0, 4) : "-"}
            </Badge>
            {iswatching ? (
              <Badge colorScheme="purple" mx={1}>
                Watching
              </Badge>
            ) : (
              ""
            )}
            {iswatched ? (
              <Badge colorScheme="green" mx={1}>
                Watched
              </Badge>
            ) : (
              ""
            )}
          </div>
          <div className="controls">
            <Button
              className="btn"
              disabled={iswatched ? true : iswatching ? true : false}
              onClick={() => {
                addMovieToWatchlist({ movie }, user);
                toast({
                  title: "Added to Watchlist.",
                  description:
                    "Sucessfully moved this movie to your regular watchlist.",
                  status: "success",
                  duration: 800,
                  isClosable: true,
                });
                setIsWatching(true);
              }}
            >
              Add to Watchlist
            </Button>

            <Button
              className="btn"
              disabled={iswatched ? true : iswatching ? true : false}
              onClick={() => {
                addMovieToWatched({ movie }, user);
                toast({
                  title: "Added to Watched.",
                  description:
                    "Sucessfully moved this movie to your watched list.",
                  status: "success",
                  duration: 800,
                  isClosable: true,
                });
                setIsWatched(true);
              }}
            >
              Watched
            </Button>
            {iswatched}
          </div>
        </div>
      </Skeleton>
    </div>
  );
};
