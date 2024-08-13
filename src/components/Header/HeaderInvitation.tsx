import { Flex, Box, Spacer, Heading } from '@chakra-ui/react';
import './HeaderInvitation.scss';
import onScroll from '../../core/utils/onScroll';
import { useNavigate } from 'react-router-dom';

export default function HeaderInvitation() {
    const hasScrolled = onScroll(100);
    const navigate = useNavigate();

    return (
        <Flex
            className={`fixed-top navbar ${hasScrolled ? 'sticky' : ''}`}
            as="header"
            justify="space-between"
            boxShadow={'0 10px 33px rgba(0, 0, 0, 0.1)'}
        >
            <Box onClick={() => navigate('/')} cursor={'pointer'}>
                <Heading size={'md'} color={'primary.700'} textShadow={'1px 1px 1px rgba(0, 0, 0, 0.5)'}>Jolly Hotdog & Jolly Spaghetti</Heading>
            </Box>
            <Spacer />
        </Flex >
    );
};