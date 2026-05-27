import { motion } from "framer-motion";
import { FloatingParticles } from "./FloatingParticles";
import { Section } from "./Section";
import { FadeLine } from "./FadeLine";

export function IntroSection({ onContinue }: { onContinue: () => void }) {
  return (
    <Section id="intro">
      <FloatingParticles count={30} />
      <div className="relative z-10 flex flex-col items-center text-center">
        <FadeLine
          as="h1"
          className="font-display text-6xl italic leading-[1.05] text-ink text-glow sm:text-8xl"
        >
          Hey you <span className="text-rose">❤️</span>
        </FadeLine>
        <FadeLine
          delay={1.6}
          className="mt-8 max-w-xl font-display text-xl text-ink/75 sm:text-2xl"
        >
          There's something I've wanted to tell you.
        </FadeLine>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          className="mt-16 rounded-full bg-gradient-to-r from-rose to-blush px-10 py-3.5 text-sm tracking-[0.25em] uppercase text-warm-white shadow-[0_15px_40px_-15px_rgba(220,140,150,0.7)] transition"
        >
          continue
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 4, duration: 1.5 }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-script text-xl text-rose/70"
        >
          scroll gently ↓
        </motion.div>
      </div>
    </Section>
  );
}
