import { useEffect, useRef, useState } from "react";

const TRACK = "/assets/audio/Riky%20Rick%20-%20You%20And%20I%20ft.%20Mlindo%20The%20Vocalist.mp3";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);

  const startPlayback = async () => {
    const audio = audioRef.current;
    if (!audio || startedRef.current) return;

    try {
      await audio.play();
      startedRef.current = true;
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  useEffect(() => {
    const a = new Audio(TRACK);
    a.loop = true;
    a.volume = volume;
    a.preload = "auto";
    audioRef.current = a;

    void startPlayback();

    const resumeOnInteraction = () => {
      void startPlayback();
    };

    window.addEventListener("pointerdown", resumeOnInteraction, { once: true });
    window.addEventListener("keydown", resumeOnInteraction, { once: true });
    window.addEventListener("touchstart", resumeOnInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", resumeOnInteraction);
      window.removeEventListener("keydown", resumeOnInteraction);
      window.removeEventListener("touchstart", resumeOnInteraction);
      a.pause();
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      startedRef.current = false;
      setPlaying(false);
    } else {
      try {
        await a.play();
        startedRef.current = true;
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full px-4 py-2 glass">
      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="grid h-9 w-9 place-items-center rounded-full bg-rose/90 text-warm-white transition hover:scale-105"
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 5v14l12-7z" />
          </svg>
        )}
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="h-1 w-24 cursor-pointer accent-rose"
        aria-label="Volume"
      />
    </div>
  );
}
