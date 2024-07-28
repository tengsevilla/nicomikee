import { Box, Menu, MenuButton, MenuItem, MenuList, IconButton, Flex } from '@chakra-ui/react';
import { FaCog, FaHamburger, FaHome, FaUser, FaEnvelopeOpen } from "react-icons/fa";
// import { FaEnvelopeOpen } from "react-icons/fa6";
import { useBreakpointValue } from '@chakra-ui/react';
export const NavigationInvite = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    return (
        <>
            {isMobile ? (
                <MobileMenu />
            ) : (
                <Box
                    position="fixed"
                    bottom={4}
                    left="50%"
                    transform="translateX(-50%)"
                    bg="white"
                    boxShadow="lg"
                    borderRadius="md"
                    p={2}
                    zIndex={10}
                >
                    <Flex justifyContent="space-around">
                        <IconButton
                            icon={<FaEnvelopeOpen />}
                            aria-label="Inivitation"
                            variant="ghost"
                            colorScheme="teal"
                        />
                        <IconButton
                            icon={<FaUser />}
                            aria-label="Couple"
                            variant="ghost"
                            colorScheme="teal"
                        />
                        <IconButton
                            icon={<FaCog />}
                            aria-label="Event"
                            variant="ghost"
                            colorScheme="teal"
                        />
                        <IconButton
                            icon={<FaHome />}
                            aria-label="RSVP"
                            variant="ghost"
                            colorScheme="teal"
                        />
                    </Flex>
                </Box>
            )}

        </>
    );
};

const MobileMenu = () => {
    return (
        <Box position="fixed" bottom="8" right="8" zIndex={1}>
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<FaHamburger color='teal' />}
                    size="lg"
                    isRound
                />
                <MenuList>
                    <MenuItem>
                        Invitation
                    </MenuItem>
                    <MenuItem>
                        Couple
                    </MenuItem>
                    <MenuItem>
                        Event
                    </MenuItem>
                    <MenuItem>
                        RSVP
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    )
}