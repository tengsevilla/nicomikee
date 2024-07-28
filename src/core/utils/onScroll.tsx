import { useState, useEffect } from 'react';

const onScroll = (scrollThreshold: number) => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        // Function to handle scroll event
        const handleScroll = () => {
            if (window.scrollY > scrollThreshold) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        // Add the scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Remove the scroll event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollThreshold]);

    return isSticky;
};

export default onScroll;
