import { Section } from "./Section";
import { FadeLine } from "./FadeLine";

const lines = [
  "You have this way of making everything feel lighter.",
  "Talking to you feels easy.",
  "You make ordinary moments feel special.",
  "You bring a kind of peace I can't explain.",
];

export function AboutHerSection() {
  return (
    <Section id="about">
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <FadeLine
          as="span"
          className="font-script text-2xl text-rose"
        >
          about you
        </FadeLine>
        <FadeLine
          as="h2"
          delay={0.2}
          className="mt-4 font-display text-5xl italic text-ink sm:text-6xl"
        >
          where do I even start
        </FadeLine>

        <div className="mt-16 space-y-10 sm:space-y-14">
          {lines.map((line, i) => (
            <FadeLine
              key={line}
              delay={i * 0.25}
              className="font-display text-2xl leading-relaxed text-ink/80 sm:text-3xl"
            >
              {line}
            </FadeLine>
          ))}
        </div>
      </div>
    </Section>
  );
}
