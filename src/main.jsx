import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import {mode} from '@chakra-ui/theme-tools'
import { BrowserRouter } from 'react-router-dom'

const styles = {
  global:(props) => ({
    body:{
      bg:mode("gray.100","#3C3A3A")(props),
      color:mode("gray.100","whiteAlpha.900")(props),
    }
  })
}


const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ config,styles })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
