import { useState, useEffect, useMemo } from 'react'
import useMeasure from 'react-use-measure'
import { useTransition, a } from '@react-spring/web'
import shuffle from 'lodash/shuffle'

import styles from './PhotoGridMasonry.module.css'

export interface IImageProp {
    url: string;
    height: number;
}

interface Prop {
    images: IImageProp[];
}
export default function PhotoGridMasonry({ images }: Prop) {
    // Hook1: Tie media queries to the number of columns
    const columns = useMedia(['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'], [5, 4, 3], 2)
    // Hook2: Measure the width of the container element
    const [ref, { width }] = useMeasure()
    // Hook3: Hold items
    const [items, set] = useState(images)
    // Hook4: shuffle data every 2 seconds
    useEffect(() => {
        const t = setInterval(() => set(shuffle), 8000)
        return () => clearInterval(t)
    }, [])
    // Hook5: Form a grid of stacked items using width & columns we got from hooks 1 & 2
    const [heights, gridItems] = useMemo(() => {
        let heights = new Array(columns).fill(0) // Each column gets a height starting with zero
        let gridItems = items.map((child) => {
            const column = heights.indexOf(Math.min(...heights)) // Basic masonry-grid placing, puts tile into the smallest column using Math.min
            const x = (width / columns) * column // x = container width / number of columns * column index,
            const y = (heights[column] += child.height / 2) - child.height / 2 // y = it's just the height of the current column
            return { ...child, x, y, width: width / columns, height: child.height / 2 }
        })
        return [heights, gridItems]
    }, [columns, items, width])
    // Hook6: Turn the static grid values into animated transitions, any addition, removal or change will be animated
    const transitions = useTransition(gridItems, {
        key: (item: { url: string; height: number }) => item.url,
        from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
        enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
        update: ({ x, y, width, height }) => ({ x, y, width, height }),
        leave: { height: 0, opacity: 0 },
        config: { mass: 5, tension: 500, friction: 100 },
        trail: 25,
    })

    // Auto-scroll functionality
    const [scrollDirection, setScrollDirection] = useState('down');
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        let animationFrameId: number;

        const scroll = () => {
            if (scrollDirection === 'down') {
                if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                    setScrollDirection('up');
                } else {
                    setScrollPosition(window.scrollY + 1);
                }
            } else {
                if (window.scrollY <= 0) {
                    setScrollDirection('down');
                } else {
                    setScrollPosition(window.scrollY - 1);
                }
            }
            window.scrollTo(0, scrollPosition);
            animationFrameId = requestAnimationFrame(scroll);
        };
        animationFrameId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationFrameId);
    }, [scrollDirection, scrollPosition]);

    // Disable mouse scroll
    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            event.preventDefault();
        };
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    // Render the grid
    return (
        <div ref={ref} className={styles.list} style={{ height: Math.max(...heights) }}>
            {transitions((style, item) => (
                <a.div style={style}>
                    {/* <div style={{ backgroundImage: `url(${item.url}?auto=compress&dpr=2&h=500&w=500)` }} /> */}
                    <div style={{ backgroundImage: `url(${item.url})` }} />
                </a.div>
            ))}
        </div>
    )
}

function useMedia(queries: string[], values: number[], defaultValue: number) {
    const match = () => values[queries.findIndex(q => matchMedia(q).matches)] || defaultValue
    const [value, set] = useState(match)
    useEffect(() => {
        const handler = () => set(match)
        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
    }, [])
    return value
}