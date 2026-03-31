import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type LinkColour = "Link" | "Neutral"
export type LinkSize = "md" | "sm" | "xs"
export type LinkState = "Default" | "Hover" | "Disabled" | "Focus"
export type LinkIconPosition = "Left" | "Right" | "None"

export interface LinkProps extends HTMLChakraProps<"a"> {
  colour?: LinkColour
  size?: LinkSize
  state?: LinkState
  iconPosition?: LinkIconPosition
  icon?: React.ReactNode
  isExternal?: boolean
}

const sizeTokens: Record<LinkSize, { fontSize: string; lineHeight: string; iconSize: string; letterSpacing: string }> = {
  md: { fontSize: "16px", lineHeight: "24px", iconSize: "24px", letterSpacing: "-0.096px" },
  sm: { fontSize: "14px", lineHeight: "16px", iconSize: "20px", letterSpacing: "0px" },
  xs: { fontSize: "12px", lineHeight: "16px", iconSize: "16px", letterSpacing: "0px" },
}

const colorTokens: Record<LinkColour, Record<LinkState, { color: string; textDecoration?: string; outline?: string }>> = {
  Link: {
    Default:  { color: "#009D7B" },
    Hover:    { color: "#017B68", textDecoration: "underline" },
    Disabled: { color: "#A0A4AD" },
    Focus:    { color: "#009D7B", outline: "2px solid #009D7B" },
  },
  Neutral: {
    Default:  { color: "#575B73" },
    Hover:    { color: "#1F2233", textDecoration: "underline" },
    Disabled: { color: "#A0A4AD" },
    Focus:    { color: "#575B73", outline: "2px solid #009D7B" },
  },
}

const DefaultArrowIcon = ({ size }: { size: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414 4.95-4.95z" fill="currentColor" />
  </svg>
)

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {
    colour = "Link",
    size = "md",
    state = "Default",
    iconPosition = "None",
    icon,
    isExternal,
    children,
    ...rest
  },
  ref
) {
  const { fontSize, lineHeight, iconSize, letterSpacing } = sizeTokens[size]
  const { color, textDecoration, outline } = colorTokens[colour][state]
  const isDisabled = state === "Disabled"
  const isFocus = state === "Focus"

  const iconEl = (
    <chakra.span
      display="inline-flex"
      w={iconSize}
      h={iconSize}
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
    >
      {icon ?? <DefaultArrowIcon size={iconSize} />}
    </chakra.span>
  )

  return (
    <chakra.a
      ref={ref}
      display="inline-flex"
      alignItems="center"
      gap={iconPosition !== "None" ? "4px" : undefined}
      color={color}
      fontSize={fontSize}
      fontWeight="500"
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
      fontFamily="Inter, sans-serif"
      textDecoration={textDecoration ?? "none"}
      textDecorationSkipInk={textDecoration ? "none" : undefined}
      outline={isFocus ? outline : undefined}
      outlineOffset={isFocus ? "4px" : undefined}
      borderRadius={isFocus ? "4px" : undefined}
      cursor={isDisabled ? "not-allowed" : "pointer"}
      pointerEvents={isDisabled ? "none" : undefined}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      style={{ fontFeatureSettings: "'cv05' 1, 'cv10' 1" }}
      _hover={!isDisabled ? { color: colorTokens[colour].Hover.color, textDecoration: "underline" } : {}}
      {...rest}
    >
      {iconPosition === "Left" && iconEl}
      {children}
      {iconPosition === "Right" && iconEl}
    </chakra.a>
  )
})
