import { Box, Center, Link, Text } from "@chakra-ui/react";
import React from "react";
import { FaExternalLinkAlt, FaHeart } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer>
      <Box bg="black" color="black" py={3} mt={5}>
        <Center>
          <Text color={"white"} textAlign={"center"}>
            {" "}
            Made with <FaHeart className="inline" fontSize={"15"} /> By{" "}
            <Link
              href="https://cjlaserna.github.io"
              fontSize={"16"}
              className="inline"
              isExternal
              color={'teal.200'}
            >
              @cjlaserna
            <FaExternalLinkAlt className="inline" fontSize={"12"} />
            </Link>
            .
          </Text>
        </Center>
      </Box>
    </footer>
  );
};
