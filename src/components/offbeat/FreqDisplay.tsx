import { useEffect, useState } from "react";

export function FreqDisplay({ value, scrambling }: { value: string; scrambling: boolean }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (scrambling) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      if (i > 6) {
        setDisplay(value);
        clearInterval(id);
      } else {
        const n = (80 + Math.random() * 30).toFixed(1);
        setDisplay(n);
      }
    }, 40);
    return () => clearInterval(id);
  }, [value, scrambling]);

  useEffect(() => {
    if (!scrambling) return;
    const id = setInterval(() => {
      setDisplay((80 + Math.random() * 30).toFixed(1));
    }, 60);
    return () => clearInterval(id);
  }, [scrambling]);

  return (
    <span className="font-mono-ob text-xl md:text-[28px] tracking-tight" style={{ color: "var(--text-primary)" }}>
      [ {display} FM ]
    </span>
  );
}

export function StationName({ name, scrambling }: { name: string; scrambling: boolean }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    if (scrambling) {
      setShown("░░ SEARCHING ░░");
      return;
    }
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(name.slice(0, i));
      if (i >= name.length) clearInterval(id);
    }, 80);
    return () => clearInterval(id);
  }, [name, scrambling]);

  return (
    <span className="font-mono-ob text-sm md:text-base tracking-[0.2em]" style={{ color: "var(--accent)" }}>
      [ {shown || "\u00A0"} ]
    </span>
  );
}
