import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown, FaDoorOpen, FaPlus, FaUser } from "react-icons/fa";

import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "./context/Auth";
import Profile from "./Profile";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, signOut } = useAuth();

  const history = useNavigate();

  async function handleSignOut() {
    // Ends user session
    await signOut();

    // Redirects the user to Login page
    history("/");
  }

  return (
    <header>
      <Box boxShadow="base" bg="black" color="black" px={20}>
        <Box className="inner-content" mx={20} px={10}>
          <div className="brand">
            <Link to="/">MRIF</Link>
          </div>

          {user ? (
            <ul className="nav-links">
              <li>
                <Link to="/watchlist">Watchlist</Link>
              </li>
              <li>
                <Link to="/watched">Watched</Link>
              </li>
              <li>
                <Link to="/add">
                  <Button
                    color={"purple.50"}
                    borderColor={"purple.50"}
                    variant="outline"
                    rightIcon={<FaPlus />}
                  >
                    {" "}
                    Add{" "}
                  </Button>
                </Link>
                <Menu>
                  {({ isOpen }) => (
                    <>
                      <MenuButton
                        ml={2}
                        isActive={isOpen}
                        as={Button}
                        rightIcon={<FaChevronDown />}
                        colorScheme={"whiteAlpha"}
                        color={"purple.50"}
                        borderColor={"purple.50"}
                        variant="outline"
                      >
                        Account
                      </MenuButton>
                      <MenuList
                        minWidth="100px"
                        color={"purple.50"}
                        borderColor={"purple.50"}
                        variant="outline"
                      >
                        <MenuItem icon={<FaUser/>} onClick={onOpen}>Change Profile</MenuItem>
                        <MenuItem onClick={handleSignOut} icon={<FaDoorOpen />}>
                          Logout
                        </MenuItem>
                      </MenuList>
                    </>
                  )}
                </Menu>
              </li>
            </ul>
          ) : (
            ""
          )}
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update your Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Profile></Profile>
          </ModalBody>
        </ModalContent>
      </Modal>
    </header>
  );
};
