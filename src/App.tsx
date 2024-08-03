import { Box, ChakraProvider } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import theme from "./extendTheme";
import Invitation from './pages/Invite/Invitation';
import Couple from './pages/Invite/Couple';
'./components/Navigation/NavigationInvite';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import { useEffect, useRef } from 'react';
import EventContainer from './pages/Invite/Event';
import GuestConfirmation from './pages/Invite/GuestConfirmation';
import { useQueryParamStore, useSyncQueryParams } from './core/models/store';
import WelcomeView from './pages/Invite/WelcomeView';
import EventPage from './pages/Event/EventPage';
import HeaderInvitation from './components/Header/HeaderInvitation';
import EventGallery from './pages/Event/EventGallery';

function App() {
  const parallax = useRef<IParallax>(null!);
  useSyncQueryParams();
  const { params } = useQueryParamStore();
  const { guest1, guest2, isPair } = params;
  const isViewPage = (guest1 && guest2) ? false : true;

  useEffect(() => {
    console.log({ guest1, guest2, isPair, isViewPage });
  }, [params]);

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
                {
                  (isViewPage) ? <WelcomeView /> : <Invitation />
                }
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
        <Route path="/event" element={
          <>
            <HeaderInvitation />
            <EventPage />
          </>
        } />
        <Route path="/event/gallery" element={
          <>
            <HeaderInvitation />
            <EventGallery />
          </>
        } />
      </Routes>


    </ChakraProvider>
  )
}

export default App
