import { forwardRef, useState } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type DropdownTriggerColour = "brand" | "neutral"
export type DropdownTriggerSize   = "md" | "sm" | "xs"

export interface DropdownTriggerProps extends HTMLChakraProps<"button"> {
  colour?: DropdownTriggerColour
  size?: DropdownTriggerSize
  /** Controls chevron direction and selected visual — true = menu is open */
  isOpen?: boolean
  /** Renders a count badge next to the label */
  showBadge?: boolean
  /** Number shown in the badge */
  badgeCount?: number
}

// ── Size tokens ───────────────────────────────────────────────────────────────
const sizeTokens: Record<DropdownTriggerSize, { fontSize: string; lineHeight: string; letterSpacing: string }> = {
  md: { fontSize: "16px", lineHeight: "24px", letterSpacing: "-0.096px" },
  sm: { fontSize: "14px", lineHeight: "16px", letterSpacing: "0px"     },
  xs: { fontSize: "12px", lineHeight: "16px", letterSpacing: "0px"     },
}

// ── Colour tokens ─────────────────────────────────────────────────────────────
const colourTokens: Record<DropdownTriggerColour, {
  default: string; hover: string; active: string
  badgeBg: string; badgeText: string
}> = {
  brand: {
    default:   "interaction.main.default",
    hover:     "interaction.main.hover",
    active:    "interaction.main.active",
    badgeBg:   "interaction.muted.default",
    badgeText: "content.light.brand-strong",
  },
  neutral: {
    default:   "content.light.default",
    hover:     "interaction.main.hover",
    active:    "interaction.main.active",
    badgeBg:   "#EEEFF7",
    badgeText: "content.light.subtle",
  },
}

// ── Component ─────────────────────────────────────────────────────────────────
export const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>(function DropdownTrigger(
  { colour = "brand", size = "md", isOpen = false, showBadge = false, badgeCount = 1, children, ...rest },
  ref
) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const { fontSize, lineHeight, letterSpacing } = sizeTokens[size]
  const tokens = colourTokens[colour]

  const textColor = isPressed
    ? tokens.active
    : isHovered
    ? tokens.hover
    : tokens.default

  // Chevron icon: down when closed, up when open
  const chevronIcon = isOpen ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"

  return (
    <chakra.button
      ref={ref}
      type="button"
      display="inline-flex"
      alignItems="center"
      gap="1"
      bg="transparent"
      border="none"
      cursor="pointer"
      p="0"
      fontFamily="Inter, sans-serif"
      color={textColor}
      transition="color 0.15s"
      outline="none"
      _focusVisible={{
        ring: "2px",
        ringColor: "focus.brand-default",
        ringOffset: "4px",
        borderRadius: "4px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false) }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      {...rest}
    >
      {/* Label */}
      <chakra.span
        fontWeight="500"
        fontSize={fontSize}
        lineHeight={lineHeight}
        letterSpacing={letterSpacing}
        style={{ fontFeatureSettings: "'cv05' 1, 'cv10' 1" }}
      >
        {children}
      </chakra.span>

      {/* Badge */}
      {showBadge && (
        <chakra.span
          display="inline-flex"
          alignItems="center"
          px="2"
          py="1"
          bg={tokens.badgeBg}
          borderRadius="50px"
          fontSize="10px"
          fontWeight="400"
          lineHeight="12px"
          color={tokens.badgeText}
          style={{ fontFeatureSettings: "'cv05' 1, 'cv10' 1" }}
        >
          {badgeCount}
        </chakra.span>
      )}

      {/* Chevron */}
      <chakra.i
        className={chevronIcon}
        fontSize="20px"
        lineHeight={1}
        flexShrink={0}
      />
    </chakra.button>
  )
})
