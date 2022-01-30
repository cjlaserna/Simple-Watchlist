import React, { useState, useEffect } from "react";
import { MovieCard } from "./MovieCard";
import {
  Heading,
  Center,
  Box,
  Badge,
  Text,
  Grid,
  Skeleton,
} from "@chakra-ui/react";
import { supabase } from "../supabase";

export async function fetchWatchlists() {
  let { data: watchlists, error } = await supabase
    .from("watchlists")
    .select("*")
    .order("id", { ascending: false });
  if (error) console.log("error", error);
  return watchlists.filter((movie) => {
    return movie.is_watched === false;
  });
}

export async function checkWatching({ movie }, id) {
  let { data: watchlists, error } = await supabase
    .from("watchlists")
    .select("*")
    .order("id", { ascending: false });
  if (error) console.log("error", error);
  const watchinglist = watchlists.filter((movie) => {
    return movie.is_watched === false;
  });

  if (id === undefined) {
    return !!watchinglist.find((o) => o.movie_id === movie.id);
  } else {
    return !!watchinglist.find((o) => o.movie_id === id);
  }
}

export const Watchlist = () => {
  const [watchlists, setWatchlists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchWatchlists().then(function (result) {
      setWatchlists(result);
      setIsLoading(false);
    });
  }, []);
  return (
    <Center>
      <Box>
        <Box pt={10} pb={5} verticalAlign={"center"}>
          <Heading display={"inline"}>My Watchlist </Heading>
          <Badge
            colorScheme={"teal"}
            float={"right"}
            fontSize="1em"
            borderRadius={"8"}
            display={"inline"}
            px={2}
          >
            {watchlists.length} {watchlists.length === 1 ? "Movie" : "Movies"}
          </Badge>
        </Box>
        <Skeleton isLoaded={!isLoading}>
          {watchlists.length > 0 ? (
            <Box w={"60vw"} h={"100%"}>
              <Grid templateColumns={"repeat(5, 1fr)"} gap={2}>
                {watchlists.map((movie) => (
                  <MovieCard
                    key={movie.movie_id}
                    movie_id={movie.movie_id}
                    type={"watchlist"}
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
