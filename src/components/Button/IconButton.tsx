import { useState, forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"
import type { ButtonColorScheme, ButtonVariant, ButtonState } from "./Button"
import { buttonStyles } from "./Button"

export type IconButtonSize = "xs" | "sm" | "md" | "lg" | "xl"

export interface IconButtonProps extends HTMLChakraProps<"button"> {
  variant?:     ButtonVariant
  colorScheme?: ButtonColorScheme
  size?:        IconButtonSize
  state?:       ButtonState
  /** Required for accessibility */
  "aria-label": string
  /** Forces a visual interaction state — for Storybook stories only */
  forceInteractionState?: "hover" | "active"
}

// ── Size tokens ──────────────────────────────────────────────────────────────
// Square buttons: icon is always 24px; padding = (total - 24) / 2
const sizes: Record<IconButtonSize, HTMLChakraProps<"button">> = {
  xs: { w: "36px", h: "36px", p: "1.5" },
  sm: { w: "40px", h: "40px", p: "2"   },
  md: { w: "44px", h: "44px", p: "2.5" },
  lg: { w: "48px", h: "48px", p: "3"   },
  xl: { w: "56px", h: "56px", p: "4"   },
}

// ── Component ────────────────────────────────────────────────────────────────
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    variant = "solid",
    colorScheme = "brand",
    size = "md",
    state = "default",
    forceInteractionState,
    children,
    disabled,
    ...rest
  },
  ref
) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const isDisabled = state === "disabled" || disabled
  const isLoading  = state === "loading"
  const isInert    = isDisabled || isLoading

  const hovered  = !isInert && (forceInteractionState === "hover"  || isHovered)
  const pressed  = !isInert && (forceInteractionState === "active" || isPressed)
  const stateKey = pressed ? "active" : hovered ? "hover" : "default"

  const { bg, color, borderColor } = isInert
    ? { bg: "interaction.support.disabled-bg", color: "interaction.support.disabled", borderColor: "interaction.support.disabled-bg" }
    : buttonStyles[colorScheme][variant][stateKey]

  return (
    <chakra.button
      ref={ref}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
      borderRadius="8px"
      border="1px solid"
      cursor={isInert ? "not-allowed" : "pointer"}
      transition="background 0.15s, border-color 0.15s"
      outline="none"
      _focusVisible={{
        ring: "2px",
        ringColor: "focus.brand-default",
        ringOffset: "2px",
      }}
      {...sizes[size]}
      bg={bg}
      color={color}
      borderColor={borderColor}
      onMouseEnter={() => { if (!isInert) setIsHovered(true) }}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false) }}
      onMouseDown={() => { if (!isInert) setIsPressed(true) }}
      onMouseUp={() => setIsPressed(false)}
      disabled={isInert}
      {...rest}
    >
      {children}
    </chakra.button>
  )
})
