import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type ButtonVariant = "solid" | "outline" | "ghost"
export type ButtonColorScheme = "brand" | "subtle" | "success" | "critical" | "neutral"
export type ButtonSize = "sm" | "md" | "lg"

export interface ButtonProps extends HTMLChakraProps<"button"> {
  variant?: ButtonVariant
  colorScheme?: ButtonColorScheme
  size?: ButtonSize
}

// ── Size tokens ──────────────────────────────────────────────────────────────

const sizes: Record<ButtonSize, HTMLChakraProps<"button">> = {
  sm: { h: "36px", px: "3",  fontSize: "14px", gap: "1.5" },
  md: { h: "48px", px: "4",  fontSize: "16px", gap: "2"   },
  lg: { h: "56px", px: "5",  fontSize: "18px", gap: "2"   },
}

// ── Color × Variant styles ───────────────────────────────────────────────────

type StyleMap = Record<ButtonColorScheme, Record<ButtonVariant, HTMLChakraProps<"button">>>

const styles: StyleMap = {
  brand: {
    solid: {
      bg: "green.800", color: "white", borderColor: "green.800",
      _hover: { bg: "green.600", borderColor: "green.600" },
      _active: { bg: "green.900", borderColor: "green.900" },
    },
    outline: {
      bg: "transparent", color: "green.800", borderColor: "green.800",
      _hover: { bg: "green.50" },
      _active: { bg: "green.100" },
    },
    ghost: {
      bg: "transparent", color: "green.800", borderColor: "transparent",
      _hover: { bg: "green.50" },
      _active: { bg: "green.100" },
    },
  },
  subtle: {
    solid: {
      bg: "green.100", color: "green.800", borderColor: "green.100",
      _hover: { bg: "green.200", borderColor: "green.200" },
      _active: { bg: "green.100" },
    },
    outline: {
      bg: "transparent", color: "green.800", borderColor: "green.300",
      _hover: { bg: "green.50" },
      _active: { bg: "green.100" },
    },
    ghost: {
      bg: "transparent", color: "green.800", borderColor: "transparent",
      _hover: { bg: "green.50" },
      _active: { bg: "green.100" },
    },
  },
  success: {
    solid: {
      bg: "green.500", color: "white", borderColor: "green.500",
      _hover: { bg: "green.400", borderColor: "green.400" },
      _active: { bg: "green.600", borderColor: "green.600" },
    },
    outline: {
      bg: "transparent", color: "green.600", borderColor: "green.500",
      _hover: { bg: "green.50" },
      _active: { bg: "green.100" },
    },
    ghost: {
      bg: "transparent", color: "green.600", borderColor: "transparent",
      _hover: { bg: "green.50" },
      _active: { bg: "green.100" },
    },
  },
  critical: {
    solid: {
      bg: "red.500", color: "white", borderColor: "red.500",
      _hover: { bg: "red.400", borderColor: "red.400" },
      _active: { bg: "red.600", borderColor: "red.600" },
    },
    outline: {
      bg: "transparent", color: "red.600", borderColor: "red.500",
      _hover: { bg: "red.50" },
      _active: { bg: "red.100" },
    },
    ghost: {
      bg: "transparent", color: "red.600", borderColor: "transparent",
      _hover: { bg: "red.50" },
      _active: { bg: "red.100" },
    },
  },
  neutral: {
    solid: {
      bg: "slate.100", color: "slate.800", borderColor: "slate.100",
      _hover: { bg: "slate.200", borderColor: "slate.200" },
      _active: { bg: "slate.300" },
    },
    outline: {
      bg: "transparent", color: "slate.700", borderColor: "slate.400",
      _hover: { bg: "slate.50" },
      _active: { bg: "slate.100" },
    },
    ghost: {
      bg: "transparent", color: "slate.700", borderColor: "transparent",
      _hover: { bg: "slate.100" },
      _active: { bg: "slate.200" },
    },
  },
}

// ── Component ────────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "solid",
    colorScheme = "brand",
    size = "md",
    children,
    disabled,
    ...rest
  },
  ref
) {
  return (
    <chakra.button
      ref={ref}
      // Base styles
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="8px"
      border="1px solid"
      fontFamily="Inter, sans-serif"
      fontWeight="500"
      letterSpacing="-0.096px"
      cursor={disabled ? "not-allowed" : "pointer"}
      opacity={disabled ? 0.4 : 1}
      transition="background 0.15s, border-color 0.15s, opacity 0.15s"
      outline="none"
      _focusVisible={{
        ring: "2px",
        ringColor: "focus.brand-default",
        ringOffset: "2px",
      }}
      // Size
      {...sizes[size]}
      // Color scheme × variant
      {...styles[colorScheme][variant]}
      // Caller overrides
      disabled={disabled}
      {...rest}
    >
      {children}
    </chakra.button>
  )
})
