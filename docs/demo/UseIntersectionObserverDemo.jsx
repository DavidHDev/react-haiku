import { useIntersectionObserver } from 'react-haiku';
import React from 'react';

export const UseIntersectionObserverDemo = () => {
  const {observeRef, isVisible} = useIntersectionObserver({
    animateOnce: false,
    options:{
      threshold: .5, 
      rootMargin: '-40% 0px -40% 0px'
    }
  })
    return (
        <div className="demo-container-center">
          <b style={{ "marginBottom": "1em" }}>Scroll Your Window!</b>
          <p ref={observeRef} style={{ "marginBottom": "0" }}>
            We <span style={{"color": "#E46B39"}}>{isVisible? 'are': 'are not'}</span> intersecting!
          </p>
        </div>
    );
}