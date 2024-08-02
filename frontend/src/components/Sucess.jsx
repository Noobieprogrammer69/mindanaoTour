import { Flex, Box, Text, Button } from "@chakra-ui/react"
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const bookingId = new URLSearchParams(location.search).get('bookingId');
  const navigate = useNavigate()

  useEffect(() => {
    if (bookingId) {
      const updateBookingStatus = async () => {
        try {
          await fetch(`/api/booking/updateBooking/${bookingId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentStatus: 'completed' }),
          });
        } catch (error) {
          console.error('Error updating booking status:', error);
        }
      };

      updateBookingStatus();
    } else {
      console.error('Booking ID not found in URL');
    }
  }, [bookingId]);

  const handleHomeRedirect = () => {
    navigate("/")
  }

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
        <Text>Your Order Has Been Confirmed, Please check your email for further information.</Text>
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
          onClick={handleHomeRedirect}
          mt={"2%"}
        >
          Go to Home Page
        </Button>
      </Box>
    </Flex>
  );
};

export default Success;
