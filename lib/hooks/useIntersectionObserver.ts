import { useEffect, useState, useRef } from "react";

type IntersectionObserverOptions = {
  threshold?: number;
  rootMargin?: string;
};

type UseIntersectionObserverProps = {
  animateOnce?: boolean;
  options?: IntersectionObserverOptions;
};

export const useIntersectionObserver = ({
  animateOnce = false,
  options = {}
}: UseIntersectionObserverProps = {}) => {
  const observeRef = useRef<Element | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = observeRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      setIsVisible(entry.isIntersecting);

      if (entry.isIntersecting && animateOnce) {
        observer.disconnect();
      }
    }, options);

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { observeRef, isVisible };
};