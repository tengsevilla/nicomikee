import { Flex, useBreakpointValue } from '@chakra-ui/react';
import BGFullCentered from '../../core/assets/images/bg-full-centered.jpg';
import BGMobileCentered from '../../core/assets/images/bg-mobile-centered.jpg';
import PhotoGridMasonry, { IImageProp } from '../../components/Masonry/PhotoGrindMasonry';
import { useMutation } from '@tanstack/react-query';
import { fetchAllImageURL } from '../../core/models/useImageStore';
import { useEffect, useState } from 'react';

const EventGallery = () => {
    const [images, setImages] = useState<IImageProp[]>([]);
    const isMobile = useBreakpointValue({ base: true, md: false });
    const mutation = useMutation({
        mutationFn: fetchAllImageURL,
        onSuccess: (data) => {
            setImages(data);
        },
        onError: (error) => {
            // I will fire first
            console.error(error)
        }
    })

    useEffect(() => {
        mutation.mutate();
    }, []);

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
            {
                images.length > 0 && <PhotoGridMasonry images={images} />
            }
        </Flex>

    );
};

export default EventGallery;
