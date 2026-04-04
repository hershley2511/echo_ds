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
const variantTokens: Record<BannerVariant, { bg: string; iconColor: string; iconClass: string }> = {
  info:    { bg: "feedback.info.subtle",     iconColor: "feedback.info.default",     iconClass: "ri-information-fill"   },
  warning: { bg: "feedback.warning.subtle",  iconColor: "feedback.warning.default",  iconClass: "ri-error-warning-fill" },
  error:   { bg: "feedback.critical.subtle", iconColor: "feedback.critical.default", iconClass: "ri-error-warning-fill" },
}

// ── Size tokens ───────────────────────────────────────────────────────────────
const sizeTokens: Record<BannerSize, { minH: string; iconSize: string; fontSize: string; lineHeight: string; letterSpacing: string }> = {
  md: { minH: "40px", iconSize: "20px", fontSize: "16px", lineHeight: "24px", letterSpacing: "-0.176px" },
  sm: { minH: "36px", iconSize: "16px", fontSize: "14px", lineHeight: "20px", letterSpacing: "0px"      },
}

// ── Component ─────────────────────────────────────────────────────────────────
export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { variant = "info", size = "md", onDismiss, children, ...rest },
  ref
) {
  const { bg, iconColor, iconClass } = variantTokens[variant]
  const { minH, iconSize, fontSize, lineHeight, letterSpacing } = sizeTokens[size]

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
        <chakra.i
          className={iconClass}
          color={iconColor}
          fontSize={iconSize}
          flexShrink={0}
          lineHeight={1}
        />
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
