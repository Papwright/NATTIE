import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IntroSection } from "@/components/romance/IntroSection";
import { AboutHerSection } from "@/components/romance/AboutHerSection";
import { ReconnectSection } from "@/components/romance/ReconnectSection";
import { RealizationSection } from "@/components/romance/RealizationSection";
import { CatSection } from "@/components/romance/CatSection";
import { ProposalSection } from "@/components/romance/ProposalSection";
import { CursorGlow } from "@/components/romance/CursorGlow";
import { MusicToggle } from "@/components/romance/MusicToggle";
import { Loader } from "@/components/romance/Loader";
import { FloatingParticles } from "@/components/romance/FloatingParticles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For You ❤" },
      {
        name: "description",
        content: "A little something I've been wanting to tell you.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const scrollToNext = () => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.clientHeight, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <CursorGlow />

      {/* Ambient particles across the whole story */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <FloatingParticles count={18} />
      </div>

      <div ref={scrollerRef} className="snap-container relative z-10">
        <IntroSection onContinue={scrollToNext} />
        <AboutHerSection />
        <ReconnectSection />
        <RealizationSection />
        <CatSection />
        <ProposalSection />
      </div>

      <MusicToggle />
    </main>
  );
}
