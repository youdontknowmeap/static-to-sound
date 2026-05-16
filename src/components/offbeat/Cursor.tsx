import { useEffect, useRef } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const x = e.clientX, y = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x - 2}px, ${y - 2}px, 0)`;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x - 14}px, ${y - 14}px, 0)`;
        const el = (e.target as HTMLElement)?.closest("[data-cursor='grab']");
        ringRef.current.dataset.grab = el ? "true" : "false";
      }
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring hidden md:block" />
      <div ref={dotRef} className="cursor-dot hidden md:block" />
    </>
  );
}
