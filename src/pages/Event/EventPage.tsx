import {
    Flex,
    Text,
    VStack,
    useBreakpointValue,
    Heading,
    Button,
} from '@chakra-ui/react';
import BGFullCentered from '../../core/assets/images/bg-full-centered.jpg';
import BGMobileCentered from '../../core/assets/images/bg-mobile-centered.jpg';
import { MdAddAPhoto, MdSend } from 'react-icons/md';
import EventSendMessage from './EventSendMessage';
import { useRef, useState } from 'react';

export default function EventPage() {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const buttonSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });
    const [modal, setModal] = useState<boolean>(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            // Handle the file upload logic here
            console.log('Selected file:', file);
        }
    };

    return (
        <Flex
            h={'100vh'}
            backgroundImage={isMobile ? BGMobileCentered : BGFullCentered}
            backgroundSize={'cover'}
            backgroundPosition={'center center'}
            align={'center'}
            justify={'center'}
            p={{ base: 4, md: 8 }}
        >
            <VStack
                spacing={4}
                maxW={'4xl'}
                bg="rgba(255, 255, 255, 0.1)" // Lighter and more transparent background
                backdropFilter="blur(10px)" // Optional: Apply a blur effect to the background behind the container
                borderRadius={'lg'}
                p={{ base: 6, md: 16 }}
                textAlign={'center'}
                mt={{ base: 16, md: 0 }}
            >
                <Heading
                    fontSize={{ base: '2xl', md: '4xl' }}
                    color={'primary.500'}
                    fontWeight={600}
                >
                    We’re thrilled to have you with us! 📸
                </Heading>

                <Text
                    align={'center'}
                    color={'primary.500'}
                    fontWeight={500}
                    variant={'heading'}
                    fontSize={{ base: 'xl', md: '2xl' }}
                    mt={4}
                >
                    Share Your Moments
                </Text>
                <Text
                    fontSize={{ base: 'sm', md: 'lg' }}
                    color={'primary.500'}
                    textShadow={'1px 1px 2px rgba(0, 0, 0, 0.5)'}
                >
                    Capture and share your photos from the event by clicking the button
                    below. Your snapshots will be featured in our event gallery!
                </Text>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handlePhotoUpload}
                />
                <Button
                    leftIcon={<MdAddAPhoto />}
                    size={buttonSize}
                    onClick={() => {
                        if (fileInputRef.current) {
                            fileInputRef.current.click();
                        }
                    }}
                >
                    Share
                </Button>

                <Text
                    align={'center'}
                    color={'primary.500'}
                    fontWeight={500}
                    variant={'heading'}
                    fontSize={{ base: 'xl', md: '2xl' }}
                    mt={4}
                >
                    Send a Message
                </Text>
                <Text
                    fontSize={{ base: 'sm', md: 'lg' }}
                    color={'primary.500'}
                    textShadow={'1px 1px 2px rgba(0, 0, 0, 0.5)'}
                >
                    Want to send a personal note to the happy couple? Just click the
                    button below to share your thoughts and best wishes privately.
                </Text>
                <Button
                    leftIcon={<MdSend />}
                    size={buttonSize}
                    onClick={() => setModal(true)}
                >
                    Create a message
                </Button>
            </VStack>

            <EventSendMessage isOpen={modal} onClose={() => setModal(false)} />
        </Flex>
    );
}
