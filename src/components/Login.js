import React, { useRef, useState } from "react";
import {
  Input,
  InputRightElement,
  InputGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Wrap,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "./context/Auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();

  const emailRef = useRef();
  const passwordRef = useRef();

  // Get signUp function from the auth context
  const { signIn } = useAuth();

  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // Get email and password input values
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Calls `signIn` function from the context
    const { error } = await signIn({ email, password });

    if (error) {
      toast({
        title: "Error Encountered",
        description: "Please confirm your login details.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Login Successful",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      history("/watchlist");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <FormControl py={1}>
        <FormLabel
          htmlFor="input-email"
          fontSize="sm"
          display={"inline"}
          float={"left"}
        >
          Email
        </FormLabel>
        <Input
          placeholder="johnDoe2@gmail.com"
          variant={"flushed"}
          display={"inline"}
          float={"right"}
          id="input-email"
          type="email"
          ref={emailRef}
        />
      </FormControl>

      <FormControl mt={"20"} py={1}>
        <FormLabel
          htmlFor="input-password"
          fontSize="sm"
          display={"inline"}
          float={"left"}
        >
          Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your Password"
            variant={"flushed"}
            display={"inline"}
            float={"right"}
            id="input-password"
            ref={passwordRef}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <Wrap mt={4} mb={3} display={"flex"} justifyContent={"flex-end"}>
          <Button ml={2} type="submit">
            Log In
          </Button>
        </Wrap>
      </FormControl>
    </form>
  );
};
