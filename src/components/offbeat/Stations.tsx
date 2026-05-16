import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MAILTO, PORTFOLIO, LINKEDIN } from "./stations";

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

export function Station0Static() {
  return (
    <div className="relative w-full h-full static-noise flex items-center justify-center overflow-hidden">
      <div className="text-center">
        <div className="font-mono-ob text-base md:text-2xl tracking-[0.3em]" style={{ color: "var(--text-primary)" }}>
          ░░ SEARCHING FOR SIGNAL ░░
        </div>
        <div className="mt-6 font-mono-ob text-xs md:text-sm uppercase tracking-[0.4em]" style={{ color: "var(--text-secondary)" }}>
          drag the dial
        </div>
      </div>
    </div>
  );
}

export function Station1Who() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 grid md:grid-cols-[1fr_auto] gap-10 items-center">
      <div className="max-w-xl">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="font-mono-ob text-[11px] tracking-[0.3em]" style={{ color: "var(--text-secondary)" }}>
          STATION IDENT: 91.3 — WHO AM I
        </motion.div>
        <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show" className="font-display italic font-bold text-5xl md:text-7xl mt-6" style={{ color: "var(--text-primary)" }}>
          ARYAMAN.
        </motion.h1>
        <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show" className="mt-4 text-lg md:text-xl" style={{ color: "var(--text-primary)" }}>
          Product Designer.<br />Based in India.<br />Building things that feel inevitable in hindsight.
        </motion.p>
        <motion.p custom={4} variants={fadeUp} initial="hidden" animate="show" className="mt-6 text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
          1 year designing products people actually use.
        </motion.p>
        <motion.p custom={6} variants={fadeUp} initial="hidden" animate="show" className="mt-6 font-display italic text-xl md:text-2xl" style={{ color: "var(--accent)" }}>
          Currently tuned in to: what's next.
        </motion.p>
      </div>
      <motion.div custom={8} variants={fadeUp} initial="hidden" animate="show" className="hidden md:flex items-end gap-2 h-40">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="eq-bar"
            style={{
              animationDelay: `${i * 0.12}s`,
              animationDuration: `${0.7 + (i % 3) * 0.2}s`,
              height: `${40 + (i * 11) % 60}%`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

const tracks = [
  {
    num: "01",
    title: "DRUNKIN'",
    summary: ["Strava for alcohol. Built in a weekend.", "It works. You're welcome."],
    tags: "APP PROTOTYPE · UX",
  },
  {
    num: "02",
    title: "CLARITY",
    summary: ["A financial tracking app.", "Numbers you can actually read."],
    tags: "PRODUCT DESIGN · FINTECH",
  },
];

export function Station2Work() {
  return (
    <div className="w-full max-w-3xl mx-auto px-6">
      <div className="font-mono-ob text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--text-secondary)" }}>
        NOW PLAYING — YOUR REQUESTS
      </div>
      <div className="mt-8 space-y-1">
        {tracks.map((t, i) => (
          <motion.a
            key={t.num}
            href={PORTFOLIO}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="track relative py-5 cursor-pointer border-t block"
            style={{ borderColor: "var(--border-ob)" }}
            data-cursor="grab"
          >
            <div className="sweep absolute inset-y-0 left-0 w-0" style={{ background: "rgba(232,160,48,0.18)" }} />
            <div className="relative flex items-baseline gap-4 md:gap-6">
              <span className="play-icon inline-block" style={{ color: "var(--accent)" }}>▶</span>
              <span className="font-mono-ob text-sm w-8" style={{ color: "var(--text-secondary)" }}>{t.num}</span>
              <div className="flex-1">
                <div className="font-display italic text-2xl md:text-3xl" style={{ color: "var(--text-primary)" }}>{t.title}</div>
                {t.summary.map((s, j) => (
                  <div key={j} className="text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>{s}</div>
                ))}
                <div className="mt-2 font-mono-ob text-[10px] tracking-[0.2em]" style={{ color: "var(--text-secondary)" }}>{t.tags}</div>
              </div>
              <span className="font-mono-ob text-xs self-center" style={{ color: "var(--accent)" }}>↗</span>
            </div>
          </motion.a>
        ))}
        <div className="border-t" style={{ borderColor: "var(--border-ob)" }} />
      </div>
    </div>
  );
}

const statements = [
  ["If the user needs a tooltip", "to find the button,", "", "the button lost."],
  ["\"Make the logo bigger\"", "is just trauma", "in stakeholder form."],
  ["Every dark pattern", "is a designer who lost", "an argument with the growth team."],
  ["Hamburger menus are where", "features go to die", "with dignity."],
  ["The empty state is the only screen", "your user will judge you by", "before they've done anything."],
  ["I don't design for the user.", "I design for the user", "at 11:47pm, on 4% battery, on the train."],
  ["A confirmation modal", "is an apology", "you wrote in advance."],
  ["The best onboarding", "is the one nobody noticed", "they were in."],
];

export function Station3Think() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % statements.length), 4000);
    return () => clearInterval(id);
  }, [paused]);

  const go = (d: number) => {
    setPaused(true);
    setIdx((i) => (i + d + statements.length) % statements.length);
  };

  // dots
  const dots = useState(() =>
    Array.from({ length: 120 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      d: Math.random() * 8 + 6,
    }))
  )[0];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2, height: 2,
              left: `${dot.x}%`, top: `${dot.y}%`,
              background: "var(--text-primary)",
              opacity: 0.18,
              animation: `drift ${dot.d}s ease-in-out infinite`,
              animationDelay: `${(i % 10) * 0.4}s`,
            }}
          />
        ))}
      </div>

      <button onClick={() => go(-1)} data-cursor="grab" className="absolute left-4 md:left-10 text-3xl md:text-5xl" style={{ color: "var(--text-secondary)" }}>‹</button>
      <button onClick={() => go(1)} data-cursor="grab" className="absolute right-4 md:right-10 text-3xl md:text-5xl" style={{ color: "var(--text-secondary)" }}>›</button>

      <motion.div
        key={idx}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl text-center px-8"
      >
        <div className="font-display italic text-2xl md:text-[36px] leading-tight" style={{ color: "var(--text-primary)" }}>
          {statements[idx].map((line, i) => (
            <div key={i}>{line || "\u00A0"}</div>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {statements.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: i === idx ? "var(--accent)" : "transparent",
              border: "1px solid var(--accent)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function Station4Pitch({ onAccept }: { onAccept: () => void }) {
  const [received, setReceived] = useState(false);
  return (
    <div className="w-full max-w-2xl mx-auto px-6 relative">
      <div className="absolute right-6 -top-2 md:right-0 md:-top-8 flex items-center gap-2 font-mono-ob text-xs" style={{ color: "var(--text-primary)" }}>
        <span className="live-dot w-2 h-2 rounded-full" style={{ background: "var(--accent-live)" }} />
        LIVE
      </div>

      {!received ? (
        <div className="space-y-5">
          {[
            <>You're building something<br />nobody's seen before.</>,
            <>That means the design brief<br />doesn't exist yet.</>,
            <>I've spent 5 years designing in<br />exactly that condition.</>,
            <><span style={{ color: "var(--accent)" }} className="font-display italic">I don't need a brief.<br />I help write it.</span></>,
            <>OFF/BEAT needs a designer<br />who thinks like a founder.</>,
          ].map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="text-xl md:text-2xl"
              style={{ color: "var(--text-primary)" }}
            >
              {line}
            </motion.p>
          ))}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            data-cursor="grab"
            onClick={() => {
              setReceived(true);
              setTimeout(onAccept, 1500);
            }}
            className="mt-6 font-mono-ob uppercase tracking-[0.15em] px-6 py-3 border transition-colors"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--bg-base)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
          >
            [ That's the job. I want it. ]
          </motion.button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="font-mono-ob text-xl md:text-2xl" style={{ color: "var(--accent)" }}>
            ✓ SIGNAL RECEIVED.
          </div>
          <div className="text-lg md:text-xl" style={{ color: "var(--text-primary)" }}>
            Keep tuning <motion.span animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="inline-block">→</motion.span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function Station5Tune({ allVisited }: { allVisited: boolean }) {
  const [showEgg, setShowEgg] = useState(false);
  useEffect(() => {
    if (!allVisited) return;
    const id = setTimeout(() => setShowEgg(true), 600);
    return () => clearTimeout(id);
  }, [allVisited]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(232,160,48,0.08), transparent 60%)" }}
      />
      <div className="relative max-w-xl text-center px-6">
        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="font-display italic font-bold text-4xl md:text-6xl" style={{ color: "var(--text-primary)" }}>
          YOU MADE IT.
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-6 text-base md:text-lg" style={{ color: "var(--text-secondary)" }}>
          Either you were very curious,<br />or very bored.
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4 text-lg md:text-xl" style={{ color: "var(--text-primary)" }}>
          Either way — hi.<br />I'm Aryaman.
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-4 font-display italic text-xl md:text-2xl" style={{ color: "var(--accent)" }}>
          Let's talk.
        </motion.p>

        <motion.a
          href={MAILTO}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          data-cursor="grab"
          className="mt-8 inline-block font-mono-ob uppercase tracking-[0.1em] px-10 py-3.5 border transition-all"
          style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "var(--accent)";
            el.style.color = "var(--bg-base)";
            el.style.boxShadow = "0 0 24px rgba(232,160,48,0.4)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "transparent";
            el.style.color = "var(--accent)";
            el.style.boxShadow = "none";
          }}
        >
          [ Tune in together → ]
        </motion.a>

        <div className="mt-6 flex justify-center gap-6 font-mono-ob text-xs" style={{ color: "var(--text-secondary)" }}>
          <a href={PORTFOLIO} target="_blank" rel="noreferrer" className="ob-link" data-cursor="grab">↗ Portfolio</a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer" className="ob-link" data-cursor="grab">↗ LinkedIn</a>
          <a href={MAILTO} className="ob-link" data-cursor="grab">✉ Email</a>
        </div>

        <p className="mt-4 font-body-ob italic text-xs" style={{ color: "var(--text-secondary)" }}>
          or just keep tuning. i don't mind.
        </p>

        {showEgg && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-10 font-body-ob italic text-sm"
            style={{ color: "var(--accent)" }}
          >
            ps. you explored every frequency.<br />you're going to fit right in.
          </motion.p>
        )}
      </div>
    </div>
  );
}
