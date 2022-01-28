import React from "react";
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
  Button,
} from "@chakra-ui/react";
import { Movieprev } from "./Movieprev";

export const MovieCard = ({ movie, type }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <GridItem className="movie-card" w="100%" h="100%">
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

      <MovieControls type={type} movie={movie} />

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
    </GridItem>
  );
};
