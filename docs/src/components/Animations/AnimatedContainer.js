import React from 'react';
import { useSpring, animated } from '@react-spring/web';

export const AnimatedContainer = ({ children, direction, reverse = false, endPosition = '0', skipObserver = false }) => {
  const [inView, setInView] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current); // Unobserve after triggering the animation
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const directions = {
    vertical: "Y",
    horizontal: "X"
  }

  const springProps = useSpring({
    from: { transform: `translate${directions[direction]}(${reverse ? '-100px' : '100px'})` },
    to: inView || skipObserver ? { transform: `translate${directions[direction]}(${endPosition}px)` } : `translate${directions[direction]}(${reverse && '-'}100px)`,
    config: { tension: 50, friction: 25 },
  });

  return (
    <animated.div ref={ref} style={springProps}>
      {children}
    </animated.div>
  );
};