import { Stack, Flex, Text, VStack, Box, Heading } from '@chakra-ui/react'
// import './Hero.scss';
import BGInvitation from '../../core/assets/images/bg-invitation.jpg';
import { MotionBoxContainer } from '../../components/MotionBox/MotionBoxContainer';
import { useQueryParamStore } from '../../core/models/store';

export default function Invitation() {
    const { params } = useQueryParamStore();
    const { guest1, guest2, isPair } = params;
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
                    px={{ base: 4, md: 8 }}
                >

                    <Stack maxW={'2xl'} align={'center'}>

                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            <Text
                                align={'center'}
                                color={'white'}
                                fontWeight={700}
                                variant={'heading'}
                                fontSize={{ base: 'xl', md: '2xl' }}
                                // lineHeight={1.5}
                                textShadow={'1px 1px 2px rgba(0, 0, 0, 0.7)'}
                            >
                                Dear
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
                                {(isPair) ? `${guest1} and ${guest2}` : `${guest1}`}
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
                                You are invited to the wedding of
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
                                pb={16}
                            >
                                Jolly Hotdog
                            </Heading>
                        </Box>
                    </Stack>
                </VStack>
            </Flex >
        </MotionBoxContainer>
    )
}