import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type BannerVariant = "info" | "warning" | "error"
export type BannerSize    = "md" | "sm"

export interface BannerProps extends HTMLChakraProps<"div"> {
  variant?:   BannerVariant
  size?:      BannerSize
  /** Renders a dismiss button — only visible when variant is "info" (matches Figma) */
  onDismiss?: () => void
}

// ── Variant tokens ────────────────────────────────────────────────────────────
const variantTokens: Record<BannerVariant, { bg: string; iconBg: string; iconClass: string }> = {
  info:    { bg: "feedback.info.subtle",     iconBg: "feedback.info.default",     iconClass: "ri-information-fill"   },
  warning: { bg: "feedback.warning.subtle",  iconBg: "feedback.warning.default",  iconClass: "ri-error-warning-fill" },
  error:   { bg: "feedback.critical.subtle", iconBg: "feedback.critical.default", iconClass: "ri-error-warning-fill" },
}

// ── Size tokens ───────────────────────────────────────────────────────────────
const sizeTokens: Record<BannerSize, { minH: string; iconSize: string; iconFontSize: string; fontSize: string; lineHeight: string; letterSpacing: string }> = {
  md: { minH: "40px", iconSize: "20px", iconFontSize: "13px", fontSize: "16px", lineHeight: "24px", letterSpacing: "-0.176px" },
  sm: { minH: "36px", iconSize: "16px", iconFontSize: "10px", fontSize: "14px", lineHeight: "20px", letterSpacing: "0px"      },
}

// ── Component ─────────────────────────────────────────────────────────────────
export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { variant = "info", size = "md", onDismiss, children, ...rest },
  ref
) {
  const { bg, iconBg, iconClass } = variantTokens[variant]
  const { minH, iconSize, iconFontSize, fontSize, lineHeight, letterSpacing } = sizeTokens[size]

  return (
    <chakra.div
      ref={ref}
      display="flex"
      alignItems="center"
      w="full"
      minH={minH}
      px="4"
      py="2"
      bg={bg}
      {...rest}
    >
      {/* Icon + Message */}
      <chakra.div display="flex" alignItems="center" gap="2" flex={1} minW={0}>
        <chakra.div
          w={iconSize}
          h={iconSize}
          minW={iconSize}
          borderRadius="full"
          bg={iconBg}
          color="content.dark.strong"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize={iconFontSize}
          flexShrink={0}
        >
          <i className={iconClass} style={{ lineHeight: 1 }} />
        </chakra.div>
        <chakra.p
          m={0}
          fontFamily="Inter, sans-serif"
          fontSize={fontSize}
          fontWeight="400"
          lineHeight={lineHeight}
          letterSpacing={letterSpacing}
          color="content.light.default"
          style={{ fontFeatureSettings: "'cv05' 1, 'cv10' 1, 'lnum' 1, 'tnum' 1" }}
        >
          {children}
        </chakra.p>
      </chakra.div>

      {/* Dismiss button — only for "info" variant (Informational in Figma) */}
      {onDismiss && variant === "info" && (
        <chakra.button
          type="button"
          onClick={onDismiss}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="transparent"
          border="none"
          cursor="pointer"
          color="content.light.default"
          p="10px"
          borderRadius="8px"
          flexShrink={0}
          _hover={{ bg: "rgba(0,0,0,0.06)" }}
          _focusVisible={{
            ring: "2px",
            ringColor: "focus.brand-default",
            ringOffset: "2px",
          }}
          aria-label="Dismiss"
        >
          <i className="ri-close-line" style={{ fontSize: "16px", lineHeight: 1 }} />
        </chakra.button>
      )}
    </chakra.div>
  )
})
