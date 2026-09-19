import { BookCheckIcon } from "lucide-react";
import { Flex } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Flex alignItems="center" gap={2}>
      <BookCheckIcon size={24} />
      <span>Daily Tasks</span>
    </Flex>
  );
};

export default Logo;
