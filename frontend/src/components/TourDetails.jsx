/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';

const TourDetails = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const navigate = useNavigate();

    const handleBooking = () => {
        navigate(`/tour/${tour._id}/payment`, { state: { tour } });
    }

  useEffect(() => {
    const getTourById = async () => {
      try {
        const res = await fetch(`/api/tours/tour/${id}`);
        const data = await res.json();
        if (data.error) {
          console.error(data.error);
          return;
        }
        setTour(data.tour);
      } catch (error) {
        console.error(error.message);
      }
    };

    getTourById();
  }, [id]);

  if (!tour) return <Text>Loading...</Text>;

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column" width="100%" height="100%" overflowX={"hidden"}>
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
      maxW="700px" 
      >
        <Text fontSize="lg" fontWeight="bold" mb={"2%"}>{tour.title}</Text>
          <Flex direction="column" align="center" mb={4}>
             <Image
                src={tour.img}
                borderRadius="10px"
                width={"600px"}
                height={"400px"}
                objectFit="cover"
              />
          </Flex>
        <Text fontSize="lg" fontWeight="bold">Price: ${tour.price}</Text>
          <Text fontSize="sm">Lowest Price Guaranteed</Text>
            <Button
              px={4}
              fontSize={'sm'}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
              bg: 'blue.500',
              }}
              _focus={{
              bg: 'blue.500',
              }}
              onClick={handleBooking}
              mt={"2%"}
            >
              Book Now
            </Button>
        </Box>
        <Flex padding={15} justifyContent="center" width="100%" overflowX={"hidden"}>
         <Box
            maxW="800px" 
            width="100%"
            overflow="hidden"
            textOverflow="ellipsis"
            border="1px solid #ddd"
            borderRadius="8px"
            padding="15px"
            backgroundColor="#f9f9f9"
            whiteSpace="normal"
          >
          <Text fontSize="lg" color="black">
            {tour.details}
          </Text>
        </Box>
      </Flex>
      <Flex padding={15} justifyContent="center" width="100%" overflowX={"hidden"}>
        <Box
          maxW="800px" 
          width="100%"
          overflow="hidden"
          textOverflow="ellipsis"
          border="1px solid #ddd"
          borderRadius="8px"
          padding="15px"
          backgroundColor="#f9f9f9"
          whiteSpace="normal"
        >
          <Text fontSize="lg" fontWeight="bold" mb={3}>What To Expect</Text>
          {tour.expect && tour.expect.length > 0 ? (
            <Flex flexDirection="column" gap={4}>
              {tour.expect.map((item, index) => (
                <Box key={index} border="1px solid #ddd" borderRadius="8px" padding="10px" backgroundColor="#fff">
                  <Text fontSize="lg" fontWeight="bold" mb={2}>{index + 1}. {item.title}</Text>
                  <Text fontSize="md">{item.description}</Text>
                </Box>
              ))}
            </Flex>
          ) : (
            <Text>No information available.</Text>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default TourDetails;

