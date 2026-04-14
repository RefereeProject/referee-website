"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-background text-foreground transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
            [--teal-gradient:repeating-linear-gradient(100deg,var(--primary-600)_0%,var(--primary-700)_7%,transparent_10%,transparent_12%,var(--primary-800)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--primary-600)_10%,var(--primary-700)_15%,var(--primary-500)_20%,var(--primary-400)_25%,var(--primary-600)_30%)]
            [background-image:var(--teal-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[12px]
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--teal-gradient),var(--aurora)]
            after:[background-size:200%,_100%]
            after:[background-attachment:fixed] after:mix-blend-multiply

            pointer-events-none
            absolute -inset-[10px] opacity-15 will-change-transform`,

            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
          )}
        ></div>
      </div>
      {children}
    </div>
  );
};