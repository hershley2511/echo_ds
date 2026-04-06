import { useState, forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type FilterButtonBorder = "default" | "rounded"

export interface FilterButtonProps extends HTMLChakraProps<"button"> {
  /** Border shape — default=8px radius, rounded=pill (50px) */
  border?: FilterButtonBorder
  /** When true, switches to the muted-green colour scheme (filters are active) */
  filtersApplied?: boolean
  /** Renders the filter icon before the label */
  showLeadingIcon?: boolean
  /** Renders the chevron icon after the label */
  showTrailingIcon?: boolean
  /** When true, chevron points up — indicates the attached menu is open */
  isOpen?: boolean
  /** Forces a visual interaction state without mouse events — for Storybook only */
  forceInteractionState?: "hover" | "active"
}

// ── Colour tokens ─────────────────────────────────────────────────────────────
const colorTokens = {
  neutral: {
    default: { bg: "interaction.neutral.default", color: "content.light.default"      },
    hover:   { bg: "interaction.neutral.hover",   color: "content.light.default"      },
    active:  { bg: "interaction.neutral.active",  color: "content.light.default"      },
  },
  muted: {
    default: { bg: "interaction.muted.default", color: "content.light.brand-strong" },
    hover:   { bg: "interaction.muted.hover",   color: "content.light.brand-strong" },
    active:  { bg: "interaction.muted.active",  color: "content.light.brand-strong" },
  },
}

// ── Component ─────────────────────────────────────────────────────────────────
export const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(function FilterButton(
  {
    border = "default",
    filtersApplied = false,
    showLeadingIcon = true,
    showTrailingIcon = true,
    isOpen = false,
    forceInteractionState,
    children,
    ...rest
  },
  ref
) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const hovered = forceInteractionState === "hover"  || isHovered
  const pressed = forceInteractionState === "active" || isPressed

  const scheme   = filtersApplied ? colorTokens.muted : colorTokens.neutral
  const stateKey = pressed ? "active" : hovered ? "hover" : "default"
  const { bg, color } = scheme[stateKey]

  return (
    <chakra.button
      ref={ref}
      type="button"
      display="inline-flex"
      alignItems="center"
      gap="4px"
      px="8px"
      py="7px"
      bg={bg}
      color={color}
      border="1px solid"
      borderColor={bg}
      borderRadius={border === "rounded" ? "50px" : "8px"}
      cursor="pointer"
      fontFamily="Inter, sans-serif"
      fontWeight="500"
      fontSize="14px"
      lineHeight="16px"
      letterSpacing="0px"
      whiteSpace="nowrap"
      transition="background 0.15s, border-color 0.15s, color 0.15s"
      outline="none"
      style={{ fontFeatureSettings: "'cv05' 1, 'cv10' 1" }}
      _focusVisible={{
        ring: "2px",
        ringColor: "focus.brand-default",
        ringOffset: "2px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false) }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      {...rest}
    >
      {showLeadingIcon && (
        <chakra.i
          className="ri-filter-3-line"
          fontSize="18px"
          lineHeight={1}
          flexShrink={0}
        />
      )}

      {children}

      {showTrailingIcon && (
        <chakra.i
          className={isOpen ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}
          fontSize="18px"
          lineHeight={1}
          flexShrink={0}
        />
      )}
    </chakra.button>
  )
})
