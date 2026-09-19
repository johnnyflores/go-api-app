import {
  Box,
  Button,
  Container,
  Flex,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "lucide-react";
import Logo from "@/components/Logo";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"900px"}>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        my={4}
        borderRadius="md"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            gap={3}
            display={{ base: "none", sm: "flex" }}
          >
            <Logo />
          </Flex>
          <Flex alignItems={"center"} gap={3}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? (
                <MoonIcon size={24} />
              ) : (
                <SunIcon size={24} />
              )}
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default Navbar;
