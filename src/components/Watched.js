import { Box, Center, Heading, Badge, Grid, Text } from '@chakra-ui/react';
import React, {useContext} from 'react';
import { GlobalContext } from './context/GlobalState';
import { MovieCard } from './MovieCard';

export const Watched = () => {
  const {watched} = useContext(GlobalContext);
  return(
    <Center>
    <Box>
      <Box pt={10} pb={5} verticalAlign={"center"}>
        <Badge colorScheme={"teal"} float={"right"} fontSize='1em' borderRadius={"8"} display={"inline"} px={2}>
            {watched.length} {watched.length === 1 ? "Movie" : "Movies"}
        </Badge>
        <Heading>Watched Movies</Heading>
      </Box>
      {watched.length > 0 ? (
      <Box w={"60vw"} h={"100%"}>
          <Grid templateColumns={'repeat(5, 1fr)'} gap={2}>
          {watched.map(movie=> (
            <MovieCard key={movie.id} movie={movie} type="watched"/>
          ))}
          </Grid>
      </Box>
      ) : ( 
      <Box w="60vw">
          <Text fontSize={"3xl"} color={"gray.500"}>No movies in your list.</Text>
      </Box>
      )}

    </Box>
  </Center>
  );
};
