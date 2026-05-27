import { Section } from "./Section";
import { FadeLine } from "./FadeLine";

export function ReconnectSection() {
  return (
    <Section id="reconnect">
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <FadeLine className="font-display text-3xl italic text-ink/75 sm:text-4xl">
          Life took us in different directions for a while…
        </FadeLine>
        <FadeLine
          delay={0.9}
          className="mt-10 font-display text-3xl italic text-ink sm:text-4xl"
        >
          but I'm really happy we found our way back to each other.
        </FadeLine>
        <FadeLine
          delay={1.8}
          as="span"
          className="mt-10 inline-block font-script text-2xl text-rose"
        >
          right where we belong
        </FadeLine>
      </div>
    </Section>
  );
}
