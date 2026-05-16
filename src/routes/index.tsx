import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cursor } from "@/components/offbeat/Cursor";
import { Dial } from "@/components/offbeat/Dial";
import { FreqDisplay, StationName } from "@/components/offbeat/FreqDisplay";
import { STATIONS, STATION_BG } from "@/components/offbeat/stations";
import {
  Station0Static,
  Station1Who,
  Station2Work,
  Station3Think,
  Station4Pitch,
  Station5Tune,
} from "@/components/offbeat/Stations";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const [stationId, setStationId] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [nudge, setNudge] = useState(0);
  const visited = useRef(new Set<number>([0]));
  const [allVisited, setAllVisited] = useState(false);

  const handleChange = (id: number, isDragging: boolean) => {
    setStationId(id);
    setDragging(isDragging);
    if (!isDragging) {
      visited.current.add(id);
      if (visited.current.size >= 6) setAllVisited(true);
    }
  };

  const station = STATIONS[stationId];
  const bg = STATION_BG[stationId];

  // Trigger a small nudge from Station 4 -> hint toward 5
  const triggerNudge = () => setNudge((n) => n + 1);

  return (
    <div
      className="fixed inset-0 overflow-hidden transition-colors duration-700"
      style={{
        background: bg,
        ["--knob-size" as any]: "clamp(130px, 18vw, 200px)",
      }}
    >
      <Cursor />
      <div className="grain-overlay" data-intense={dragging ? "true" : "false"} />

      {/* Top bar */}
      <header className="relative z-20 flex items-center justify-between px-5 md:px-10 py-5 md:py-7">
        <FreqDisplay value={station.freq} scrambling={dragging} />
        <StationName name={station.name} scrambling={dragging} />
      </header>

      {/* Content area */}
      <main
        className="relative z-10 flex items-center justify-center transition-all duration-300"
        style={{
          height: "calc(100vh - 80px - clamp(190px, 26vh, 280px))",
          filter: dragging ? "blur(4px)" : "blur(0)",
          opacity: dragging ? 0.6 : 1,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={stationId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex items-center justify-center"
          >
            {stationId === 0 && <Station0Static />}
            {stationId === 1 && <Station1Who />}
            {stationId === 2 && <Station2Work />}
            {stationId === 3 && <Station3Think />}
            {stationId === 4 && <Station4Pitch onAccept={triggerNudge} />}
            {stationId === 5 && <Station5Tune allVisited={allVisited} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Dial pinned bottom */}
      <footer className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center pb-8 md:pb-10">
        <Dial stationId={stationId} onChange={handleChange} nudge={nudge} />
      </footer>

      {/* corner brand */}
      <div className="absolute bottom-4 left-5 z-20 font-mono-ob text-[10px] tracking-[0.3em]" style={{ color: "var(--text-secondary)" }}>
        OFF/BEAT · TUNING IN
      </div>
      <div className="absolute bottom-4 right-5 z-20 font-mono-ob text-[10px] tracking-[0.3em]" style={{ color: "var(--text-secondary)" }}>
        ARYAMAN · 2025
      </div>
    </div>
  );
}
