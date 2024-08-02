import { useSprings, animated } from '@react-spring/web';
import React from 'react';

export const SplitText = ({ text, className = '', delay = 100 }) => {
  const letters = text.split('');
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
      { threshold: 0.1, rootMargin: '-100px' }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const springs = useSprings(
    letters.length,
    letters.map((_, i) => ({
      from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
      to: async (next) => {
        await next({ opacity: 1, transform: 'translate3d(0,0px,0)' });
        await next({ opacity: 1, transform: 'translate3d(0,0,0)' });
      },
      delay: i * delay,
    }))
  );

  return (
    <p className={`split-parent ${className}`} ref={ref}>
      {springs.map((props, index) => (
        <animated.span key={index} style={props} className="letter">
          {letters[index] === ' ' ? '\u00A0' : letters[index]}
        </animated.span>
      ))}
    </p>
  );
};
