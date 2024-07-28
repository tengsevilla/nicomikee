import { Box, ChakraProvider } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import theme from "./extendTheme";
import Invitation from './pages/Invite/Invitation';
import Couple from './pages/Invite/Couple';
'./components/Navigation/NavigationInvite';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import { useRef } from 'react';
import EventContainer from './pages/Invite/Event';
import GuestConfirmation from './pages/Invite/GuestConfirmation';
import { useSyncQueryParams } from './core/models/store';

function App() {
  const parallax = useRef<IParallax>(null!);
  useSyncQueryParams();

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={
          <Box h="100vh" w="100%">
            <Parallax ref={parallax} pages={4}>
              <ParallaxLayer
                offset={0}
                speed={0}
                factor={3}
                style={{
                  backgroundImage: `url(https://awv3node-homepage.surge.sh/build/assets/stars.svg)`,
                  backgroundSize: 'cover',
                }}
              />
              <ParallaxLayer
                offset={0}
                speed={0}
                onClick={() => parallax.current.scrollTo(1)}
              >
                <Invitation />
              </ParallaxLayer>
              <ParallaxLayer
                offset={1}
                speed={0}
                onClick={() => parallax.current.scrollTo(2)}
              >
                <Couple />
              </ParallaxLayer>
              <ParallaxLayer
                offset={2}
                speed={0}
                onClick={() => parallax.current.scrollTo(3)}
              >
                <EventContainer />
              </ParallaxLayer>
              <ParallaxLayer
                offset={3}
                speed={0}
                onClick={() => parallax.current.scrollTo(0)}
              >
                <GuestConfirmation />
              </ParallaxLayer>
            </Parallax>
          </Box>
        } />
      </Routes>
    </ChakraProvider>
  )
}

export default App
