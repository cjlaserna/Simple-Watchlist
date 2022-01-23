import React from 'react';
import { GrDocumentMissing } from "react-icons/gr";
import { MovieControls } from './MovieControls';
import { Center, GridItem } from '@chakra-ui/react';

export const MovieCard = ({ movie, type }) => {
  return (
      <GridItem className="movie-card"  w='100%' h='100%'>
          <div className="overlay"></div>
          {movie.poster_path ? ( 
                  <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={`${movie.title} Poster`}
                  />
              ) : (
                <Center className="filler-poster"> <GrDocumentMissing/> </Center>
            )}

            <MovieControls type={type} movie={movie}/>
      </GridItem>
  );
};
