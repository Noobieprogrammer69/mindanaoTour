import { useLocation } from 'react-router-dom';
import getStripe from '../../lib/getStripe';
import { useState } from 'react'
import {
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'


const Booking = () => {
  const { state } = useLocation();
  const { tour } = state;
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const bookingResponse = await fetch('/api/booking/createBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tourId: tour._id,
        }),
      });
  
      if (!bookingResponse.ok) {
        throw new Error('Failed to create booking');
      }
  
      const bookingData = await bookingResponse.json();
      const bookingId = bookingData._id;
  
      const stripeResponse = await fetch('/api/booking/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tourId: tour._id,
          bookingId,
        }),
      });
  
      if (!stripeResponse.ok) {
        const errorResponse = await stripeResponse.json();
        throw new Error(`Failed to create Stripe checkout session: ${errorResponse.error}`);
      }
  
      const stripeData = await stripeResponse.json();
  
      const stripe = await getStripe();
      await stripe.redirectToCheckout({ sessionId: stripeData.id });
  
    } catch (error) {
      console.error('Error creating booking or checkout session:', error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Flex
        justifyContent="center"
        width="500px"
        flexDirection="column"
        p="5"
        boxShadow="lg"
        borderRadius="md"
        bg={"gray.300"}
      >
        <Heading w="100%" textAlign="center" fontWeight="normal" mb="2%">
          Your Details
        </Heading>
        <Flex>
          <FormControl mr="5%">
            <FormLabel htmlFor="first-name" fontWeight="normal">
              First name:
            </FormLabel>
            <Input        
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              border={"1px solid black"}
        />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="last-name" fontWeight="normal">
              Last name:
            </FormLabel>
            <Input 
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              border={"1px solid black"}
            />
          </FormControl>
        </Flex>
        <FormControl mt="2%">
          <FormLabel htmlFor="email" fontWeight="normal">
            Email address:
          </FormLabel>
          <Input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            border={"1px solid black"}
          />
        </FormControl>

        <FormControl mr="5%">
            <FormLabel htmlFor="first-name" fontWeight="normal">
              Country:
            </FormLabel>
            <Input        
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              border={"1px solid black"}
        />
          </FormControl>

          <FormControl mr="5%">
            <FormLabel htmlFor="first-name" fontWeight="normal">
              Address:
            </FormLabel>
            <Input        
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              required
              border={"1px solid black"}
        />
          </FormControl>

          <FormControl mr="5%">
            <FormLabel htmlFor="first-name" fontWeight="normal">
              City:
            </FormLabel>
            <Input        
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              border={"1px solid black"}
        />
          </FormControl>

          <FormControl mr="5%">
            <FormLabel htmlFor="first-name" fontWeight="normal">
              Province:
            </FormLabel>
            <Input        
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              border={"1px solid black"}
        />
          </FormControl>

          <FormControl mr="5%">
            <FormLabel htmlFor="first-name" fontWeight="normal">
              Postal Code:
            </FormLabel>
            <Input        
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
              border={"1px solid black"}
          />
          </FormControl>

        <FormControl ml="40%" mt="5%">
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
          onClick={handleSubmit}
          isLoading={loading}
          >
        Book Now
      </Button>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default Booking;
