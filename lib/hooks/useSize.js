const useSize = (ref) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        const { clientWidth, clientHeight } = ref.current;
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    };

    // 
    const resizeObserver = new ResizeObserver(updateDimensions);

    if (ref.current) {
      updateDimensions();
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return dimensions;
};
