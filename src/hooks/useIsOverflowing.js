import { useState, useEffect, useRef } from "react";

const useIsOverflowing = () => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (ref.current) {
        const { scrollWidth, clientWidth } = ref.current;
        setIsOverflowing(scrollWidth > clientWidth);
      }
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    window.addEventListener("resize", checkOverflow);

    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  return [isOverflowing, ref];
};

export default useIsOverflowing;
