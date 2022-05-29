import { useState } from 'react';
import { useEventListener } from './useEventListener';

const getPosition = () => typeof window !== 'undefined' ? { x: window.pageXOffset, y: window.pageYOffset } : { x: 0, y: 0 };


const setPosition = ({ x, y }) => {
    if (typeof window !== 'undefined') {
        const scrollOptions = { behavior: 'smooth' };

        if (typeof x === 'number') scrollOptions.left = x;
        if (typeof y === 'number') scrollOptions.top = y;

        window.scrollTo(scrollOptions);
    }
}

export function useScrollPosition() {
    const [currentPosition, setCurrentPosition] = useState(getPosition());
    ['scroll', 'resize'].forEach((item) => useEventListener(item, () => setCurrentPosition(getPosition())));

    return [currentPosition, setPosition];
}