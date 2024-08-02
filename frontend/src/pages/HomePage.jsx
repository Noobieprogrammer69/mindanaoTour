import { Flex, Text, Grid } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import tourAtom from '../../atom/tourAtom';
import { useEffect, useState } from 'react';
import Tours from '../components/Tours';
import TourDetails from '../components/TourDetails'; // Import the new component

const HomePage = () => {
  const [tours, setTours] = useRecoilState(tourAtom);
  const [selectedTour, setSelectedTour] = useState(null);

  useEffect(() => {
    const getTours = async () => {
      try {
        const res = await fetch("/api/tours/getTours");
        const data = await res.json();

        if (data.error) {
          console.error(data.error);
          return;
        }

        setTours(data.tour); // Assuming data.tour is an array of tour objects
      } catch (error) {
        console.error(error.message);
      }
    };

    getTours();
  }, [setTours]);

  return (
    <Flex direction="column" p={5}>
      {selectedTour ? (
        <TourDetails tour={selectedTour} />
      ) : (
        <>
          {Array.isArray(tours) && tours.length > 0 ? (
            <Grid templateColumns="repeat(4, 1fr)" gap={10}>
              {tours.map((tour) => (
                <Tours 
                  key={tour._id} 
                  tour={tour} 
                  onShowDetails={setSelectedTour} // Pass handler to show details
                />
              ))}
            </Grid>
          ) : (
            <Flex justify="center" align="center" height="100vh">
              <Text fontSize="xl" color="gray.600">
                No tours available
              </Text>
            </Flex>
          )}
        </>
      )}
    </Flex>
  );
};

export default HomePage;

