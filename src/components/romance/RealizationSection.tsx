import { Section } from "./Section";
import { FadeLine } from "./FadeLine";

export function RealizationSection() {
  return (
    <Section id="realization">
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <FadeLine className="font-display text-3xl italic text-ink/70 sm:text-4xl">
          And the more we talked…
        </FadeLine>
        <FadeLine
          delay={0.8}
          className="mt-8 font-display text-3xl italic text-ink/85 sm:text-4xl"
        >
          the more certain I became.
        </FadeLine>
        <FadeLine
          delay={1.8}
          className="mt-14 font-display text-4xl italic text-ink text-glow sm:text-6xl"
        >
          Some people just feel right.
        </FadeLine>
        <FadeLine
          delay={2.8}
          className="mt-6 font-display text-4xl italic text-rose sm:text-6xl"
        >
          You feel right to me.
        </FadeLine>
      </div>
    </Section>
  );
}
