import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type TagVariant = "Subtle" | "Outline" | "Strong"
export type TagColour = "Brand" | "Teal" | "Purple" | "Mocha" | "Critical" | "Neutral"
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

// Subtle: light bg + dark text. Strong: saturated bg + light text. Outline: subtle bg + strong border.
const colourTokens: Record<TagColour, { subtle: { bg: string; text: string }; strong: { bg: string; text: string } }> = {
  Brand:    { subtle: { bg: "brand.primary.100",           text: "interaction.main.active"    }, strong: { bg: "brand.primary.600",            text: "content.dark.default" } },
  Teal:     { subtle: { bg: "teal.200",                    text: "teal.800"                   }, strong: { bg: "teal.500",                     text: "teal.50"              } },
  Purple:   { subtle: { bg: "purple.100",                  text: "purple.700"                 }, strong: { bg: "purple.500",                   text: "purple.50"            } },
  Mocha:    { subtle: { bg: "mocha.200",                   text: "mocha.800"                  }, strong: { bg: "mocha.600",                    text: "mocha.50"             } },
  Critical: { subtle: { bg: "feedback.critical.subtle",    text: "feedback.critical.strong"   }, strong: { bg: "interaction.critical.default", text: "red.50"               } },
  Neutral:  { subtle: { bg: "interaction.neutral.default", text: "content.light.default"      }, strong: { bg: "brand.secondary.500",          text: "content.dark.default" } },
}

// Size → { h, px, py, gap, fontSize, fontWeight, lineHeight, fontFeatures, closeSize }
const sizeTokens: Record<TagSize, { h: string; px: string; py: string; gap: string; fontSize: string; fontWeight: string; lineHeight: string; fontFeatures: string; closeSize: string }> = {
  md: { h: "26px", px: "8px", py: "4px", gap: "4px", fontSize: "14px", fontWeight: "500", lineHeight: "16px", fontFeatures: "'cv05' 1, 'cv10' 1",                       closeSize: "18px" },
  sm: { h: "24px", px: "8px", py: "2px", gap: "4px", fontSize: "14px", fontWeight: "400", lineHeight: "20px", fontFeatures: "'cv05' 1, 'cv10' 1, 'lnum' 1, 'tnum' 1", closeSize: "18px" },
  xs: { h: "20px", px: "8px", py: "2px", gap: "2px", fontSize: "12px", fontWeight: "500", lineHeight: "16px", fontFeatures: "'cv05' 1, 'cv10' 1, 'lnum' 1, 'tnum' 1", closeSize: "14px" },
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
  const { h, px, py, gap, fontSize, fontWeight, lineHeight, fontFeatures, closeSize } = sizeTokens[size]
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
      gap={gap}
      h={h}
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
      opacity={isDisabled ? 0.4 : 1}
      cursor={isDisabled ? "not-allowed" : "default"}
      whiteSpace="nowrap"
      style={{ fontFeatureSettings: fontFeatures }}
      _hover={!isDisabled ? { filter: "brightness(0.94)" } : undefined}
      _active={!isDisabled ? { filter: "brightness(0.88)" } : undefined}
      _focusVisible={!isDisabled ? {
        outline: "2px solid",
        outlineColor: "focus.brand-default",
        outlineOffset: "1px",
        boxShadow: `0 0 0 4px var(--chakra-colors-brand-primary-100)`,
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
