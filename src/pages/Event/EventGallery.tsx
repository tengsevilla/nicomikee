import { Flex, useBreakpointValue } from '@chakra-ui/react';
import BGFullCentered from '../../core/assets/images/bg-full-centered.jpg';
import BGMobileCentered from '../../core/assets/images/bg-mobile-centered.jpg';
import PhotoGridMasonry from '../../components/Masonry/PhotoGrindMasonry';

const EventGallery = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Flex
            backgroundImage={isMobile ? BGMobileCentered : BGFullCentered}
            backgroundPosition={'center center'}
            backgroundSize={'100% auto'}
            align={'center'}
            justify={'center'}
            p={{ base: 4, md: 8 }}
        >
            {/* Add your gallery content here */}
            <PhotoGridMasonry />
        </Flex>

    );
};

export default EventGallery;
