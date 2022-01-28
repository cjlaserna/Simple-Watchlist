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
import React, { useState, useEffect } from "react";
import { GrDocumentMissing } from "react-icons/gr";

export function Movieprev({ movie }) {
  const [origin, setOrigin] = useState("N/A");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("N/A");
  const apiKey = process.env.REACT_APP_TMDB_KEY;
  const namsorKey = process.env.REACT_APP_NAMSOR_KEY;

  const getOrigin = () => {
    fetch(
      `
    https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}&language=en-US`,
      {
        method: "get",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setName(data.cast[0].name);
          console.log(data.cast[0].name);

          var [firstName, lastName] = data.cast[0].name.split(" ");
          console.log(lastName);
          fetch(
            `
            https://api.nationalize.io/?name[]=${lastName}`,
            {
              method: "get",
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (!data.errors) {
                try {
                  setOrigin(data[0].country[0].country_id);
                  console.log(data[0].country[0].country_id);
                  
                  console.log(firstName)
                  fetch(
                    `
                    https://api.genderize.io?name=${firstName}`,
                    {
                      method: "get",
                      headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      if (!data.errors) {
                        try {
                        setGender(data.gender)
                      }
                        catch(e){ setGender("N/A");}            
                      } else {
                        setGender("N/A");
                      }
                    });
                } catch (e) {
                  fetch(
                    `
                    https://api.genderize.io?name=${firstName}`,
                    {
                      method: "get",
                      headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      if (!data.errors) {
                        try {
                        setGender(data[0].gender)
                        console.log(data[0].gender);    
                      }
                        catch(e){ setGender("N/A");}            
                      } else {
                        setGender("N/A");
                      }
                    });
                    
                  setOrigin("N/A");
                }
              } else {
                setOrigin("N/A");
              }
            });
        } else {
          setName("");
        }
      });

    const useNationalize = () => {
      console.log(name);
    };
  };

  console.log("being called");
  useEffect(() => getOrigin({ name }), []);
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
              <Badge display={"inline"} mx={1}>
                Release: {movie.release_date}
              </Badge>
              <Badge display={"inline"} mx={1}>
                Rating: {movie.popularity}
              </Badge>
            </Container>

            <Container float={"left"} px={"0"} mx={"5"}>
            <Badge display={"inline"} colorScheme={"purple"} variant='outline' fontSize='0.8em'>
                Predicted Origin: {origin}
              </Badge>
              <Badge display={"inline"} colorScheme={"purple"} mx={1} variant='outline' fontSize='0.8em'>
                Lead: {gender}
              </Badge>
            </Container>
            
            <Text mx={5}>{movie.overview}</Text>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}
