import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Section } from "./Section";
import { FadeLine } from "./FadeLine";

const ASK_VIDEO = "/assets/gifs/videoplayback(1).mp4";
const CONFETTI_VIDEO = "/assets/gifs/videoplayback.mp4";

export function ProposalSection() {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement | null>(null);

  const dodgeAwayFrom = (cursorX: number, cursorY: number) => {
    const button = noButtonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const nearestX = Math.max(rect.left, Math.min(cursorX, rect.right));
    const nearestY = Math.max(rect.top, Math.min(cursorY, rect.bottom));
    const edgeDist = Math.hypot(cursorX - nearestX, cursorY - nearestY);
    const safeDistance = 20;

    if (edgeDist >= safeDistance) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const vecX = centerX - cursorX;
    const vecY = centerY - cursorY;
    const margin = 16;
    const move = safeDistance - edgeDist + 12;
    const dist = Math.hypot(vecX, vecY);
    const normX = dist === 0 ? (Math.random() > 0.5 ? 1 : -1) : vecX / dist;
    const normY = dist === 0 ? -1 : vecY / dist;

    let deltaX = normX * move;
    let deltaY = normY * move;

    const section = button.closest("section");
    const sectionRect = section?.getBoundingClientRect();
    const minLeft = (sectionRect?.left ?? 0) + margin;
    const maxLeft = (sectionRect?.right ?? window.innerWidth) - rect.width - margin;
    const minTop = (sectionRect?.top ?? 0) + margin;
    const maxTop = (sectionRect?.bottom ?? window.innerHeight) - rect.height - margin;
    const nextLeft = Math.min(maxLeft, Math.max(minLeft, rect.left + deltaX));
    const nextTop = Math.min(maxTop, Math.max(minTop, rect.top + deltaY));

    deltaX = nextLeft - rect.left;
    deltaY = nextTop - rect.top;

    setNoPos((prev) => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
  };

  useEffect(() => {
    if (accepted) return;

    const handlePointerMove = (event: PointerEvent) => {
      dodgeAwayFrom(event.clientX, event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [accepted]);

  const sayYes = () => {
    setAccepted(true);
    const burst = (origin: { x: number; y: number }) =>
      confetti({
        particleCount: 80,
        spread: 70,
        startVelocity: 35,
        ticks: 200,
        gravity: 0.7,
        scalar: 1.1,
        colors: ["#f5c8d0", "#e89aa6", "#f3d6a4", "#fff5ec", "#e7a9b3"],
        origin,
      });
    burst({ x: 0.2, y: 0.4 });
    burst({ x: 0.8, y: 0.4 });
    setTimeout(() => burst({ x: 0.5, y: 0.3 }), 300);
    setTimeout(() => burst({ x: 0.5, y: 0.5 }), 700);
  };

  return (
    <Section id="proposal">
      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="ask"
            exit={{ opacity: 0, filter: "blur(12px)", scale: 0.97 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 mx-auto max-w-2xl text-center"
          >
            <AskingGifLayer />
            <FadeLine as="h2" className="font-display text-7xl italic text-ink sm:text-9xl">
              So…
            </FadeLine>
            <FadeLine
              delay={1.2}
              as="h2"
              className="mt-10 font-display text-4xl italic text-ink text-glow sm:text-6xl"
            >
              Will you be my girlfriend? <span className="text-rose">❤️</span>
            </FadeLine>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 1 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-6"
            >
              <button
                onClick={sayYes}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-rose to-blush px-12 py-4 text-sm uppercase tracking-[0.3em] text-warm-white transition hover:scale-[1.04] active:scale-95"
                style={{ boxShadow: "var(--shadow-gold)" }}
              >
                <span className="relative z-10">YES ❤️</span>
                <span className="absolute inset-0 -translate-x-full bg-warm-white/30 transition-transform duration-700 group-hover:translate-x-full" />
              </button>

              <motion.button
                ref={noButtonRef}
                onMouseEnter={(e) => dodgeAwayFrom(e.clientX, e.clientY)}
                onClick={(e) => dodgeAwayFrom(e.clientX, e.clientY)}
                animate={{ x: noPos.x, y: noPos.y }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="rounded-full border border-border bg-card px-10 py-4 text-sm uppercase tracking-[0.3em] text-ink/70 backdrop-blur"
              >
                NO 😭
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="yes"
            initial={{ opacity: 0, scale: 0.92, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-center"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 animate-shimmer rounded-full bg-gradient-glow blur-3xl" />
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto text-7xl"
            >
              ❤️
            </motion.div>
            <h2 className="mt-6 font-display text-5xl italic text-ink text-glow sm:text-7xl">
              I'm really happy it's you
            </h2>
            <p className="mt-8 font-script text-3xl text-rose">always & always.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {accepted && <ConfettiVideoReveal />}
      {accepted && <FloatingHeartsBurst />}
    </Section>
  );
}

function AskingGifLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-visible">
      <motion.video
        initial={{ opacity: 0, y: 14, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        autoPlay
        muted
        loop
        playsInline
        className="absolute -top-3 right-0 h-34 w-34 rounded-2xl object-cover shadow-xl ring-2 ring-warm-white/60 sm:h-44 sm:w-44"
        src={ASK_VIDEO}
      />
    </div>
  );
}

function ConfettiVideoReveal() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.08 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-0 z-30 origin-center"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        src={CONFETTI_VIDEO}
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}

function FloatingHeartsBurst() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ y: "100vh", opacity: 0, x: `${Math.random() * 100}vw` }}
          animate={{ y: "-15vh", opacity: [0, 1, 0] }}
          transition={{
            duration: 6 + Math.random() * 5,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute text-2xl text-rose"
          style={{ filter: "drop-shadow(0 0 8px rgba(230,140,150,0.7))" }}
        >
          ❤
        </motion.span>
      ))}
    </div>
  );
}
