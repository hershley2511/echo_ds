import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type IndicatorStatus = "active" | "inactive" | "warning" | "error" | "info"
export type IndicatorSize = "xs" | "sm" | "md" | "lg"

export interface IndicatorProps extends HTMLChakraProps<"span"> {
  status?: IndicatorStatus
  size?: IndicatorSize
  label?: string
  pulse?: boolean
}

const statusColors: Record<IndicatorStatus, string> = {
  active: "#009D7B",
  inactive: "#838894",
  warning: "#FFDA68",
  error: "#C84F25",
  info: "#3182CE",
}

const statusLabels: Record<IndicatorStatus, string> = {
  active: "Active",
  inactive: "Inactive",
  warning: "Warning",
  error: "Error",
  info: "Info",
}

const dotSizes: Record<IndicatorSize, string> = {
  xs: "6px",
  sm: "8px",
  md: "10px",
  lg: "12px",
}

export const Indicator = forwardRef<HTMLSpanElement, IndicatorProps>(function Indicator(
  { status = "active", size = "sm", label, pulse = false, ...rest },
  ref
) {
  const color = statusColors[status]
  const dotSize = dotSizes[size]
  const displayLabel = label ?? statusLabels[status]

  return (
    <chakra.span
      ref={ref}
      display="inline-flex"
      alignItems="center"
      gap="6px"
      fontFamily="Inter, sans-serif"
      fontSize="13px"
      color="slate.700"
      {...rest}
    >
      <chakra.span
        display="inline-block"
        w={dotSize}
        h={dotSize}
        borderRadius="full"
        bg={color}
        flexShrink={0}
        style={
          pulse
            ? {
                animation: "pulse 2s infinite",
                boxShadow: `0 0 0 0 ${color}`,
              }
            : undefined
        }
      />
      {displayLabel}
    </chakra.span>
  )
})
