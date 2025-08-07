import * as React from "react";

export function useScreenWidth(width: number) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${width - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < width);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < width);
    return () => mql.removeEventListener("change", onChange);
  }, [width]);

  return !!isMobile;
}
