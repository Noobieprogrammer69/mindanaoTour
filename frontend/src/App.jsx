import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react'
import Header from './components/Header'
import { Booking, TourDetails, Tours } from './components'
import HomePage from './pages/HomePage';
import Success from './components/Sucess';

function App() {

  return (
    <Box position={"relative"} w={"full"}>
      <Header />
      <Routes>  
         <Route path="/" element={<HomePage />} />
         <Route path="/tour/:id" element={<TourDetails />}  />
         <Route path="/tour/:id/payment" element={<Booking />}  />
         <Route path="/success" element={<Success />} />
      </Routes>
      <Tours />
    </Box>
  )
}

export default App
