import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface DatabaseOutlineIconProps extends React.SVGProps<SVGSVGElement> {
  /** Icon size in pixels. Default: 16 (DuBois standard). */
  size?: number | string;
  className?: string;
  /** Accessible label. When set, icon gets role="img". */
  ariaLabel?: string;
}

export const DatabaseOutlineIcon = forwardRef<SVGSVGElement, DatabaseOutlineIconProps>(
  ({ size = 16, className, ariaLabel, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
      {...props}
    >
      <ellipse cx="8" cy="3.333" rx="6" ry="2" stroke="currentColor" strokeWidth={1} />
      <path
        d="M2 3.333v9.334c0 1.107 2.667 2 6 2s6-.893 6-2V3.333"
        stroke="currentColor"
        strokeWidth={1}
      />
      <path
        d="M2 8c0 1.107 2.667 2 6 2s6-.893 6-2"
        stroke="currentColor"
        strokeWidth={1}
      />
    </svg>
  )
);
DatabaseOutlineIcon.displayName = "DatabaseOutlineIcon";
