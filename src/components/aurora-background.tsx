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
        "relative flex flex-col items-center justify-center bg-slate-50 text-slate-950 transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
            [--blue-gradient:repeating-linear-gradient(100deg,var(--blue-500)_0%,var(--blue-600)_7%,transparent_10%,transparent_12%,var(--blue-700)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--blue-600)_15%,var(--blue-400)_20%,var(--blue-300)_25%,var(--blue-500)_30%)]
            [background-image:var(--blue-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] 
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--blue-gradient),var(--aurora)] 
            after:[background-size:200%,_100%] 
            after:animate-pulse after:[background-attachment:fixed] after:mix-blend-multiply
            pointer-events-none
            absolute -inset-[10px] opacity-30 will-change-transform`,

            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
          )}
        ></div>
      </div>
      {children}
    </div>
  );
};