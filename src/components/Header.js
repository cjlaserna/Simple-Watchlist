import React from 'react';
import {Link} from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

import { Box, Text, Button, Center } from "@chakra-ui/react"

export const Header = () => {
  return <header>
      <Box boxShadow='base' bg="black" color="black" px={20}>
        <Box className='inner-content' mx={20} px={10}>
            <div className='brand'>
                <Link to="/">MRIF</Link>
            </div>

            <ul className='nav-links'>
                <li>
                    <Link to='/watchlist'>Watchlist</Link>
                </li>
                <li>
                    <Link to='/watched'>Watched</Link>
                </li>
                <li>
                    <Link to='/add'><Button colorScheme={"whiteAlpha"} color={"purple.50"} borderColor={"purple.50"} variant='outline' rightIcon={<FaPlus/>}> Add </Button></Link>
                </li>
            </ul>
        </Box>
      </Box>
  </header>;
};
