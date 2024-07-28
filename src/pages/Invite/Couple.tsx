import { Flex, Text, VStack, Image, Box, useBreakpointValue, Heading, Button } from '@chakra-ui/react'
// import './Hero.scss';
import BGFullCentered from '../../core/assets/images/bg-full-centered.jpg';
import BGMobileCentered from '../../core/assets/images/bg-mobile-centered.jpg';
import { MotionBoxContainer } from '../../components/MotionBox/MotionBoxContainer';
import { EmailIcon } from '@chakra-ui/icons';

export default function Couple() {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <MotionBoxContainer>
            <Flex
                w={'full'}
                h={'100vh'}
                backgroundImage={(isMobile) ? BGMobileCentered : BGFullCentered}
                backgroundSize={'cover'}
                backgroundPosition={'center center'}
            >
                <VStack
                    w={'full'}
                    justify={'center'}
                    px={{ base: 4, md: 8 }}

                >

                    <Flex maxW={'2xl'} align={'center'} direction={{ base: 'column', md: 'row' }} gap={{ base: 4, md: 16 }}>

                        <Box textAlign={'center'}>
                            <Image
                                src="https://jollibee.com.hk/home/wp-content/uploads/2023/12/Jollly-Hotdog-2.png" // Use your desired image source here
                                alt="Cute kitten"
                                borderRadius="128px 128px 16px 16px" // Rounded top left and right corners
                                objectFit="cover"
                                width="100%"
                                height={{ base: '198px', md: 'auto' }}
                                boxShadow={'16px 10px 30px -5px rgba(0, 0, 0, 0.3)'}
                            />
                            <Heading as='h2' size={{ base: 'md', md: 'xl' }} my={4}>
                                Jolly Hotdog
                            </Heading>
                            <Text fontSize={{ base: 'sm', md: 'xl' }}>Son of</Text>
                            <Text fontSize={{ base: 'sm', md: 'xl' }}>Jollibee Gaisano</Text>
                            <Text fontSize={{ base: 'sm', md: 'xl' }}>&</Text>
                            <Text fontSize={{ base: 'sm', md: 'xl' }}>Berkshire Pig</Text>
                        </Box>
                        <Box textAlign={'center'}>
                            <Image
                                src="https://jollibee.com.hk/home/wp-content/uploads/2023/05/Jolly-Spaghetti-1.png" // Use your desired image source here
                                alt="Cute kitten"
                                borderRadius="128px 128px 16px 16px" // Rounded top left and right corners
                                objectFit="cover"
                                width="100%"
                                // height={{ base: '198px', md: 'auto' }}
                                height={{ xs: '128px', base: '198px', md: 'auto' }}
                                boxShadow={'16px 10px 30px -5px rgba(0, 0, 0, 0.3)'}
                            />
                            <Heading as='h2' size={{ base: 'md', md: 'xl' }} my={4}>
                                Jolly Spaghetti
                            </Heading>
                            <Text fontSize={{ base: 'sm', md: 'xl' }}>Daughter of</Text>
                            <Text fontSize={{ base: 'sm', md: 'xl' }}>Jollibee SM City</Text>
                            <Text fontSize={{ base: 'sm', md: 'xl' }}>&</Text>
                            <Text fontSize={{ base: 'sm', md: 'xl' }}>Fettucini Itallianis</Text>
                        </Box>
                    </Flex>
                    <Flex maxW={'2xl'} align={'center'} mt={4}>
                        <Button leftIcon={<EmailIcon />} colorScheme='primary' variant='solid' onClick={(event) => { event.stopPropagation() }}>
                            View our photos
                        </Button>
                    </Flex>
                </VStack>
            </Flex >
        </MotionBoxContainer>
    )
}