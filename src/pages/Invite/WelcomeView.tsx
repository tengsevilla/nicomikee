import { Stack, Flex, Text, VStack, Box, Heading, Button, useBreakpointValue } from '@chakra-ui/react'
// import './Hero.scss';
import BGInvitation from '../../core/assets/images/bg-invitation.jpg';
import { MotionBoxContainer } from '../../components/MotionBox/MotionBoxContainer';
import { PiShootingStarFill } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

export default function WelcomeView() {
    const navigate = useNavigate();
    const fontSize = useBreakpointValue({ base: '12px', md: '16px', lg: '18px' });
    const padding = useBreakpointValue({ base: '8px 12px', md: '10px 16px', lg: '12px 24px' });

    return (
        <MotionBoxContainer>
            <Flex
                w={'full'}
                h={'100vh'}
                backgroundImage={BGInvitation}
                backgroundSize={'cover'}
                backgroundPosition={'center center'}
            >
                <VStack
                    w={'full'}
                    justify={'center'}
                >

                    <Stack maxW={'2xl'} align={'center'}>

                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            <Text
                                align={'center'}
                                color={'white'}
                                fontWeight={500}
                                variant={'heading'}
                                fontSize={{ base: 'md', md: 'xl' }}
                                // lineHeight={1.5}
                                textShadow={'1px 1px 2px rgba(0, 0, 0, 0.7)'}
                                mb={2}
                            >
                                January 99, 2020
                            </Text>
                            <Text
                                align={'center'}
                                color={'white'}
                                fontWeight={700}
                                variant={'heading'}
                                fontSize={{ base: 'xl', md: '2xl' }}
                                // lineHeight={1.5}
                                textShadow={'1px 1px 2px rgba(0, 0, 0, 0.7)'}
                                mb={8}
                            >
                                Welcome to the wedding of
                            </Text>
                            <Heading
                                as='h1'
                                size={{ base: '2xl', md: '4xl' }}
                                noOfLines={1}
                                textAlign={'center'}
                                color={'white'}
                                textShadow={'1px 1px 2px rgba(0, 0, 0, 0.7)'}
                                mb={8}
                            >
                                Jolly Spaghetti
                            </Heading>
                            <Heading
                                as='h1'
                                size={{ base: '2xl', md: '4xl' }}
                                noOfLines={1}
                                textAlign={'center'}
                                color={'white'}
                                textShadow={'1px 1px 2px rgba(0, 0, 0, 0.7)'}
                                mb={8}
                            >
                                &
                            </Heading>
                            <Heading
                                as='h1'
                                size={{ base: '2xl', md: '4xl' }}
                                noOfLines={1}
                                textAlign={'center'}
                                color={'white'}
                                textShadow={'1px 1px 2px rgba(0, 0, 0, 0.7)'}
                                pb={8}
                            >
                                Jolly Hotdog
                            </Heading>
                            <Flex maxW={'2xl'} align={'center'} mt={{ xs: 2, base: 2, xl: 6 }}>
                                <Button leftIcon={<PiShootingStarFill />} fontSize={fontSize} padding={padding}
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        navigate('/event');
                                    }}
                                >
                                    Share your experience with us
                                </Button>
                            </Flex>
                        </Box>
                    </Stack>
                </VStack>
            </Flex >
        </MotionBoxContainer>
    )
}