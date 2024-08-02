import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil';
import { ChakraProvider } from '@chakra-ui/react'

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'white',
        color: 'black', // Optionally, set text color
        margin: 0,
        padding: 0,
        height: '100%',
        width: '100%',
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <BrowserRouter>
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
    </BrowserRouter>
  </RecoilRoot>
)
