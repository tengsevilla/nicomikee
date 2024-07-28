import { Flex, Box, Spacer, HStack, Heading } from '@chakra-ui/react';
import { Link } from 'react-scroll';
import './HeaderInvitation.scss';
import onScroll from '../../core/utils/onScroll';
import { useEffect } from 'react';

export default function HeaderInvitation() {
    const hasScrolled = onScroll(100);

    useEffect(() => { 
        console.log(window.scrollY);
    }, [window]);
    return (
        <Flex
            className={`fixed-top navbar ${hasScrolled ? 'sticky' : ''}`}
            as="header"
            justify="space-between"
        >
            <Box><Heading size={'md'}>W3 Invitations</Heading></Box>
            <Spacer />
            <HStack
                display={{ base: 'none', md: 'flex' }}
                spacing={4}
                fontSize={'sm'}
            >
                <Link to="invitation" smooth={true} duration={500} style={{ cursor: 'pointer' }}>Invitation</Link>
                <Link to="venue" smooth={true} duration={500} style={{ cursor: 'pointer' }}>Venue</Link>
                <Link to="menu" smooth={true} duration={500} style={{ cursor: 'pointer' }}>Menu</Link>
                <Link to="rsvp" smooth={true} duration={500} style={{ cursor: 'pointer' }}>RSVP</Link>
            </HStack>
        </Flex >
    );
};