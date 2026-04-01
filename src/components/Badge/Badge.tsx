import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type BadgeVariant = "Strong" | "Subtle" | "Outline" | "Mixed"
export type BadgeColour = "Brand" | "Success" | "Warning" | "Critical" | "Neutral" | "Info"
export type BadgeSize = "sm" | "xs"
export type BadgeBorder = "Default" | "Rounded"

export interface BadgeProps extends HTMLChakraProps<"span"> {
  variant?: BadgeVariant
  colour?: BadgeColour
  size?: BadgeSize
  border?: BadgeBorder
  /** No pill background — renders a dot + label (status indicator style) */
  background?: boolean
  showLeadingIcon?: boolean
  showTrailingIcon?: boolean
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

// bg / text / border per variant × colour — all values are semantic or primitive tokens.
// "yellow.200" and "green.900" are primitive tokens (no semantic alias exists for these).
const styles: Record<BadgeVariant, Record<BadgeColour, { bg: string; text: string; border?: string }>> = {
  Strong: {
    Brand:    { bg: "interaction.main.default",    text: "content.dark.default" },
    Success:  { bg: "interaction.success.default", text: "content.dark.default" },
    Info:     { bg: "interaction.info.default",    text: "content.dark.default" },
    Warning:  { bg: "feedback.warning.default",    text: "feedback.warning.strong" },
    Critical: { bg: "feedback.critical.default",   text: "content.dark.default" },
    Neutral:  { bg: "content.light.medium",        text: "content.dark.default" },
  },
  Subtle: {
    Brand:    { bg: "interaction.muted.default",    text: "green.900" },
    Success:  { bg: "feedback.success.subtle",      text: "content.light.brand-subtle" },
    Info:     { bg: "feedback.info.subtle",         text: "feedback.info.strong" },
    Warning:  { bg: "yellow.200",                   text: "feedback.warning.strong" },
    Critical: { bg: "feedback.critical.subtle",     text: "feedback.critical.strong" },
    Neutral:  { bg: "interaction.neutral.default",  text: "content.light.default" },
  },
  Outline: {
    Brand:    { bg: "interaction.muted.default",   text: "green.900",                  border: "green.900" },
    Success:  { bg: "feedback.success.subtle",     text: "content.light.brand-subtle", border: "interaction.success.default" },
    Info:     { bg: "feedback.info.subtle",        text: "feedback.info.strong",       border: "interaction.info.default" },
    Warning:  { bg: "yellow.200",                  text: "feedback.warning.strong",    border: "feedback.warning.strong" },
    Critical: { bg: "feedback.critical.subtle",    text: "feedback.critical.strong",   border: "feedback.critical.default" },
    Neutral:  { bg: "interaction.neutral.default", text: "content.light.default",      border: "content.light.default" },
  },
  Mixed: {
    Brand:    { bg: "interaction.neutral.default", text: "content.light.brand-subtle" },
    Success:  { bg: "interaction.neutral.default", text: "content.light.brand-subtle" },
    Info:     { bg: "interaction.neutral.default", text: "feedback.info.strong" },
    Warning:  { bg: "interaction.neutral.default", text: "feedback.warning.strong" },
    Critical: { bg: "interaction.neutral.default", text: "feedback.critical.strong" },
    Neutral:  { bg: "interaction.neutral.default", text: "content.light.brand-subtle" },
  },
}

// Dot colour for background=false (status indicator) mode
const dotTokens: Record<BadgeColour, string> = {
  Brand:    "interaction.main.default",
  Success:  "interaction.success.default",
  Info:     "interaction.info.default",
  Warning:  "feedback.warning.default",
  Critical: "feedback.critical.default",
  Neutral:  "content.light.medium",
}

const sizeStyles = {
  sm: { px: "8px", py: "4px", fontSize: "12px", fontWeight: "500", lineHeight: "16px", iconSize: "16px" },
  xs: { px: "8px", py: "4px", fontSize: "10px", fontWeight: "400", lineHeight: "12px", iconSize: "12px" },
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = "Subtle",
    colour = "Neutral",
    size = "sm",
    border = "Default",
    background = true,
    showLeadingIcon = false,
    showTrailingIcon = false,
    leadingIcon,
    trailingIcon,
    children,
    ...rest
  },
  ref
) {
  const { px, py, fontSize, fontWeight, lineHeight, iconSize } = sizeStyles[size]
  const borderRadius = border === "Rounded" ? "999px" : "8px"

  if (!background) {
    return (
      <chakra.span
        ref={ref}
        display="inline-flex"
        alignItems="center"
        gap="8px"
        fontFamily="Inter, sans-serif"
        fontSize="14px"
        fontWeight="400"
        lineHeight="20px"
        color="grey.700"
        style={{ fontFeatureSettings: "'cv05' 1, 'cv10' 1" }}
        {...rest}
      >
        <chakra.span
          display="inline-block"
          w="8px"
          h="8px"
          borderRadius="full"
          bg={dotTokens[colour]}
          flexShrink={0}
        />
        {children}
      </chakra.span>
    )
  }

  const { bg, text, border: borderColor } = styles[variant][colour]

  return (
    <chakra.span
      ref={ref}
      display="inline-flex"
      alignItems="center"
      gap="4px"
      px={px}
      py={py}
      bg={bg}
      color={text}
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
      fontFamily="Inter, sans-serif"
      borderRadius={borderRadius}
      border={borderColor ? "1px solid" : undefined}
      borderColor={borderColor}
      style={{ fontFeatureSettings: size === "sm" ? "'cv05' 1, 'cv10' 1, 'lnum' 1, 'tnum' 1" : "'cv05' 1, 'cv10' 1" }}
      {...rest}
    >
      {showLeadingIcon && leadingIcon && (
        <chakra.span display="inline-flex" w={iconSize} h={iconSize} alignItems="center" justifyContent="center">
          {leadingIcon}
        </chakra.span>
      )}
      {children}
      {showTrailingIcon && trailingIcon && (
        <chakra.span display="inline-flex" w={iconSize} h={iconSize} alignItems="center" justifyContent="center">
          {trailingIcon}
        </chakra.span>
      )}
    </chakra.span>
  )
})
