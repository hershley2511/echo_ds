import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"
import { Button } from "./Button"

export type ButtonSetFill     = "primary" | "danger" | "disabled"
export type ButtonSetLayout   = "button+button" | "button+link"
export type ButtonSetPosition = "align-right" | "align-left"

export interface ButtonSetProps extends HTMLChakraProps<"div"> {
  /** Semantic fill: primary = brand, danger = critical, disabled = all disabled */
  fill?:             ButtonSetFill
  /** button+button shows two buttons; button+link shows a link + primary button */
  layout?:           ButtonSetLayout
  /** Which side the primary action appears on */
  position?:         ButtonSetPosition
  primaryLabel?:     string
  secondaryLabel?:   string
  linkLabel?:        string
  linkHref?:         string
  onPrimaryClick?:   () => void
  onSecondaryClick?: () => void
  onLinkClick?:      () => void
}

// ── Component ────────────────────────────────────────────────────────────────
export const ButtonSet = forwardRef<HTMLDivElement, ButtonSetProps>(function ButtonSet(
  {
    fill = "primary",
    layout = "button+button",
    position = "align-right",
    primaryLabel = "Confirm",
    secondaryLabel = "Cancel",
    linkLabel = "Questions?",
    linkHref = "#",
    onPrimaryClick,
    onSecondaryClick,
    onLinkClick,
    ...rest
  },
  ref
) {
  const isDisabled   = fill === "disabled"
  const primaryScheme = fill === "danger" ? "critical" : "brand"
  const buttonState   = isDisabled ? "disabled" : "default"

  const primaryBtn = (
    <Button
      colorScheme={primaryScheme}
      variant="solid"
      size="md"
      state={buttonState}
      onClick={onPrimaryClick}
    >
      {primaryLabel}
    </Button>
  )

  const secondaryEl = layout === "button+button" ? (
    <Button
      colorScheme="neutral"
      variant="clear"
      size="md"
      state={buttonState}
      onClick={onSecondaryClick}
    >
      {secondaryLabel}
    </Button>
  ) : (
    <chakra.a
      href={isDisabled ? undefined : linkHref}
      onClick={isDisabled ? undefined : onLinkClick}
      fontFamily="Inter, sans-serif"
      fontWeight="400"
      fontSize="16px"
      lineHeight="24px"
      letterSpacing="-0.11px"
      color={isDisabled ? "interaction.support.disabled" : "interaction.links.default"}
      textDecoration={isDisabled ? "none" : "underline"}
      textDecorationSkipInk="none"
      cursor={isDisabled ? "not-allowed" : "pointer"}
      whiteSpace="nowrap"
      style={{ fontFeatureSettings: "'cv05' 1, 'lnum' 1, 'tnum' 1" }}
    >
      {linkLabel}
    </chakra.a>
  )

  // gap: 16px for button+button, 24px for button+link
  const gap = layout === "button+link" ? "6" : "4"

  const leading  = position === "align-right" ? secondaryEl : primaryBtn
  const trailing = position === "align-right" ? primaryBtn  : secondaryEl

  return (
    <chakra.div
      ref={ref}
      display="inline-flex"
      alignItems="center"
      gap={gap}
      {...rest}
    >
      {leading}
      {trailing}
    </chakra.div>
  )
})
