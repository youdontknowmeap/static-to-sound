export type Station = {
  id: number;
  angle: number;
  freq: string;
  name: string;
};

export const STATIONS: Station[] = [
  { id: 0, angle: -120, freq: "87.5", name: "░░ STATIC ░░" },
  { id: 1, angle: -60, freq: "91.3", name: "WHO AM I" },
  { id: 2, angle: 0, freq: "95.7", name: "THE WORK" },
  { id: 3, angle: 40, freq: "99.1", name: "HOW I THINK" },
  { id: 4, angle: 80, freq: "103.5", name: "OFF/BEAT & ME" },
  { id: 5, angle: 120, freq: "107.9", name: "TUNE IN" },
];

export const STATION_BG: Record<number, string> = {
  0: "#080808",
  1: "#120C06",
  2: "#08080F",
  3: "#06080F",
  4: "#120A04",
  5: "#080808",
};

export const EMAIL = "aryamanpage7@gmail.com";
export const PORTFOLIO = "https://aryamanpage.vercel.app";
export const LINKEDIN = "https://www.linkedin.com/in/aryaman-page-03372b1bb/";
export const MAILTO = `mailto:${EMAIL}?subject=Found%20your%20frequency%20%E2%80%94%20let%27s%20talk%2C%20Aryaman`;
