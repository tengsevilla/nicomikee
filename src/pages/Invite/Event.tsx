import { Flex, Text, VStack, Card, useBreakpointValue } from '@chakra-ui/react'
import BGFullCentered from '../../core/assets/images/bg-full-centered.jpg';
import { MotionBoxContainer } from '../../components/MotionBox/MotionBoxContainer';
import { useEffect, useRef, useState } from 'react';
import { useSpring, animated, to, a } from '@react-spring/web'
import { useGesture } from 'react-use-gesture'
import styles from './Event.module.css'
import BGCard from '../../core/assets/images/bg-card.jpg';
import BGCard2 from '../../core/assets/images/bg-card2.jpg';

export default function EventContainer() {
    const isMobile = useBreakpointValue({ base: true, md: false });
    return (
        <MotionBoxContainer>
            <Flex
                w={'full'}
                h={'100vh'}
                backgroundImage={BGFullCentered}
                backgroundSize={'cover'}
                backgroundPosition={'center center'}
            >
                <VStack
                    w={'full'}
                    justify={'center'}
                >
                    {isMobile ?
                        <MobileViewCard />
                        :
                        <>
                            <EventDetails />
                            <EventGuide />
                        </>
                    }


                </VStack>
            </Flex >
        </MotionBoxContainer>
    )
}

const calcX = (y: number, ly: number) => -(y - ly - window.innerHeight / 2) / 20
const calcY = (x: number, lx: number) => (x - lx - window.innerWidth / 2) / 20


export const EventDetails = () => {
    useEffect(() => {
        const preventDefault = (e: Event) => e.preventDefault()
        document.addEventListener('gesturestart', preventDefault)
        document.addEventListener('gesturechange', preventDefault)

        return () => {
            document.removeEventListener('gesturestart', preventDefault)
            document.removeEventListener('gesturechange', preventDefault)
        }
    }, [])


    const domTarget = useRef(null)
    const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(
        () => ({
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 1,
            zoom: 0,
            x: -250,
            y: 150,
            config: { mass: 5, tension: 350, friction: 40 },
        })
    )

    useGesture(
        {
            // onDrag: ({ active, offset: [x, y] }) =>
            //     api({ x, y, rotateX: 0, rotateY: 0, scale: active ? 1 : 1.1 }),
            onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200, rotateZ: a }),
            onMove: ({ xy: [px, py], dragging }) =>
                !dragging &&
                api({
                    rotateX: calcX(py, y.get()),
                    rotateY: calcY(px, x.get()),
                    scale: 1.1,
                }),
            onHover: ({ hovering }) =>
                !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 }),
        },
        { domTarget, eventOptions: { passive: false } }
    )
    return (
        <Flex>
            <animated.div
                ref={domTarget}
                style={{
                    transform: 'perspective(600px)',
                    x,
                    y,
                    scale: to([scale, zoom], (s, z) => s + z),
                    rotateX,
                    rotateY,
                    rotateZ,
                }}>
                <Card
                    h={560}
                    w={520}
                    _hover={{ boxShadow: '0px 30px 100px -10px rgba(0, 0, 0, 0.4)' }}
                    boxShadow={'0px 10px 30px -5px rgba(0, 0, 0, 0.3)'}
                    transition={'box-shadow 0.5s, opacity 0.5s;'}
                    willChange={'transform'}
                    borderRadius={'16px'}
                    textAlign={'center'}
                    py={{ base: 4, md: 8 }}
                    px={12}
                    onClick={(e) => e.stopPropagation()}
                    backgroundImage={`url(${BGCard})`}
                    backgroundSize={'cover'}
                    backgroundPosition={'center center'}
                >
                    <Text ><Text as={'span'} >Date:</Text> January 01, 2050</Text>
                    <Text ><Text as={'span'} >Time:</Text> 1:30 PM</Text>
                    <Text ><Text as={'span'} >Church:</Text> The Church Philippines</Text>
                    <Text ><Text as={'span'} >Reception:</Text> Tokyo Dome Japan</Text>
                    <Text ><Text as={'span'} >Dress code:</Text> Samurai</Text>
                    <Text color={'gray.500'} mt={4}>Color palette for guest</Text>
                    <Text >Gray, silver, nudes and beige</Text>
                    <Text color={'gray.500'} mt={4}>Gentlemen</Text>
                    <Text >Classic rare equipment with resistance to fear</Text>
                    <Text color={'gray.500'} mt={4}>Ladies</Text>
                    <Text >Formal long dress in shades of gray, silver, nude and beige</Text>
                </Card>
            </animated.div>
        </Flex>
    )
}


export const EventGuide = () => {
    useEffect(() => {
        const preventDefault = (e: Event) => e.preventDefault()
        document.addEventListener('gesturestart', preventDefault)
        document.addEventListener('gesturechange', preventDefault)

        return () => {
            document.removeEventListener('gesturestart', preventDefault)
            document.removeEventListener('gesturechange', preventDefault)
        }
    }, [])


    const domTarget = useRef(null)
    const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(
        () => ({
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 1,
            zoom: 0,
            x: 250,
            y: -150,
            config: { mass: 5, tension: 350, friction: 40 },
        })
    )

    useGesture(
        {
            // onDrag: ({ active, offset: [x, y] }) =>
            //     api({ x, y, rotateX: 0, rotateY: 0, scale: active ? 1 : 1.1 }),
            onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200, rotateZ: a }),
            onMove: ({ xy: [px, py], dragging }) =>
                !dragging &&
                api({
                    rotateX: calcX(py, y.get()),
                    rotateY: calcY(px, x.get()),
                    scale: 1.1,
                }),
            onHover: ({ hovering }) =>
                !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 }),
        },
        { domTarget, eventOptions: { passive: false } }
    )
    return (
        <Flex>
            <animated.div
                ref={domTarget}
                style={{
                    transform: 'perspective(600px)',
                    x,
                    y,
                    scale: to([scale, zoom], (s, z) => s + z),
                    rotateX,
                    rotateY,
                    rotateZ,
                }}>
                <Card
                    h={560}
                    w={520}
                    _hover={{ boxShadow: '0px 30px 100px -10px rgba(0, 0, 0, 0.4)' }}
                    boxShadow={'0px 10px 30px -5px rgba(0, 0, 0, 0.3)'}
                    transition={'box-shadow 0.5s, opacity 0.5s;'}
                    willChange={'transform'}
                    borderRadius={'16px'}
                    textAlign={'center'}
                    py={{ base: 4, md: 8 }}
                    px={12}
                    onClick={(e) => e.stopPropagation()}
                    backgroundImage={`url(${BGCard2})`}
                    backgroundSize={'cover'}
                    backgroundPosition={'center center'}
                >
                    <Text mt={16} mb={2} color={'gray.500'}>NO TO THE FOLLOWING PLEASE</Text>
                    <Text >Strictly no wearing of white dress, loud colors, faded denim, ripped jeans, shirt, shorts, & flipflops</Text>
                    <Text mt={8} mb={2} color={'gray.500'}>GIFT GUIDE</Text>
                    <Text >As love is what this day is all about, your presence is one we can’t celebrate without. But should you still believe that a gift is worth giving, a small envelope for our future home and family is a delightful blessing.</Text>
                </Card>
            </animated.div>
        </Flex>
    )
}

const MobileViewCard = () => {
    const [flipped, set] = useState(false)
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    })
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        set(true);
                    }, 1000);
                    setTimeout(() => {
                        set(false);
                    }, 1500);
                }
            },
            {
                threshold: 1, // Adjust this value as needed
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);
    return (
        <div ref={ref} className={styles.container} onClick={(e) => {
            e.stopPropagation();
            set(state => !state);
        }} >
            <a.div
                className={`${styles.c} ${styles.back}`}
                style={{ opacity: opacity.to(o => 1 - o), transform }}
            >
                <Card
                    w={'calc(100vw - 80px)'}
                    h={{ base: 480, sm: 480, md: 640 }}
                    boxShadow={'0px 10px 30px -5px rgba(0, 0, 0, 0.3)'}
                    textAlign={'center'}
                    p={8}
                    backgroundImage={`url(${BGCard})`}
                    backgroundSize={'cover'}
                    backgroundPosition={'center center'}
                >
                    <Text ><Text as={'span'} >Date:</Text> January 01, 2050</Text>
                    <Text ><Text as={'span'} >Time:</Text> 1:30 PM</Text>
                    <Text ><Text as={'span'} >Church:</Text> The Church Philippines</Text>
                    <Text ><Text as={'span'} >Reception:</Text> Tokyo Dome Japan</Text>
                    <Text ><Text as={'span'} >Dress code:</Text> Samurai</Text>
                    <Text color={'gray.500'} mt={4}>Color palette for guest</Text>
                    <Text >Gray, silver, nudes and beige</Text>
                    <Text color={'gray.500'} mt={4}>Gentlemen</Text>
                    <Text >Classic rare equipment with resistance to fear</Text>
                    <Text color={'gray.500'} mt={4}>Ladies</Text>
                    <Text >Formal long dress in shades of gray, silver, nude and beige</Text>
                </Card>
            </a.div>
            <a.div
                className={`${styles.c} ${styles.front}`}
                style={{
                    opacity,
                    transform,
                    rotateY: '180deg',
                }}
            >
                <Card
                    w={'calc(100vw - 80px)'}
                    h={{ base: 480, sm: 480, md: 640 }}
                    boxShadow={'0px 10px 30px -5px rgba(0, 0, 0, 0.3)'}
                    textAlign={'center'}
                    p={8}
                    backgroundImage={`url(${BGCard2})`}
                    backgroundSize={'cover'}
                    backgroundPosition={'center center'}
                >
                    <Text mt={{ base: 8, sm: 8, md: 12 }} mb={2} color={'gray.500'}>NO TO THE FOLLOWING PLEASE</Text>
                    <Text >Strictly no wearing of white dress, loud colors, faded denim, ripped jeans, shirt, shorts, & flipflops</Text>
                    <Text mt={8} mb={2} color={'gray.500'}>GIFT GUIDE</Text>
                    <Text >As love is what this day is all about, your presence is one we can’t celebrate without. But should you still believe that a gift is worth giving, a small envelope for our future home and family is a delightful blessing.</Text>
                </Card>
            </a.div>
        </div>
    )
}
