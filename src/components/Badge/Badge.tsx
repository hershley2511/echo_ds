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

// bg / text / borderColor per variant × colour
const styles: Record<BadgeVariant, Record<BadgeColour, { bg: string; text: string; border?: string }>> = {
  Strong: {
    Brand:    { bg: "#026257", text: "#F6F7FF" },
    Success:  { bg: "#009D7B", text: "#F6F7FF" },
    Info:     { bg: "#3182CE", text: "#F6F7FF" },
    Warning:  { bg: "#FFDA68", text: "#8B6005" },
    Critical: { bg: "#C84F25", text: "#F6F7FF" },
    Neutral:  { bg: "#6B6F8C", text: "#F6F7FF" },
  },
  Subtle: {
    Brand:    { bg: "#DDFBC6", text: "#014039" },
    Success:  { bg: "#F1FFE5", text: "#017B68" },
    Info:     { bg: "#EBF8FF", text: "#2B6CB0" },
    Warning:  { bg: "#FFEFA1", text: "#8B6005" },
    Critical: { bg: "#FFE8E0", text: "#A64929" },
    Neutral:  { bg: "#F0F1F9", text: "#424559" },
  },
  Outline: {
    Brand:    { bg: "#DDFBC6", text: "#014039", border: "#014039" },
    Success:  { bg: "#F1FFE5", text: "#017B68", border: "#009D7B" },
    Info:     { bg: "#EBF8FF", text: "#2B6CB0", border: "#3182CE" },
    Warning:  { bg: "#FFEFA1", text: "#8B6005", border: "#8B6005" },
    Critical: { bg: "#FFE8E0", text: "#A64929", border: "#C84F25" },
    Neutral:  { bg: "#F0F1F9", text: "#424559", border: "#424559" },
  },
  Mixed: {
    Brand:    { bg: "#F0F1F9", text: "#017B68" },
    Success:  { bg: "#F0F1F9", text: "#017B68" },
    Info:     { bg: "#F0F1F9", text: "#2B6CB0" },
    Warning:  { bg: "#F0F1F9", text: "#8B6005" },
    Critical: { bg: "#F0F1F9", text: "#A64929" },
    Neutral:  { bg: "#F0F1F9", text: "#017B68" },
  },
}

// Dot color for background=false (status indicator) variant
const dotColors: Record<BadgeColour, string> = {
  Brand:    "#026257",
  Success:  "#009D7B",
  Info:     "#3182CE",
  Warning:  "#FFDA68",
  Critical: "#C84F25",
  Neutral:  "#6B6F8C",
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

  // No-background / status indicator style
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
        color="#454953"
        style={{ fontFeatureSettings: "'cv05' 1, 'cv10' 1" }}
        {...rest}
      >
        <chakra.span
          display="inline-block"
          w="8px"
          h="8px"
          borderRadius="full"
          bg={dotColors[colour]}
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
