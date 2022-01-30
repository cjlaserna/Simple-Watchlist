import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center,
  Heading,
  Box,
  Grid,
  GridItem,
  Button,
  Text,
} from "@chakra-ui/react";
import { Signup } from "./Signup";
import { Login } from "./Login";

export const Homepage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalsignup, setModalSignup] = React.useState(true);

  const handleClick = (isSignUp) => {
    setModalSignup(isSignUp);
    onOpen();
  };

  return (
    <Box>
      <Center w={"100%"} h={"100vh"} className="iframe">
        <iframe
          src="https://my.spline.design/untitled-7630207adc0fca6fa0e6814a38ee818f/"
          frameborder="0"
          width="100%"
          height="100%"
          title="VHS Player Model"
        ></iframe>
      </Center>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={5}
        display={"flex"}
        alignItems={"center"}
        h={"100vh"}
      >
        <GridItem w="100%" h="45%" />
        <GridItem w="100%" h="45%">
          <Heading fontSize={"6xl"}>
            Watchlists <br />
            <span className="secondary">truly yours.</span>
          </Heading>
          <Button
            colorScheme={"whiteAlpha"}
            color={"purple.50"}
            borderColor={"purple.50"}
            variant="outline"
            size={"lg"}
            mt={4}
            display={"inline-block"}
            onClick={() => handleClick(true)}
          >
            Get Started
          </Button>
          <Button
            colorScheme={"whiteAlpha"}
            color={"purple.50"}
            borderColor={"purple.50"}
            variant="outline"
            size={"lg"}
            mt={4}
            display={"inline-block"}
            ml={4}
            onClick={() => handleClick(false)}
          >
            Login
          </Button>
        </GridItem>
      </Grid>

      <Modal onClose={onClose} isOpen={isOpen} isCentered size={"xs"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalsignup ? (
              <Text>Create Your Account</Text>
            ) : (
              <Text>Login</Text>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalsignup ? <Signup /> : <Login />}</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
