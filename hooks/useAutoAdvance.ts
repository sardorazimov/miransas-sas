import { useEffect, useRef } from "react";

export function useAutoAdvance(
  callback: () => void,
  interval: number,
  paused: boolean,
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => callbackRef.current(), interval);
    return () => clearInterval(timer);
  }, [interval, paused]);
}
