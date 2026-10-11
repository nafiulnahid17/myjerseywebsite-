import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, SkipForward, Menu, X, ArrowDown, AlertTriangle } from "lucide-react";
import { HERO_POSTER, HERO_VIDEO, HERO_BACKGROUND_4K, HERO_REVEAL_SECONDS } from "@/lib/hero-media";

type Mode = "loading" | "playing" | "paused" | "ended" | "static";

function fmt(t: number) {
  if (!isFinite(t) || t < 0) t = 0;
  const s = Math.floor(t);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#story", label: "The Story" },
    { href: "#craft", label: "The Craft" },
    { href: "#street", label: "The Street" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 md:px-10">
        <a href="#top" className="flex items-center gap-3" data-testid="link-home">
          <span className="font-display text-3xl italic font-bold gold-text leading-none">MJ</span>
          <span className="leading-tight">
            <span className="block text-[13px] font-extrabold tracking-[0.22em]">MY JERSEY</span>
            <span className="block font-mono text-[9px] tracking-[0.3em] text-[#c9a65a]/80">WEAR YOUR IDENTITY</span>
          </span>
        </a>
        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#efe4cc]/75 transition-colors hover:text-[#e9c77b]" data-testid={`link-nav-${l.href.slice(1)}`}>
              {l.label}
            </a>
          ))}
        </nav>
        <button className="grid h-11 w-11 place-items-center rounded-full border border-[#c9a65a]/40 md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} data-testid="button-menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      <div hidden={!open} className="md:hidden overflow-hidden">
        <nav className="mx-5 rounded-2xl border border-[#c9a65a]/25 bg-[#0d0c09]/95 p-3 backdrop-blur" aria-label="Mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-4 text-sm font-semibold uppercase tracking-[0.2em] hover:bg-[#c9a65a]/10" data-testid={`link-mobile-${l.href.slice(1)}`}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<Mode>(HERO_VIDEO ? "loading" : "static");
  const [failed, setFailed] = useState(false);
  const [revealed, setRevealed] = useState(!HERO_VIDEO);
  const [flashKey, setFlashKey] = useState(0);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const revealedRef = useRef(revealed);
  revealedRef.current = revealed;

  useEffect(() => {
    if (!HERO_VIDEO) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const v = videoRef.current;
    if (!v) return;
    if (reduce) { v.pause(); setMode("static"); setRevealed(true); return; }
    v.play().catch(() => { setMode("static"); setRevealed(true); });
  }, []);

  const onTime = () => {
    const v = videoRef.current;
    if (!v) return;
    setTime(v.currentTime);
    const shouldReveal = v.currentTime >= HERO_REVEAL_SECONDS;
    if (shouldReveal && !revealedRef.current) { setRevealed(true); setFlashKey((k) => k + 1); }
    if (!shouldReveal && revealedRef.current && mode !== "static") setRevealed(false);
  };

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v || failed) return;
    if (v.paused) v.play().catch(() => setMode("paused"));
    else v.pause();
  }, [failed]);

  const replay = useCallback(() => {
    const v = videoRef.current;
    if (!v || failed) return;
    setRevealed(false);
    v.currentTime = 0;
    v.play().catch(() => { setMode("paused"); setRevealed(true); });
  }, [failed]);

  const skip = useCallback(() => {
    const v = videoRef.current;
    if (v && !failed && isFinite(v.duration)) v.currentTime = Math.max(HERO_REVEAL_SECONDS, Math.min(v.duration - 0.05, HERO_REVEAL_SECONDS + 0.05));
    setRevealed(true);
  }, [failed]);

  const pct = dur > 0 ? Math.min(100, (time / dur) * 100) : 0;
  const markPct = dur > 0 ? Math.min(100, (HERO_REVEAL_SECONDS / dur) * 100) : 0;
  const hasVideo = !!HERO_VIDEO && !failed;

  return (
    <section id="top" className="relative min-h-[100dvh] w-full overflow-hidden bg-[#0d0c09]" aria-label="My Jersey campaign intro">
      <img src={HERO_BACKGROUND_4K || HERO_POSTER} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      {hasVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full bg-[#0d0c09] object-contain md:object-cover"
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          muted
          playsInline
          autoPlay
          preload="auto"
          aria-label="Street footballers play beside the My Jersey shop; one kicks the ball through the shop window, shattering the glass."
          onPlay={() => setMode("playing")}
          onPause={() => setMode((m) => (m === "ended" ? m : "paused"))}
          onEnded={() => { setMode("ended"); setRevealed(true); }}
          onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
          onTimeUpdate={onTime}
          onError={() => { setFailed(true); setMode("static"); setRevealed(true); }}
          data-testid="video-hero"
        />
      )}
      {flashKey > 0 && <div key={flashKey} className="impact-flash pointer-events-none absolute inset-0 bg-[#fff3d6]" aria-hidden />}

      {/* cinematic grade */}
      <div className={`absolute inset-0 transition-opacity duration-[1400ms] ${revealed ? "opacity-100" : "opacity-0"}`} style={{ background: "linear-gradient(90deg, rgba(13,12,9,.92) 0%, rgba(13,12,9,.66) 38%, rgba(13,12,9,.1) 70%), linear-gradient(0deg, rgba(13,12,9,.95) 0%, transparent 35%)" }} aria-hidden />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0d0c09]/80 to-transparent" aria-hidden />

      <div className={`relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-end px-5 pb-36 pt-32 md:px-10 md:pb-40 ${revealed ? "revealed" : ""}`} aria-live="polite">
        <div className={revealed ? "" : "invisible"}>
          <p className="fade-up mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-[#e9c77b]">
            <span className="h-px w-10 bg-[#c9a65a]" /> Custom street football kits
          </p>
          <h1 className="font-display leading-[0.92]" data-testid="text-hero-title">
            <span className="reveal-line"><span className="text-[clamp(2.4rem,6.5vw,5.8rem)] font-medium text-[#f4ead2]">Welcome to</span></span>
            <span className="reveal-line pb-3"><span className="gold-text text-[clamp(3.6rem,12vw,10.5rem)] font-bold italic">My Jersey</span></span>
          </h1>
          <p className="fade-up mt-4 flex items-center gap-4 text-[clamp(1rem,2vw,1.35rem)] font-extrabold uppercase tracking-[0.42em] text-[#f4ead2]" data-testid="text-hero-tagline">
            Crafted for Champions <span className="hidden h-[3px] w-16 bg-[#a3e635] sm:block" aria-hidden />
          </p>
          <div className="fade-up mt-10 flex flex-wrap gap-3">
            <a href="#story" className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#c9a65a] to-[#e9c77b] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#0d0c09] transition-transform hover:-translate-y-0.5" data-testid="link-brand-info">
              Meet the brand <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            {hasVideo && (
              <button onClick={replay} className="inline-flex items-center gap-3 rounded-full border border-[#efe4cc]/30 px-7 py-4 text-[12px] font-bold uppercase tracking-[0.2em] backdrop-blur-sm transition-colors hover:border-[#e9c77b] hover:text-[#e9c77b]" data-testid="button-replay-cta">
                <RotateCcw size={15} /> Watch the strike again
              </button>
            )}
          </div>
        </div>
      </div>

      {failed && (
        <div role="status" className="absolute left-5 top-24 z-20 flex max-w-sm items-start gap-3 rounded-xl border border-[#c9a65a]/30 bg-[#0d0c09]/85 p-4 text-sm backdrop-blur md:left-10" data-testid="status-video-error">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-[#e9c77b]" />
          <span>The campaign film couldn't load on this connection. Here's the storefront instead.</span>
        </div>
      )}

      {hasVideo && (
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-5 pb-6 md:gap-5 md:px-10 md:pb-8">
            <button onClick={toggle} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#efe4cc]/30 bg-[#0d0c09]/50 backdrop-blur hover:border-[#e9c77b]" aria-label={mode === "playing" ? "Pause film" : "Play film"} data-testid="button-play-pause">
              {mode === "playing" ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>
            <button onClick={replay} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#efe4cc]/30 bg-[#0d0c09]/50 backdrop-blur hover:border-[#e9c77b]" aria-label="Replay film" data-testid="button-replay">
              <RotateCcw size={16} />
            </button>
            <div className="relative h-[3px] flex-1 rounded-full bg-[#efe4cc]/15" role="progressbar" aria-label="Film progress" aria-valuemin={0} aria-valuemax={Math.round(dur)} aria-valuenow={Math.round(time)} data-testid="progress-hero">
              <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#c9a65a] to-[#fff1c9]" style={{ width: `${pct}%` }} />
              {dur > 0 && <span className="absolute -top-[5px] h-[13px] w-[2px] bg-[#a3e635]" style={{ left: `${markPct}%` }} title="Impact" />}
            </div>
            <span className="hidden font-mono text-[11px] tabular-nums text-[#efe4cc]/70 sm:block" data-testid="text-time">{fmt(time)} / {fmt(dur)}</span>
            {!revealed && (
              <button onClick={skip} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#efe4cc]/30 bg-[#0d0c09]/50 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur hover:border-[#e9c77b]" data-testid="button-skip">
                Skip intro <SkipForward size={14} />
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

const pillars = [
  { n: "01", t: "The love of the game", d: "A ball, a few friends and a stretch of street. Sometimes that's all it takes to feel like a champion." },
  { n: "02", t: "Your name. Your number.", d: "Your colours tell your story. Your name and number make the jersey yours." },
  { n: "03", t: "One squad, one identity", d: "From a five-a-side crew to a full club roster, a shared jersey brings your team together." },
];

export default function Home() {
  return (
    <div className="grain min-h-[100dvh] bg-[#0d0c09] text-[#efe4cc]">
      <a href="#story" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[#e9c77b] focus:px-4 focus:py-2 focus:text-[#0d0c09]">Skip to content</a>
      <Nav />
      <main>
        <Hero />

        <section id="story" className="relative mx-auto max-w-[1400px] scroll-mt-20 px-5 py-28 md:px-10 md:py-40">
          <div className="grid gap-12 md:grid-cols-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#c9a65a] md:col-span-3">The story</p>
            <div className="md:col-span-9">
              <h2 className="font-display text-[clamp(2.2rem,5.4vw,4.8rem)] leading-[1.02]">
                The street was always the <em className="gold-text">first stadium.</em>
              </h2>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#efe4cc]/70">
                Before the floodlights and the stadium, there is the street. A few friends, one football and the last light of the day. This is a celebration of that feeling — and the jersey that makes it yours.
              </p>
            </div>
          </div>
        </section>

        <section id="craft" className="scroll-mt-20 border-y border-[#c9a65a]/15 bg-[#11100c]">
          <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-none">The <em className="gold-text">craft</em></h2>
              <p className="hidden font-mono text-[11px] uppercase tracking-[0.3em] text-[#efe4cc]/50 md:block">Wear your identity</p>
            </div>
            <div className="mt-16 divide-y divide-[#c9a65a]/15 border-t border-[#c9a65a]/15">
              {pillars.map((p) => (
                <div key={p.n} className="group grid gap-4 py-10 md:grid-cols-12 md:items-baseline" data-testid={`row-pillar-${p.n}`}>
                  <span className="font-mono text-sm text-[#a3e635] md:col-span-2">{p.n}</span>
                  <h3 className="font-display text-3xl italic transition-colors group-hover:text-[#e9c77b] md:col-span-4 md:text-4xl">{p.t}</h3>
                  <p className="max-w-xl leading-relaxed text-[#efe4cc]/65 md:col-span-6">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="street" className="relative scroll-mt-20 overflow-hidden">
          <img src={HERO_POSTER} alt="Four football players outside the green My Jersey storefront at golden hour." loading="lazy" className="h-[70vh] min-h-[420px] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c09] via-[#0d0c09]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-5 pb-14 md:px-10 md:pb-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#a3e635]">The shop on the corner</p>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,5vw,4.4rem)] leading-[1.02]">
              Same street. Same light. <em className="gold-text">Your colours next.</em>
            </h2>
            <a href="#top" className="mt-8 inline-flex items-center gap-2 border-b border-[#e9c77b] pb-1 text-[12px] font-bold uppercase tracking-[0.2em] text-[#e9c77b]" data-testid="link-back-top">
              Back to the strike
            </a>
          </div>
        </section>
      </main>
      <footer className="border-t border-[#c9a65a]/15">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 py-10 text-sm text-[#efe4cc]/50 md:flex-row md:items-center md:justify-between md:px-10">
          <span className="font-display text-xl italic gold-text">My Jersey</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em]">Crafted for Champions &middot; &copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
