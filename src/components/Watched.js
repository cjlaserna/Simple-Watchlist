import {
  Box,
  Center,
  Heading,
  Badge,
  Grid,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { supabase } from "../supabase";

export async function fetchWatchedlists() {
  let { data: watchlists, error } = await supabase
    .from("watchlists")
    .select("*")
    .order("id", { ascending: false });
  if (error) console.log("error", error);
  return watchlists.filter((movie) => {
    return movie.is_watched === true;
  });
}

export async function checkWatched({ movie }, id) {
  let { data: watchlists, error } = await supabase
    .from("watchlists")
    .select("*")
    .order("id", { ascending: false });
  if (error) console.log("error", error);
  const watchedlist = watchlists.filter((movie) => {
    return movie.is_watched === true;
  });

  if (id === undefined) {
    return !!watchedlist.find((o) => o.movie_id === movie.id);
  } else {
    return !!watchedlist.find((o) => o.movie_id === id);
  }
}

export const Watched = () => {
  const [watchedlist, setWatchedlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchWatchedlists().then(function (result) {
      setWatchedlist(result);
      setIsLoading(false);
    });
  }, []);
  return (
    <Center>
      <Box>
        <Box pt={10} pb={5} verticalAlign={"center"}>
          <Badge
            colorScheme={"teal"}
            float={"right"}
            fontSize="1em"
            borderRadius={"8"}
            display={"inline"}
            px={2}
          >
            {watchedlist.length} {watchedlist.length === 1 ? "Movie" : "Movies"}
          </Badge>
          <Heading>Watched Movies</Heading>
        </Box>
        <Skeleton isLoaded={!isLoading}>
          {watchedlist.length > 0 ? (
            <Box w={"60vw"} h={"100%"}>
              <Grid templateColumns={"repeat(5, 1fr)"} gap={2}>
                {watchedlist.map((movie) => (
                  <MovieCard
                    key={movie.movie_id}
                    movie_id={movie.movie_id}
                    movie_db={movie}
                    type="watched"
                  />
                ))}
              </Grid>
            </Box>
          ) : (
            <Box w="60vw">
              <Text fontSize={"3xl"} color={"gray.500"}>
                No movies in your list.
              </Text>
            </Box>
          )}
        </Skeleton>
      </Box>
    </Center>
  );
};
