import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type ProgressColorScheme = "brand" | "success" | "critical" | "warning" | "info"
export type ProgressSize = "xs" | "sm" | "md" | "lg"

export interface ProgressProps extends HTMLChakraProps<"div"> {
  value?: number
  max?: number
  colorScheme?: ProgressColorScheme
  size?: ProgressSize
  label?: string
  showValue?: boolean
  isIndeterminate?: boolean
}

const colors: Record<ProgressColorScheme, string> = {
  brand: "#026257",
  success: "#009D7B",
  critical: "#C84F25",
  warning: "#FFDA68",
  info: "#3182CE",
}

const heights: Record<ProgressSize, string> = {
  xs: "4px",
  sm: "6px",
  md: "8px",
  lg: "12px",
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  {
    value = 0,
    max = 100,
    colorScheme = "brand",
    size = "md",
    label,
    showValue = false,
    isIndeterminate = false,
    ...rest
  },
  ref
) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const color = colors[colorScheme]
  const h = heights[size]

  return (
    <chakra.div ref={ref} display="flex" flexDir="column" gap="6px" w="100%" {...rest}>
      {(label || showValue) && (
        <chakra.div display="flex" justifyContent="space-between" alignItems="center">
          {label && (
            <chakra.span fontSize="13px" fontWeight="500" color="slate.800" fontFamily="Inter, sans-serif">
              {label}
            </chakra.span>
          )}
          {showValue && !isIndeterminate && (
            <chakra.span fontSize="12px" color="slate.700" fontFamily="Inter, sans-serif">
              {Math.round(pct)}%
            </chakra.span>
          )}
        </chakra.div>
      )}
      <chakra.div
        w="100%"
        h={h}
        bg="grey.100"
        borderRadius="999px"
        overflow="hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={isIndeterminate ? undefined : value}
      >
        <chakra.div
          h="100%"
          w={isIndeterminate ? "40%" : `${pct}%`}
          bg={color}
          borderRadius="999px"
          transition="width 0.3s ease"
        />
      </chakra.div>
    </chakra.div>
  )
})
