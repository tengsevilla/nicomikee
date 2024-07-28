import { Box } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const MotionBox = motion(Box);

export const MotionBoxContainer = ({ children }: { children: ReactNode }) => {
    const controls = useAnimation();
    const { ref, inView } = useInView({
        threshold: 0.7,
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        } else {
            controls.start('hidden');
        }
    }, [controls, inView]);

    const boxVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return (
        <MotionBox
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={boxVariants}
            style={{ willChange: 'opacity, transform' }}
        >
            {children}
        </MotionBox>
    );
};
