/* eslint-disable react/prop-types */
import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Tours = ({ tour }) => {
  const navigate = useNavigate()

  if (!tour) {
    return null;
  }

  const handleViewDetails = () => {
    navigate(`/tour/${tour._id}`)
  }

  return (
    <Box
      bg="white"
      borderRadius="15px"
      p={5}
      mb={5}
      boxShadow="lg"
      border="1px solid rgba(0, 0, 0, 0.1)"
      textAlign="center"
      transition="transform 0.2s"
      _hover={{ transform: 'scale(1.05)' }}
      w="full"
      maxW="300px" 
    >
      <Flex direction="column" align="center" mb={4}>
        <Image
          src={tour.img}
          borderRadius="10px"
          boxSize="300px"
          objectFit="cover"
        />
      </Flex>
      <Text fontSize="lg" fontWeight="bold" mb={2} color={"black"}>
        {tour.title}
      </Text>
      <Text mb={4} color={"black"}>Price: ${tour.price}</Text>
      <Button
        px={4}
        onClick={handleViewDetails}
        color={"white"}
        fontSize={'sm'}
        rounded={'full'}
        bg={'blue.400'}
        boxShadow={
        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
        }
        _hover={{
        bg: 'blue.500',
        }}
        _focus={{
        bg: 'blue.500',
        }}>
        Book Now
    </Button>
    </Box>
  );
};

export default Tours;




