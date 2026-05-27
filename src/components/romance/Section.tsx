import { type ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`snap-section relative flex w-full flex-col items-center justify-center px-6 py-20 sm:px-10 ${className}`}
    >
      {children}
    </section>
  );
}
