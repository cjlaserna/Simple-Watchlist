import React, {useContext} from 'react';
import { GlobalContext } from './context/GlobalState';
import { MovieCard } from './MovieCard';
import { Heading, Center, Box, Badge, Text, Grid } from '@chakra-ui/react';

export const Watchlist = () => {
  const {watchlist} = useContext(GlobalContext);
  return (
  <Center>
    <Box>
      <Box pt={10} pb={5} verticalAlign={"center"}>
        <Heading display={"inline"}>My Watchlist </Heading> 
        <Badge colorScheme={"teal"} float={"right"} fontSize='1em' borderRadius={"8"} display={"inline"} px={2}>
            {watchlist.length} {watchlist.length === 1 ? "Movie" : "Movies"}
        </Badge>
      </Box>
      {watchlist.length > 0 ? (
      <Box w={"60vw"} h={"100%"}>
          <Grid templateColumns={'repeat(5, 1fr)'} gap={2}>
          {watchlist.map(movie=> (
            <MovieCard key={movie.id} movie={movie} type="watchlist"/>
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