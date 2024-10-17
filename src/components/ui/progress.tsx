"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => {
  // Define circle constants
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - ((value || 0) / 100) * circumference;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn("relative inline-block w-20 h-20", className)}
      {...props}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="text-[#22C98B]"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        /> 
        {/* Progress circle */}
        <circle
          className="text-white transition-all duration-300"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          style={{
            transition: "stroke-dashoffset 0.35s",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
        {/* Text for percentage */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-[24px] font-bold font-rubik fill-white"
        >
          <tspan className="text-[24px] font-bold font-rubik">{value}</tspan>
          <tspan className="text-[14px] font-rubik " dx="0.3em" dy="-0.2em">%</tspan>
        </text>
      </svg>
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
