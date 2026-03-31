import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type TagVariant = "Subtle" | "Outline" | "Strong"
export type TagColour = "Brand" | "Teal" | "Lime" | "Cyan" | "Orange" | "Purple" | "Red" | "Pink" | "Gray" | "White"
export type TagSize = "md" | "sm" | "xs"
export type TagBorder = "Default" | "Rounded"
export type TagState = "Default" | "Disabled"

export interface TagProps extends HTMLChakraProps<"span"> {
  variant?: TagVariant
  colour?: TagColour
  border?: TagBorder
  size?: TagSize
  state?: TagState
  onRemove?: () => void
  children?: React.ReactNode
}

// Subtle: light bg + dark text. Strong: saturated bg + white text. Outline: subtle bg + border.
const colourTokens: Record<TagColour, { subtle: { bg: string; text: string }; strong: { bg: string; text: string } }> = {
  Brand:  { subtle: { bg: "#DDFBC6", text: "#014039" }, strong: { bg: "#026257", text: "#FFFFFF" } },
  Teal:   { subtle: { bg: "#E0F4F8", text: "#2A6373" }, strong: { bg: "#367F94", text: "#FFFFFF" } },
  Lime:   { subtle: { bg: "#F4FFD6", text: "#3A5C00" }, strong: { bg: "#6BAE00", text: "#FFFFFF" } },
  Cyan:   { subtle: { bg: "#E0F7FA", text: "#006978" }, strong: { bg: "#00838F", text: "#FFFFFF" } },
  Orange: { subtle: { bg: "#FFF3E0", text: "#BF5000" }, strong: { bg: "#E67E59", text: "#FFFFFF" } },
  Purple: { subtle: { bg: "#F3E8FF", text: "#5B21B6" }, strong: { bg: "#7C3F9A", text: "#FFFFFF" } },
  Red:    { subtle: { bg: "#FFE8E0", text: "#A64929" }, strong: { bg: "#C84F25", text: "#FFFFFF" } },
  Pink:   { subtle: { bg: "#FFE4F0", text: "#9B1C5A" }, strong: { bg: "#C2185B", text: "#FFFFFF" } },
  Gray:   { subtle: { bg: "#F0F1F9", text: "#424559" }, strong: { bg: "#6B6F8C", text: "#FFFFFF" } },
  White:  { subtle: { bg: "#FFFFFF", text: "#424559" }, strong: { bg: "#FFFFFF", text: "#424559" } },
}

// Size → { h, px, py, fontSize, lineHeight, closeSize }
const sizeTokens: Record<TagSize, { h: string; px: string; py: string; fontSize: string; lineHeight: string; closeSize: string }> = {
  md: { h: "26px", px: "8px", py: "4px", fontSize: "12px", lineHeight: "16px", closeSize: "14px" },
  sm: { h: "24px", px: "8px", py: "4px", fontSize: "12px", lineHeight: "14px", closeSize: "12px" },
  xs: { h: "22px", px: "6px", py: "3px", fontSize: "11px", lineHeight: "14px", closeSize: "12px" },
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    variant = "Subtle",
    colour = "Brand",
    border = "Default",
    size = "md",
    state = "Default",
    onRemove,
    children,
    ...rest
  },
  ref
) {
  const { h, px, py, fontSize, lineHeight, closeSize } = sizeTokens[size]
  const borderRadius = border === "Rounded" ? "999px" : "8px"
  const isDisabled = state === "Disabled"

  const { subtle, strong } = colourTokens[colour]

  let bg = subtle.bg
  let text = subtle.text
  let borderColor: string | undefined

  if (variant === "Strong") {
    bg = strong.bg
    text = strong.text
  } else if (variant === "Outline") {
    bg = subtle.bg
    text = subtle.text
    borderColor = strong.bg
  }

  return (
    <chakra.span
      ref={ref}
      display="inline-flex"
      alignItems="center"
      gap="4px"
      h={h}
      px={px}
      py={py}
      bg={bg}
      color={text}
      fontSize={fontSize}
      fontWeight="500"
      lineHeight={lineHeight}
      fontFamily="Inter, sans-serif"
      borderRadius={borderRadius}
      border={borderColor ? "1px solid" : undefined}
      borderColor={borderColor}
      opacity={isDisabled ? 0.4 : 1}
      cursor={isDisabled ? "not-allowed" : "default"}
      whiteSpace="nowrap"
      _hover={!isDisabled ? { filter: "brightness(0.94)" } : undefined}
      _active={!isDisabled ? { filter: "brightness(0.88)" } : undefined}
      _focusVisible={!isDisabled ? {
        boxShadow: "0 0 0 2px #DDFBC6",
        outline: "2px solid #009D7B",
        outlineOffset: "1px",
      } : undefined}
      {...rest}
    >
      {children}
      {onRemove && !isDisabled && (
        <chakra.button
          type="button"
          onClick={onRemove}
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          w={closeSize}
          h={closeSize}
          bg="transparent"
          border="none"
          cursor="pointer"
          color="currentColor"
          p="0"
          borderRadius="2px"
          opacity={0.6}
          _hover={{ opacity: 1 }}
          aria-label="Remove"
          flexShrink={0}
        >
          <svg width={closeSize} height={closeSize} viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </chakra.button>
      )}
    </chakra.span>
  )
})
