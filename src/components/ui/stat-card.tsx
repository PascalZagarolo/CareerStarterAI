import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
    period: string
  }
  variant?: 'default' | 'success' | 'warning' | 'danger'
  loading?: boolean
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ 
    className, 
    title, 
    value, 
    description, 
    icon: Icon, 
    trend, 
    variant = 'default',
    loading = false,
    ...props 
  }, ref) => {
    const variantStyles = {
      default: {
        card: "bg-white border-gray-200",
        icon: "bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-600",
        value: "text-gray-900",
        trend: "text-gray-600"
      },
      success: {
        card: "bg-white border-green-200",
        icon: "bg-gradient-to-br from-green-50 to-emerald-100 text-green-600",
        value: "text-gray-900",
        trend: "text-green-600"
      },
      warning: {
        card: "bg-white border-yellow-200",
        icon: "bg-gradient-to-br from-yellow-50 to-orange-100 text-yellow-600",
        value: "text-gray-900",
        trend: "text-yellow-600"
      },
      danger: {
        card: "bg-white border-red-200",
        icon: "bg-gradient-to-br from-red-50 to-pink-100 text-red-600",
        value: "text-gray-900",
        trend: "text-red-600"
      }
    }

    const styles = variantStyles[variant]

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-xl border p-6 shadow-sm transition-all duration-200 hover:shadow-md",
            styles.card,
            className
          )}
          {...props}
        >
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border p-6 shadow-sm transition-all duration-200 hover:shadow-md",
          styles.card,
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          {Icon && (
            <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", styles.icon)}>
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
        
        <div className="mb-2">
          <p className={cn("text-2xl font-bold", styles.value)}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>

        {trend && (
          <div className="flex items-center text-sm">
            <span className={cn("font-medium", styles.trend)}>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
            <span className="text-gray-500 ml-1">vs {trend.period}</span>
          </div>
        )}
      </div>
    )
  }
)
StatCard.displayName = "StatCard"

export { StatCard } 