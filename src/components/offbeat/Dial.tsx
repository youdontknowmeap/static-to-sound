import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { STATIONS } from "./stations";

type Props = {
  stationId: number;
  onChange: (id: number, dragging: boolean) => void;
  nudge: number; // increments to trigger a nudge animation
};

export function Dial({ stationId, onChange, nudge }: Props) {
  const rotation = useMotionValue(STATIONS[stationId].angle);
  const knobRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startAngle = useRef(0);
  const startRot = useRef(0);
  const [pulse, setPulse] = useState(0);
  const lastSnapped = useRef(stationId);

  const getCenter = () => {
    const el = knobRef.current!;
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  const angleFromPointer = (x: number, y: number) => {
    const c = getCenter();
    return (Math.atan2(y - c.y, x - c.x) * 180) / Math.PI;
  };

  const snapTo = (id: number) => {
    const target = STATIONS[id].angle;
    animate(rotation, target, {
      type: "spring",
      stiffness: 220,
      damping: 14,
      mass: 0.8,
    });
    setPulse((p) => p + 1);
    lastSnapped.current = id;
    onChange(id, false);
  };

  const nearestStation = (deg: number) => {
    let best = 0, bestD = Infinity;
    STATIONS.forEach((s) => {
      const d = Math.abs(s.angle - deg);
      if (d < bestD) { bestD = d; best = s.id; }
    });
    return best;
  };

  // External stationId change (e.g. initial) — snap if not dragging
  useEffect(() => {
    if (!dragging.current && stationId !== lastSnapped.current) {
      snapTo(stationId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationId]);

  // Nudge animation
  useEffect(() => {
    if (nudge === 0) return;
    const current = rotation.get();
    animate(rotation, current + 10, {
      duration: 0.2,
      onComplete: () => animate(rotation, current, { duration: 0.25 }),
    });
  }, [nudge]); // eslint-disable-line

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    dragging.current = true;
    startAngle.current = angleFromPointer(e.clientX, e.clientY);
    startRot.current = rotation.get();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const a = angleFromPointer(e.clientX, e.clientY);
    let delta = a - startAngle.current;
    // normalize delta around 0
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    let next = startRot.current + delta;
    next = Math.max(-120, Math.min(120, next));
    rotation.set(next);
    const near = nearestStation(next);
    onChange(near, true);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
    snapTo(nearestStation(rotation.get()));
  };

  // tick marks
  const ticks = Array.from({ length: 21 });

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <div
        className="relative"
        style={{ width: "var(--knob-size)", height: "var(--knob-size)" }}
      >
        {/* outer tick ring */}
        <div className="absolute inset-0 rounded-full" aria-hidden>
          {ticks.map((_, i) => {
            const deg = -120 + (240 / (ticks.length - 1)) * i;
            const isStation = STATIONS.some((s) => Math.abs(s.angle - deg) < 0.5);
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 origin-bottom"
                style={{
                  height: "calc(var(--knob-size) / 2 + 14px)",
                  transform: `translate(-50%, -100%) rotate(${deg}deg)`,
                }}
              >
                <div
                  style={{
                    width: isStation ? 2 : 1,
                    height: isStation ? 10 : 6,
                    background: isStation ? "var(--accent)" : "#3a3a3a",
                    margin: "0 auto",
                  }}
                />
              </div>
            );
          })}
        </div>

        <motion.div
          ref={knobRef}
          data-cursor="grab"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="knob absolute inset-0 rounded-full touch-none"
          style={{ rotate: rotation }}
          animate={{ scale: pulse > 0 ? [1, 0.97, 1.03, 1] : 1 }}
          transition={{ duration: 0.22 }}
        >
          <div className="knob-notch" />
          <div className="absolute inset-[18%] rounded-full border border-[#222] bg-[#0a0a0a]" />
        </motion.div>
      </div>

      <div className="font-mono-ob text-[10px] md:text-xs tracking-[0.3em] uppercase" style={{ color: "var(--text-secondary)" }}>
        ← drag to tune →
      </div>
    </div>
  );
}
