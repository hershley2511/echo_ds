import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type LinkColour = "Link" | "Neutral"
export type LinkSize = "md" | "sm" | "xs"
export type LinkState = "Default" | "Disabled"
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

const colorTokens: Record<LinkColour, { default: string; hover: string; disabled: string }> = {
  Link:    { default: "#009D7B", hover: "#017B68", disabled: "#A0A4AD" },
  Neutral: { default: "#575B73", hover: "#1F2233", disabled: "#A0A4AD" },
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
  const { default: defaultColor, hover: hoverColor, disabled: disabledColor } = colorTokens[colour]
  const isDisabled = state === "Disabled"

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
      color={isDisabled ? disabledColor : defaultColor}
      fontSize={fontSize}
      fontWeight="500"
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
      fontFamily="Inter, sans-serif"
      textDecoration="none"
      cursor={isDisabled ? "not-allowed" : "pointer"}
      pointerEvents={isDisabled ? "none" : undefined}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      style={{ fontFeatureSettings: "'cv05' 1, 'cv10' 1" }}
      _hover={!isDisabled ? { color: hoverColor, textDecoration: "underline", textDecorationSkipInk: "none" } : undefined}
      _focusVisible={!isDisabled ? {
        outline: "2px solid #009D7B",
        outlineOffset: "4px",
        borderRadius: "4px",
      } : undefined}
      {...rest}
    >
      {iconPosition === "Left" && iconEl}
      {children}
      {iconPosition === "Right" && iconEl}
    </chakra.a>
  )
})
