import React, { useContext } from "react";
import { GlobalContext } from "./context/GlobalState";
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
  useDisclosure,
} from "@chakra-ui/react";
import { Movieprev } from "./Movieprev";

export const ResultCard = ({ movie }) => {
  const { addMovieToWatchlist, addMovieToWatched, watchlist, watched } =
    useContext(GlobalContext);

  let storedMovie = watchlist.find((o) => o.id === movie.id);
  let storedMovieWatched = watched.find((o) => o.id === movie.id);

  const watchlistDisabled = storedMovie
    ? true
    : storedMovieWatched
    ? true
    : false;
  const watchedDisabled = storedMovieWatched ? true : false;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  return (
    <div className="result-card">
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
          <ModalHeader>Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Movieprev movie={movie} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="info">
        <div className="header">
          <h3 className="title">{movie.title}</h3>
          <Badge>
            {movie.release_date ? movie.release_date.substring(0, 4) : "-"}
          </Badge>
          {storedMovie ? (
            <Badge colorScheme="purple" mx={1}>
              Watching
            </Badge>
          ) : (
            ""
          )}
          {watchedDisabled ? (
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
            disabled={watchlistDisabled}
            onClick={() => {
              addMovieToWatchlist(movie);
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
            className="btn"
            disabled={watchedDisabled}
            onClick={() => {
              addMovieToWatched(movie);
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
      </div>
    </div>
  );
};
