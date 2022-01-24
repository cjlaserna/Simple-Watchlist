import {
  Badge,
  Box,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { GrDocumentMissing } from "react-icons/gr";

export function Movieprev({ movie }) {
  console.log(movie.poster_path);
  console.log(movie);
  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={0}>
        <GridItem colSpan={1}>
          <Center mt={5}>
            {movie.poster_path ? (
              <Image
                borderRadius={"5"}
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title} Poster`}
                w={"80%"}
                h={"100%"}
              />
            ) : (
              <Center className="filler-poster" w={"80%"} h={"340px"}>
                <GrDocumentMissing />
              </Center>
            )}
          </Center>
        </GridItem>
        <GridItem colSpan={2}>
          <Box display={"flex"} flexDirection={"column"} py={5}>
            <Heading mx={5} float={"left"}>
              {movie.title}
            </Heading>

            <Container float={"left"} px={"0"} mx={"5"}>
              <Badge display={"inline"}>Lang: {movie.original_language}</Badge>
              <Badge display={"inline"} mx={1}>Release: {movie.release_date}</Badge>
              <Badge display={"inline"} colorScheme={"purple"} mx={1}>Rating: {movie.popularity}</Badge>
            </Container>
            
            <Text mx={5}>{movie.overview}</Text>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}
