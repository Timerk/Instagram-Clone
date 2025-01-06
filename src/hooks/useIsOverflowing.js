import { useState, useEffect, useRef } from "react";

const useIsOverflowing = (dependencies = []) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const ref = useRef(null);
  const [isCheckingOverflow, setIsCheckingOverflow] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (ref.current) {
        const { scrollWidth, clientWidth } = ref.current;
        setIsOverflowing(scrollWidth >= clientWidth);
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
  }, dependencies);

  return [isOverflowing, ref];
};

export default useIsOverflowing;
