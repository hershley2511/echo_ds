import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type BadgeVariant = "solid" | "subtle" | "outline"
export type BadgeColorScheme = "brand" | "success" | "critical" | "warning" | "info" | "neutral"

export interface BadgeProps extends HTMLChakraProps<"span"> {
  variant?: BadgeVariant
  colorScheme?: BadgeColorScheme
  size?: "sm" | "md"
}

const schemes: Record<BadgeColorScheme, Record<BadgeVariant, object>> = {
  brand: {
    solid: { bg: "green.800", color: "white", borderColor: "green.800" },
    subtle: { bg: "green.50", color: "green.800", borderColor: "green.50" },
    outline: { bg: "transparent", color: "green.800", borderColor: "green.800" },
  },
  success: {
    solid: { bg: "green.500", color: "white", borderColor: "green.500" },
    subtle: { bg: "green.50", color: "green.500", borderColor: "green.50" },
    outline: { bg: "transparent", color: "green.500", borderColor: "green.500" },
  },
  critical: {
    solid: { bg: "red.500", color: "white", borderColor: "red.500" },
    subtle: { bg: "#FFE8E0", color: "red.500", borderColor: "#FFE8E0" },
    outline: { bg: "transparent", color: "red.500", borderColor: "red.500" },
  },
  warning: {
    solid: { bg: "#FFDA68", color: "#8B6005", borderColor: "#FFDA68" },
    subtle: { bg: "#FFFAE2", color: "#8B6005", borderColor: "#FFFAE2" },
    outline: { bg: "transparent", color: "#8B6005", borderColor: "#FFDA68" },
  },
  info: {
    solid: { bg: "#3182CE", color: "white", borderColor: "#3182CE" },
    subtle: { bg: "#EBF8FF", color: "#2B6CB0", borderColor: "#EBF8FF" },
    outline: { bg: "transparent", color: "#2B6CB0", borderColor: "#3182CE" },
  },
  neutral: {
    solid: { bg: "slate.800", color: "white", borderColor: "slate.800" },
    subtle: { bg: "slate.100", color: "slate.800", borderColor: "slate.100" },
    outline: { bg: "transparent", color: "slate.700", borderColor: "grey.100" },
  },
}

const sizes = {
  sm: { px: "6px", py: "1px", fontSize: "11px", borderRadius: "4px" },
  md: { px: "8px", py: "2px", fontSize: "12px", borderRadius: "6px" },
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = "subtle", colorScheme = "neutral", size = "md", children, ...rest },
  ref
) {
  return (
    <chakra.span
      ref={ref}
      display="inline-flex"
      alignItems="center"
      fontWeight="600"
      border="1px solid"
      fontFamily="Inter, sans-serif"
      letterSpacing="0.2px"
      lineHeight="1"
      whiteSpace="nowrap"
      {...sizes[size]}
      {...schemes[colorScheme][variant]}
      {...rest}
    >
      {children}
    </chakra.span>
  )
})
