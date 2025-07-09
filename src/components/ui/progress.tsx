import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  showLabel?: boolean
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, showLabel = false, variant = 'default', ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    
    const variantStyles = {
      default: "bg-gradient-to-r from-blue-500 to-purple-600",
      success: "bg-gradient-to-r from-green-500 to-emerald-600",
      warning: "bg-gradient-to-r from-yellow-500 to-orange-600",
      danger: "bg-gradient-to-r from-red-500 to-pink-600",
    }

    return (
      <div
        ref={ref}
        className={cn("relative h-2 w-full overflow-hidden rounded-full bg-gray-100", className)}
        {...props}
      >
        <div
          className={cn(
            "h-full transition-all duration-300 ease-out",
            variantStyles[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-white drop-shadow-sm">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress } 