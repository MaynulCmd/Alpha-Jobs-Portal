import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Logo Icon */}
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-9"
      >
        {/* Background Circle */}
        <circle cx="20" cy="20" r="20" className="fill-primary" />
        
        {/* Alpha Symbol */}
        <path
          d="M20 8L10 32H14L16.5 26H23.5L26 32H30L20 8ZM18 22L20 14L22 22H18Z"
          className="fill-primary-foreground"
        />
        
        {/* Decorative Element - Connecting dots representing jobs/network */}
        <circle cx="12" cy="12" r="2" className="fill-primary-foreground/50" />
        <circle cx="28" cy="12" r="2" className="fill-primary-foreground/50" />
        <path
          d="M14 12H26"
          stroke="currentColor"
          strokeWidth="1"
          className="stroke-primary-foreground/30"
        />
      </svg>

      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Alpha<span className="text-primary">Jobs</span>
          </span>
          <span className="text-[10px] text-muted-foreground tracking-wider uppercase">
            Saudi Arabia
          </span>
        </div>
      )}
    </div>
  )
}

// Icon only version for small spaces
export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
    >
      <circle cx="20" cy="20" r="20" className="fill-primary" />
      <path
        d="M20 8L10 32H14L16.5 26H23.5L26 32H30L20 8ZM18 22L20 14L22 22H18Z"
        className="fill-primary-foreground"
      />
    </svg>
  )
}
