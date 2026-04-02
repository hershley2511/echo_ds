import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type InfoboxType = "informational" | "warning" | "error" | "success"
export type InfoboxSize = "md" | "sm"
export type InfoboxLeading = "icon" | "emoji"

export interface InfoboxProps extends HTMLChakraProps<"div"> {
  type?: InfoboxType
  size?: InfoboxSize
  leading?: InfoboxLeading
  title?: string
  emoji?: string
}

// ── Per-type tokens ───────────────────────────────────────────────────────────
const typeTokens: Record<InfoboxType, { bg: string; iconColor: string; iconClass: string }> = {
  informational: {
    bg: "feedback.info.subtle",
    iconColor: "feedback.info.strong",
    iconClass: "ri-information-fill",
  },
  warning: {
    bg: "feedback.warning.subtle",
    iconColor: "feedback.warning.strong",
    iconClass: "ri-error-warning-fill",
  },
  error: {
    bg: "feedback.critical.subtle",
    iconColor: "feedback.critical.default",
    iconClass: "ri-error-warning-fill",
  },
  success: {
    bg: "feedback.success.subtle",
    iconColor: "feedback.success.default",
    iconClass: "ri-checkbox-circle-fill",
  },
}

// ── Size tokens ───────────────────────────────────────────────────────────────
const sizeTokens: Record<
  InfoboxSize,
  {
    padding: string
    gap: string
    iconSize: string
    iconPaddingTop: string
    contentGap: string
    titleFontSize: string
    titleLineHeight: string
    titleLetterSpacing: string
    bodyFontSize: string
    bodyLineHeight: string
    bodyLetterSpacing: string
    emojiFontSize: string
    emojiLineHeight: string
    emojiLetterSpacing: string
  }
> = {
  md: {
    padding: "16px",
    gap: "8px",
    iconSize: "24px",
    iconPaddingTop: "0",
    contentGap: "8px",
    titleFontSize: "16px",
    titleLineHeight: "24px",
    titleLetterSpacing: "-0.096px",
    bodyFontSize: "16px",
    bodyLineHeight: "24px",
    bodyLetterSpacing: "-0.176px",
    emojiFontSize: "18px",
    emojiLineHeight: "24px",
    emojiLetterSpacing: "-0.252px",
  },
  sm: {
    padding: "12px 10px",
    gap: "8px",
    iconSize: "16px",
    iconPaddingTop: "2px",
    contentGap: "4px",
    titleFontSize: "14px",
    titleLineHeight: "16px",
    titleLetterSpacing: "0",
    bodyFontSize: "14px",
    bodyLineHeight: "20px",
    bodyLetterSpacing: "0",
    emojiFontSize: "14px",
    emojiLineHeight: "16px",
    emojiLetterSpacing: "0",
  },
}

// ── Component ─────────────────────────────────────────────────────────────────
export const Infobox = forwardRef<HTMLDivElement, InfoboxProps>(function Infobox(
  {
    type = "informational",
    size = "md",
    leading = "icon",
    title,
    emoji = "🎉",
    children,
    ...rest
  },
  ref
) {
  const { bg, iconColor, iconClass } = typeTokens[type]
  const s = sizeTokens[size]

  return (
    <chakra.div
      ref={ref}
      display="flex"
      alignItems="flex-start"
      gap={s.gap}
      padding={s.padding}
      bg={bg}
      borderRadius="8px"
      fontFamily="Inter, sans-serif"
      {...rest}
    >
      {/* ── Leading ── */}
      {leading === "emoji" ? (
        <chakra.p
          flexShrink={0}
          fontWeight="500"
          fontStyle="normal"
          fontSize={s.emojiFontSize}
          lineHeight={s.emojiLineHeight}
          letterSpacing={s.emojiLetterSpacing}
          style={{ fontFeatureSettings: "'cv05' 1, 'cv10' 1" }}
        >
          {emoji}
        </chakra.p>
      ) : (
        <chakra.div
          flexShrink={0}
          paddingTop={s.iconPaddingTop}
          color={iconColor}
          width={s.iconSize}
          height={s.iconSize}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <i className={iconClass} style={{ fontSize: s.iconSize, lineHeight: 1 }} />
        </chakra.div>
      )}

      {/* ── Content ── */}
      <chakra.div
        display="flex"
        flexDirection="column"
        flex="1 0 0"
        gap={s.contentGap}
        color="content.light.default"
      >
        {title && (
          <chakra.p
            margin={0}
            fontWeight="600"
            fontSize={s.titleFontSize}
            lineHeight={s.titleLineHeight}
            letterSpacing={s.titleLetterSpacing}
            style={{ fontFeatureSettings: "'cv05' 1, 'cv10' 1" }}
          >
            {title}
          </chakra.p>
        )}
        <chakra.div
          fontSize={s.bodyFontSize}
          lineHeight={s.bodyLineHeight}
          letterSpacing={s.bodyLetterSpacing}
          fontWeight="400"
          style={{ fontFeatureSettings: "'cv05' 1, 'lnum' 1, 'tnum' 1" }}
        >
          {children}
        </chakra.div>
      </chakra.div>
    </chakra.div>
  )
})
