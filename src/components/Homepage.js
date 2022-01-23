import { Center, Heading, Box, Grid, GridItem, Button } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
export const Homepage = () => {
  return (
      <Box>
      <Center w={"100%"} h={"100vh"} className='iframe'>
          <iframe src='https://my.spline.design/untitled-7630207adc0fca6fa0e6814a38ee818f/' frameborder='0' width='100%' height='100%' title='VHS Player Model'></iframe>
      </Center>
      <Grid templateColumns='repeat(2, 1fr)' gap={5} display={"flex"} alignItems={"center"} h={"100vh"} >
        <GridItem w='100%' h='45%'/>
        <GridItem w='100%' h='45%'>
        <Heading fontSize={"6xl"}>Find your <br/><span className='secondary'>REP</span> In Film</Heading>
        <Button colorScheme={"whiteAlpha"} color={"purple.50"} borderColor={"purple.50"} variant='outline' size={"lg"} mt={4}> <Link to="/add"> Get Started </Link></Button>
        </GridItem>
      </Grid>
      </Box>
  );
};
