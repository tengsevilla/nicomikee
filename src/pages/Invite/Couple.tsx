import { Flex, Text, VStack, Image, Box, useBreakpointValue, Heading, Button } from '@chakra-ui/react'
import BGFullCentered from '../../core/assets/images/bg-full-centered.jpg';
import BGMobileCentered from '../../core/assets/images/bg-mobile-centered.jpg';
import { MotionBoxContainer } from '../../components/MotionBox/MotionBoxContainer';
import { MdPhotoLibrary } from "react-icons/md";

export default function Couple() {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const fontSize = useBreakpointValue({ base: '12px', md: '16px', lg: '18px' });
    const padding = useBreakpointValue({ base: '8px 12px', md: '10px 16px', lg: '12px 24px' });

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
                >

                    <Flex maxW={'2xl'} align={'center'} direction={{ base: 'column', md: 'row' }} gap={{ base: 4, md: 16 }}>

                        <Box textAlign={'center'}>
                            <Image
                                src="https://jollibee.com.hk/home/wp-content/uploads/2023/12/Jollly-Hotdog-2.png" // Use your desired image source here
                                alt="Cute kitten"
                                borderRadius="128px 128px 16px 16px" // Rounded top left and right corners
                                objectFit="cover"
                                width={{ xs: '148px', base: '216px', md: '100%' }}
                                height={{ xs: '148px', base: '216px', md: 'auto' }}
                                boxShadow={'16px 10px 30px -5px rgba(0, 0, 0, 0.3)'}
                            />
                            <Heading as='h2' size={{ base: 'md', md: 'xl' }} my={{ xs: 2, base: 2, xl: 6 }}>
                                Jolly Hotdog
                            </Heading>
                            <Text >Son of</Text>
                            <Text >Jollibee Gaisano</Text>
                            <Text >&</Text>
                            <Text >Berkshire Pig</Text>
                        </Box>
                        <Box textAlign={'center'}>
                            <Image
                                src="https://jollibee.com.hk/home/wp-content/uploads/2023/05/Jolly-Spaghetti-1.png" // Use your desired image source here
                                alt="Cute kitten"
                                borderRadius="128px 128px 16px 16px" // Rounded top left and right corners
                                objectFit="cover"
                                width={{ xs: '148px', base: '216px', md: '100%' }}
                                height={{ xs: '128px', base: '198px', md: 'auto' }}
                                boxShadow={'16px 10px 30px -5px rgba(0, 0, 0, 0.3)'}
                            />
                            <Heading as='h2' size={{ base: 'md', md: 'xl' }} my={{ xs: 2, base: 2, xl: 6 }}>
                                Jolly Spaghetti
                            </Heading>
                            <Text >Daughter of</Text>
                            <Text >Jollibee SM City</Text>
                            <Text >&</Text>
                            <Text >Fettucini Itallianis</Text>
                        </Box>
                    </Flex>
                    <Flex maxW={'2xl'} align={'center'} mt={{ xs: 2, base: 2, xl: 6 }}>
                        <Button leftIcon={<MdPhotoLibrary />} fontSize={fontSize} padding={padding}
                            onClick={(event) => { event.stopPropagation() }}
                        >
                            View our photos
                        </Button>
                    </Flex>
                </VStack>
            </Flex >
        </MotionBoxContainer>
    )
}