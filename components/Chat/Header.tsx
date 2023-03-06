import { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const iconVariants = {
  hover: {
    scale: 1.2,
    transition: {
      duration: 0.2,
    },
  },
};

const Header = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleHoverStart = () => {
    setIsHovering(true);
  };

  const handleHoverEnd = () => {
    setIsHovering(false);
  };

  return (
    <Box className="container-chat" bg="gray.800" color="white" py={3} px={5}>
      <Flex alignItems="center">
        <IconButton
          aria-label="Menu"
          variant="outline"
          icon={
            <motion.div
              variants={iconVariants}
              whileHover="hover"
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
            >
              <img src="/hamburger.svg" alt="Menu icon" />
            </motion.div>
          }
          mr={5}
        />
        <Text fontSize="xl" fontWeight="bold" flex={1}>
          Your Logo
        </Text>
        <Spacer />
        <IconButton
          aria-label="Search"
          variant="outline"
          icon={
            <motion.div
              variants={iconVariants}
              whileHover="hover"
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
            >
              <img src="/search.svg" alt="Search icon" />
            </motion.div>
          }
          mr={5}
        />
        <IconButton
          aria-label="Cart"
          variant="outline"
          icon={
            <motion.div
              variants={iconVariants}
              whileHover="hover"
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
            >
              <img src="/cart.svg" alt="Cart icon" />
            </motion.div>
          }
        />
      </Flex>
    </Box>
  );
};

export default Header;
