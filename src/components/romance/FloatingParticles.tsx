import { useMemo } from "react";

interface Particle {
  left: string;
  size: number;
  duration: number;
  delay: number;
  isHeart: boolean;
  opacity: number;
}

export function FloatingParticles({ count = 28 }: { count?: number }) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: `${Math.random() * 100}%`,
        size: 6 + Math.random() * 14,
        duration: 14 + Math.random() * 18,
        delay: -Math.random() * 25,
        isHeart: i % 4 === 0,
        opacity: 0.35 + Math.random() * 0.45,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute animate-float-up"
          style={{
            left: p.left,
            bottom: 0,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        >
          {p.isHeart ? (
            <svg
              width={p.size + 6}
              height={p.size + 6}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-rose drop-shadow-[0_0_8px_rgba(255,180,180,0.6)]"
            >
              <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
            </svg>
          ) : (
            <span
              className="block rounded-full bg-gold-glow blur-[1px]"
              style={{
                width: p.size,
                height: p.size,
                boxShadow: "0 0 14px rgba(240, 200, 140, 0.65)",
              }}
            />
          )}
        </span>
      ))}
    </div>
  );
}
