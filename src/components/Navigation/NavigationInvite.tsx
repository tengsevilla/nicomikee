import { Box, IconButton, Flex } from '@chakra-ui/react';
import { FaCog, FaHome, FaUser, FaEnvelopeOpen } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
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
            <IconButton
                aria-label='Add photo'
                icon={<MdAddAPhoto />}
                size="lg"
                isRound
            />
        </Box>
    )
}