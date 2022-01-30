import React, { useState, useEffect } from "react";
import { GrDocumentMissing } from "react-icons/gr";
import { MovieControls } from "./MovieControls";
import {
  Center,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Skeleton,
  Button,
} from "@chakra-ui/react";
import { Movieprev } from "./Movieprev";

export const MovieCard = ({ movie_id, type }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [movie, setMovie] = useState([]);
  const apiKey = process.env.REACT_APP_TMDB_KEY;
  const [display, setDisplay] = useState("block");
  const [isLoading, setIsLoading] = useState(false);

  const getMovie = () => {
    fetch(`
    https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en-US`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setMovie(data);
          setIsLoading(false);
        } else {
          setMovie([]);
        }
      });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setIsLoading(true);
      getMovie();
    }
    return () => (mounted = false);
  }, []);

  return (
    <GridItem className="movie-card" w="100%" h="100%" display={display}>
      <Skeleton isLoaded={!isLoading}>
        <div className="overlay" onClick={onOpen}></div>
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
        <div
          className="inner-card-controls"
          onClick={() => {
            setDisplay("none");
          }}
        >
          <MovieControls type={type} movie={movie} />
        </div>
        <Modal onClose={onClose} isOpen={isOpen} size={"5xl"} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Preview</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Movieprev movie={movie} />
            </ModalBody>
            <ModalFooter mb={1}>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Skeleton>
    </GridItem>
  );
};
