import { motion } from "framer-motion";
import { Section } from "./Section";
import { FadeLine } from "./FadeLine";

const cats = [
  { emoji: "🐱", caption: "literally us" },
  { emoji: "😻", caption: "me whenever you text me" },
  { emoji: "🙈", caption: "me trying to act normal around you" },
  { emoji: "💖", caption: "you're cute btw" },
];

export function CatSection() {
  return (
    <Section id="cats">
      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <FadeLine
          as="span"
          className="font-script text-2xl text-rose"
        >
          a small intermission
        </FadeLine>
        <FadeLine
          as="h2"
          delay={0.2}
          className="mt-3 font-display text-5xl italic text-ink sm:text-6xl"
        >
          some cats, because… you
        </FadeLine>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cats.map((c, i) => (
            <motion.div
              key={c.caption}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                delay: i * 0.15,
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass animate-drift rounded-3xl p-6 pt-10"
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              <div className="mx-auto grid aspect-square w-full max-w-[200px] place-items-center rounded-2xl bg-gradient-to-br from-blush/60 to-gold-glow/40 text-7xl shadow-inner">
                <motion.span
                  animate={{ y: [0, -6, 0], rotate: [0, 2, -2, 0] }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {c.emoji}
                </motion.span>
              </div>
              <p className="mt-5 font-script text-xl text-ink/80">
                "{c.caption}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
