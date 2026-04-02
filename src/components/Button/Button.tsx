import { useState, forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type ButtonVariant     = "solid" | "outline" | "clear"
export type ButtonColorScheme = "brand" | "subtle" | "success" | "critical" | "neutral" | "inverse" | "warning" | "white"
export type ButtonSize        = "xxs" | "xs" | "sm" | "md" | "lg"

export interface ButtonProps extends HTMLChakraProps<"button"> {
  variant?:     ButtonVariant
  colorScheme?: ButtonColorScheme
  size?:        ButtonSize
  loading?:     boolean
  /** Forces a visual interaction state without mouse events — for Storybook stories only */
  forceInteractionState?: "hover" | "active"
}

// ── Size tokens ──────────────────────────────────────────────────────────────
const sizes: Record<ButtonSize, HTMLChakraProps<"button">> = {
  xxs: { h: "24px", px: "2",   fontSize: "12px", gap: "1"   },
  xs:  { h: "32px", px: "2.5", fontSize: "12px", gap: "1"   },
  sm:  { h: "36px", px: "3",   fontSize: "14px", gap: "1.5" },
  md:  { h: "48px", px: "4",   fontSize: "16px", gap: "2"   },
  lg:  { h: "56px", px: "5",   fontSize: "18px", gap: "2"   },
}

// ── Per colour-scheme × variant styles ───────────────────────────────────────
// Each entry: [default bg, default color, default borderColor, hover bg, hover borderColor, active bg, active borderColor]
type StateStyle = { bg: string; color: string; borderColor: string }
type VariantStyles = { default: StateStyle; hover: StateStyle; active: StateStyle }
type StyleMap = Record<ButtonColorScheme, Record<ButtonVariant, VariantStyles>>

function s(
  [bg, color, border]: [string, string, string],
  [hBg, hBorder]: [string, string],
  [aBg, aBorder]: [string, string],
): VariantStyles {
  return {
    default: { bg, color, borderColor: border },
    hover:   { bg: hBg, color, borderColor: hBorder },
    active:  { bg: aBg, color, borderColor: aBorder },
  }
}

const styles: StyleMap = {
  brand: {
    solid:   s(["interaction.main.default",    "content.dark.strong",        "interaction.main.default"   ], ["interaction.main.hover",    "interaction.main.hover"   ], ["interaction.main.active",    "interaction.main.active"   ]),
    outline: s(["transparent",                 "interaction.main.default",   "interaction.main.default"   ], ["brand.primary.50",          "interaction.main.default" ], ["brand.primary.100",          "interaction.main.default"  ]),
    clear:   s(["transparent",                 "interaction.main.default",   "transparent"                ], ["brand.primary.50",          "transparent"              ], ["brand.primary.100",          "transparent"               ]),
  },
  subtle: {
    solid:   s(["interaction.muted.default",   "content.light.brand-strong", "interaction.muted.default"  ], ["interaction.muted.hover",   "interaction.muted.hover"  ], ["interaction.muted.active",   "interaction.muted.active"  ]),
    outline: s(["transparent",                 "content.light.brand-strong", "interaction.muted.hover"    ], ["interaction.muted.default", "interaction.muted.hover"  ], ["interaction.muted.hover",    "interaction.muted.hover"   ]),
    clear:   s(["transparent",                 "content.light.brand-strong", "transparent"                ], ["interaction.muted.default", "transparent"              ], ["interaction.muted.hover",    "transparent"               ]),
  },
  success: {
    solid:   s(["interaction.success.default", "content.dark.strong",        "interaction.success.default"], ["interaction.success.hover", "interaction.success.hover"], ["interaction.success.active", "interaction.success.active"]),
    outline: s(["transparent",                 "interaction.success.default","interaction.success.default"], ["feedback.success.subtle",   "interaction.success.default"], ["brand.primary.100",        "interaction.success.default"]),
    clear:   s(["transparent",                 "interaction.success.default","transparent"                ], ["feedback.success.subtle",   "transparent"              ], ["brand.primary.100",          "transparent"               ]),
  },
  critical: {
    solid:   s(["interaction.critical.default","content.dark.strong",        "interaction.critical.default"], ["interaction.critical.hover","interaction.critical.hover"], ["interaction.critical.active","interaction.critical.active"]),
    outline: s(["transparent",                 "interaction.critical.default","interaction.critical.default"], ["rgba(200,79,37,0.1)", "interaction.critical.default"], ["rgba(200,79,37,0.2)", "interaction.critical.default"]),
    clear:   s(["transparent",                 "interaction.critical.default","transparent"                ], ["rgba(200,79,37,0.1)",  "transparent"              ], ["rgba(200,79,37,0.2)",  "transparent"               ]),
  },
  neutral: {
    solid:   s(["interaction.neutral.default", "content.light.default",      "interaction.neutral.default"], ["interaction.neutral.hover", "interaction.neutral.hover"], ["interaction.neutral.active", "interaction.neutral.active"]),
    outline: s(["transparent",                 "content.light.medium",       "border.subtle"              ], ["brand.secondary.50",        "border.subtle"            ], ["interaction.neutral.default","border.subtle"              ]),
    clear:   s(["transparent",                 "content.light.medium",       "transparent"                ], ["interaction.neutral.default","transparent"             ], ["interaction.neutral.hover",  "transparent"               ]),
  },
  inverse: {
    solid:   s(["content.dark.strong",         "interaction.main.default",   "content.dark.strong"        ], ["brand.secondary.100",       "brand.secondary.100"      ], ["brand.secondary.200",        "brand.secondary.200"       ]),
    outline: s(["transparent",                 "content.dark.strong",        "content.dark.strong"        ], ["rgba(255,255,255,0.12)",    "content.dark.strong"      ], ["rgba(255,255,255,0.22)",     "content.dark.strong"       ]),
    clear:   s(["transparent",                 "content.dark.strong",        "transparent"                ], ["rgba(255,255,255,0.12)",    "transparent"              ], ["rgba(255,255,255,0.22)",     "transparent"               ]),
  },
  warning: {
    solid:   s(["feedback.warning.default",    "content.light.default",      "feedback.warning.default"   ], ["yellow.300",                "yellow.300"               ], ["yellow.500",                 "yellow.500"                ]),
    outline: s(["transparent",                 "feedback.warning.strong",    "feedback.warning.default"   ], ["feedback.warning.subtle",   "feedback.warning.default" ], ["yellow.100",                 "feedback.warning.default"  ]),
    clear:   s(["transparent",                 "feedback.warning.strong",    "transparent"                ], ["feedback.warning.subtle",   "transparent"              ], ["yellow.100",                 "transparent"               ]),
  },
  white: {
    solid:   s(["content.dark.strong",         "interaction.main.default",   "content.dark.strong"        ], ["brand.primary.50",          "brand.primary.50"         ], ["brand.primary.100",          "brand.primary.100"         ]),
    outline: s(["transparent",                 "content.dark.strong",        "content.dark.strong"        ], ["rgba(255,255,255,0.12)",    "content.dark.strong"      ], ["rgba(255,255,255,0.22)",     "content.dark.strong"       ]),
    clear:   s(["transparent",                 "content.dark.strong",        "transparent"                ], ["rgba(255,255,255,0.12)",    "transparent"              ], ["rgba(255,255,255,0.22)",     "transparent"               ]),
  },
}

// ── Spinner ──────────────────────────────────────────────────────────────────
const spinKeyframes = {
  "@keyframes echo-btn-spin": {
    from: { transform: "rotate(0deg)" },
    to:   { transform: "rotate(360deg)" },
  },
}

function Spinner() {
  return (
    <chakra.svg
      viewBox="0 0 24 24"
      fill="none"
      w="24px"
      h="24px"
      flexShrink={0}
      color="content.light.default"
      sx={{ ...spinKeyframes, animation: "echo-btn-spin 0.8s linear infinite" }}
    >
      <circle
        cx="12" cy="12" r="9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="42 14"
      />
    </chakra.svg>
  )
}

// ── Component ────────────────────────────────────────────────────────────────
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "solid",
    colorScheme = "brand",
    size = "md",
    loading,
    forceInteractionState,
    children,
    disabled,
    ...rest
  },
  ref
) {
  // JS-tracked interaction state — works reliably in Storybook iframes where
  // CSS :active can be lost on mouseout during a click.
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const isInert = disabled || loading

  const hovered = !isInert && (forceInteractionState === "hover"  || isHovered)
  const pressed = !isInert && (forceInteractionState === "active" || isPressed)

  const stateKey = pressed ? "active" : hovered ? "hover" : "default"

  const { bg, color, borderColor } = isInert
    ? { bg: "interaction.support.disabled-bg", color: "interaction.support.disabled", borderColor: "interaction.support.disabled-bg" }
    : styles[colorScheme][variant][stateKey]

  return (
    <chakra.button
      ref={ref}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="8px"
      border="1px solid"
      fontFamily="Inter, sans-serif"
      fontWeight="500"
      letterSpacing="-0.096px"
      cursor={isInert ? "not-allowed" : "pointer"}
      transition="background 0.15s, border-color 0.15s"
      outline="none"
      _focusVisible={{
        ring: "2px",
        ringColor: "focus.brand-default",
        ringOffset: "2px",
      }}
      // Size
      {...sizes[size]}
      // Resolved state
      bg={bg}
      color={color}
      borderColor={borderColor}
      // Event handlers
      onMouseEnter={() => { if (!isInert) setIsHovered(true) }}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false) }}
      onMouseDown={() => { if (!isInert) setIsPressed(true) }}
      onMouseUp={() => setIsPressed(false)}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <Spinner /> : children}
    </chakra.button>
  )
})
